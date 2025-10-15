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
    ];
    const resultados = await Promise.all(usuariosData.map((u) => {
        return prisma.usuario.create({ data: u });
    }));
    return resultados.filter(s => s !== null && s !== undefined).length;
}

async function insereEquipamentos() {
    const equipamentosData = [
        {
            "id": 1,
            "equipamento": "Torno Mecânico 500mm Modelo BV20L 220V - TTM520 - Tander",
            "imagem": "Torno_Mecanico_500mm.png",
            "descricao": "O Torno Mecânico Tander TTM520 é uma ferramenta utilizada por vários profissionais na confecção e acabamento de inúmeras peças metálicas, tais como: eixos, polias, pinos, roscas, peças cilíndricas internas e externas, cones, esferas, entre outros. Este torno vem com motor monofásico de 220V e 550W de potência, o que lhe confere maior torque e vida útil, menor consumo de energia e baixo índice de manutenção. Possui interruptor magnético com a função de travagem de emergência, rotação frente/reversa e a função de proteção ao torno e aos componentes elétricos.",
            "ativo": 1
        },
        {
            "id": 2,
            "equipamento": "Processador Intel Core i9-7920X Skylake, Cache 16.5MB, 2.9GHz (4.3GHz Max Turbo), LGA 2066 - BX80673I97920X",
            "imagem": "Intel_Core_i9.png",
            "descricao": "Com esse processador inovador e incrível você desfruta ao máximo o verdadeiro potencial do seu computador e desfruta da mais pura velocidade. Maximize o seu desempenho seja trabalhando, jogando, navegando ou assistindo o seu filme preferido, com esse processador você pode tudo!",
            "ativo": 1
        },
        {
            "id": 3,
            "equipamento": "Monitor, Dell, U2518D, UltraSharp, Preto e Suporte em Alumínio, 25'",
            "imagem": "Monitor_Dell.png",
            "descricao": "Dê vida ao seu trabalho com uma tela de 25 polegadas quase sem bordas que conta com detalhes em cores vívidas e consistentes graças a tecnologia hdr, resolução qhd e ângulo de visão ultra-amplo. Aumente sua performance com os recursos dell display manager, dell easy arrange e trabalhe confortavelmente graças a um suporte totalmente ajustável e recurso confortview.",
            "ativo": 0
        },
        {
            "id": 4,
            "equipamento": "Mouse Gamer Razer Deathadder Essential óptico 5 Botões 4G 6.400 DPI",
            "imagem": "Mouse_Razer.png",
            "descricao": "Nada melhor do que um mouse gamer com tecnologia de ponta para qualificar seus comandos e aprimorar suas jogadas nos games. Com este Mouse Gamer Razer, sua atuação nas batalhas gamers será ainda mais bem-sucedidas, com desempenho acima da média e desenvoltura arrasadora, que vai deixar seus oponentes impressionados. O mouse Razer Deathadder Essential tem sensor óptico de 6400 DPI de 4G, 5 botões, design moderno e ergonômico, especialmente projetado para jogadores destros, e uma empunhadura lateral emborrachada que garante mais firmeza ao manuseio do equipamento, melhorando as respostas obtidas pelos players. O mouse Razer ainda oferece ajuste de sensibilidade, pezinhos Ultraslick silenciosos, cabo ultra resistente de fibra trançada e Modo Always-On, que mantém o mouse ligado mesmo quando o equipamento estiver inativo. É um mouse gamer Razer para ninguém botar defeito, com todas as funções e especificações técnicas que você precisa para ter mais produtividade nos jogos. O Razer Deathadder Essential é realmente essencial e ainda tem o diferencial de estar habilitado para Razer Synapse 3 e de ser compatível com PC e Mac, com porta USB. Conheça o modelo e faça um investimento seguro!",
            "ativo": 1
        },
        {
            "id": 5,
            "equipamento": "All-in-One Media Keyboard",
            "imagem": ";Teclado_Microsoft.png",
            "descricao": "O All-in-One Media Keyboard é o dispositivo ideal para sua sala ou home office. Com teclado em tamanho natural e trackpad multitoque integrado, é possível digitar, passar o dedo, arrastar, fazer zoom e clicar facilmente. O teclado com teclas de atalho de mídia personalizáveis permite que a Web e suas músicas, fotos e filmes favoritos estejam a seu alcance. O teclado também tem um design resistente, portanto, não é necessário se preocupar com esbarrões, quedas ou derramamentos comuns. O All-in-One Media Keyboard é tudo o que você precisa para digitar confortavelmente e navegar sem esforço.",
            "ativo": 0
        }
    ];
    const resultados = await Promise.all(equipamentosData.map((e) => {
        return prisma.equipamento.create({ data: e });
    }));
    return resultados.filter(s => s !== null && s !== undefined).length;
}

async function insereComentarios() {
    const comentariosData = [
        { "id": 1, "comentario": "Deverá fazer o download do aplicativo da Razer para alterar a cor do mouse.", "equipamento": 2, "perfil": 4 },
        { "id": 2, "comentario": "Problema de aquecimento no processador após 1 ano de uso.", "equipamento": 2, "perfil": 2 },
        { "id": 3, "comentario": "Problema de aquecimento no processador após 3 anos de uso.", "equipamento": 3, "perfil": 4 },
        { "id": 4, "comentario": "Realizada a manutenção preventiva", "equipamento": 3, "perfil": 1 },
        { "id": 5, "comentario": "Realizada a manutenção corretiva", "equipamento": 4, "perfil": 1 },
        { "id": 6, "comentario": "Realizada a manutenção corretiva", "equipamento": 5, "perfil": 2 },
        { "id": 7, "comentario": "Realizada a manutenção corretiva", "equipamento": 3, "perfil": 2 },
        { "id": 8, "comentario": "Realizada a manutenção corretiva", "equipamento": 4, "perfil": 3 },
        { "id": 9, "comentario": "Realizada a manutenção corretiva", "equipamento": 5, "perfil": 3 },
        { "id": 10, "comentario": "Realizada a manutenção corretiva", "equipamento": 3, "perfil": 4 },
        { "id": 11, "comentario": "Realizada a manutenção corretiva", "equipamento": 5, "perfil": 4 },
    ];
    const resultados = await Promise.all(comentariosData.map((c) => {
        return prisma.comentario.create({ data: c });
    }));
    return resultados.filter(s => s !== null && s !== undefined).length;
}

// Função principal para semear os dados
async function run(req, res) {
    try {
        await prisma.$connect();
        await prisma.comentario.deleteMany();
        await prisma.equipamento.deleteMany();
        await prisma.usuario.deleteMany();
        await prisma.perfil.deleteMany();
        const perfis = await inserePerfis();
        const usuarios = await insereUsuarios();
        const equipamentos = await insereEquipamentos();
        const comentarios = await insereComentarios();
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