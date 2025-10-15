const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function inserePerfis() {
    const perfisData = [
        { "id": 1, "perfil": "Comum" },
        { "id": 2, "perfil": "Administrador" },
        { "id": 3, "perfil": "Tecnico" },
        { "id": 4, "perfil": "Gerente" }
    ];
    const resultados = await Promise.all(perfisData.map((p) => {
        return prisma.perfil.create({ data: p });
    }));
    return resultados.filter(s => s !== null && s !== undefined).length;
}

async function insereUsuarios() {
    const usuariosData = [
        { "id": 1, "senha": "111111", "perfil": 1 },
        { "id": 2, "senha": "212121", "perfil": 2 },
        { "id": 3, "senha": "414141", "perfil": 4 },
        { "id": 4, "senha": "313131", "perfil": 3 }
    ]
    const resultados = await Promise.all(usuariosData.map((u) => {
        return prisma.usuario.create({ data: u });
    }));
    return resultados.filter(s => s !== null && s !== undefined).length;
}

// async function insereEquipamentos() {
//     const equipamentosData = fs.readFileSync(path.join(__dirname, '../../data/equipamentos.csv'), 'utf8');
//     const linhas = equipamentosData.split('\r\n');
//     const resultados = await Promise.all(linhas.map((linha, i) => {
//         if (i > 0 && linha) {
//             const [id, equipamento, imagem, descricao, ativo, data] = linha.split(';');
//             return prisma.equipamento.create({
//                 data: {
//                     id: Number(id),
//                     equipamento,
//                     imagem,
//                     descricao,
//                     ativo: Number(ativo),
//                     data: new Date(data)
//                 }
//             });
//         }
//         return null;
//     }));
//     return resultados.filter(s => s !== null && s !== undefined).length;
// }

// async function insereComentarios() {
//     const comentariosData = fs.readFileSync(path.join(__dirname, '../../data/comentarios.csv'), 'utf8');
//     const linhas = comentariosData.split('\r\n');
//     const resultados = await Promise.all(linhas.map((linha, i) => {
//         if (i > 0 && linha) {
//             const [id, comentario, equipamento, perfil, data] = linha.split(';');
//             return prisma.comentario.create({
//                 data: {
//                     id: Number(id),
//                     comentario,
//                     equipamento: Number(equipamento),
//                     perfil: Number(perfil),
//                     data: new Date(data)
//                 }
//             });
//         }
//         return null;
//     }));
//     return resultados.filter(s => s !== null && s !== undefined).length;
// }

// Função principal para semear os dados
async function run(req, res) {
    try {
        await prisma.$connect();
        // await prisma.comentario.deleteMany();
        // await prisma.equipamento.deleteMany();
        await prisma.usuario.deleteMany();
        await prisma.perfil.deleteMany();
        const perfis = await inserePerfis();
        const usuarios = await insereUsuarios();
        // const equipamentos = await insereEquipamentos();
        // const comentarios = await insereComentarios();
        await prisma.$disconnect();
        res.json({ perfis, usuarios, equipamentos, comentarios });
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });
    }
};

async function redefineIdSequence(req, res) {
    try {
        await prisma.$executeRaw`SELECT setval('public."Perfil_id_seq"', (SELECT MAX(id) FROM public."Perfil"));`;
        await prisma.$executeRaw`SELECT setval('public."Usuario_id_seq"', (SELECT MAX(id) FROM public."Usuario"));`;
        await prisma.$executeRaw`SELECT setval('public."Equipamento_id_seq"', (SELECT MAX(id) FROM public."Equipamento"));`;
        await prisma.$executeRaw`SELECT setval('public."Comentario_id_seq"', (SELECT MAX(id) FROM public."Comentario"));`;
        res.status(200).json({ message: 'Sequências redefinidas com sucesso' });
    } catch (error) {
        console.error('Erro ao redefinir sequências:', error);
        res.status(500).json({ error: 'Erro ao redefinir sequências' });
    }
}

module.exports = {
    run,
    redefineIdSequence
};