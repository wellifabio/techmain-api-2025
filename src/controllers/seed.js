const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

//Importando os dados de arquivo csv para variáveis
const path = require('path');
const perfisData = fs.readFileSync(path.join(__dirname, '../../data/perfis.csv'), 'utf8');
const usuariosData = fs.readFileSync(path.join(__dirname, '../../data/usuarios.csv'), 'utf8');
const equipamentosData = fs.readFileSync(path.join(__dirname, '../../data/equipamentos.csv'), 'utf8');
const comentariosData = fs.readFileSync(path.join(__dirname, '../../data/comentarios.csv'), 'utf8');

// Funções para inserir os dados em cada tabela
async function inserePerfis() {
    perfisData.split('\r\n').map(async (linha, i) => {
        if (i > 0) { //ignora a primeira linha
            const [id, perfil] = linha.split(';');
            await prisma.perfil.create({
                data: {
                    id: Number(id),
                    perfil
                }
            });
        }
    });
}

async function insereUsuarios() {
    usuariosData.split('\r\n').map(async (linha, i) => {
        if (i > 0) { //ignora a primeira linha
            const [id, senha, perfil] = linha.split(';');
            await prisma.usuario.create({
                data: {
                    id: Number(id),
                    senha,
                    perfil: Number(perfil)
                }
            });
        }
    });
}

async function insereEquipamentos() {
    equipamentosData.split('\r\n').map(async (linha, i) => {
        if (i > 0) { //ignora a primeira linha
            const [id, equipamento, imagem, descricao, ativo, data] = linha.split(';');
            await prisma.equipamento.create({
                data: {
                    id: Number(id),
                    equipamento,
                    imagem,
                    descricao,
                    ativo: Number(ativo),
                    data: new Date(data)
                }
            });
        }
    });
}

async function insereComentarios() {
    comentariosData.split('\r\n').map(async (linha, i) => {
        if (i > 0) { //ignora a primeira linha
            const [id, comentario, equipamento, perfil, data] = linha.split(';');
            await prisma.comentario.create({
                data: {
                    id: Number(id),
                    comentario,
                    equipamento: Number(equipamento),
                    perfil: Number(perfil),
                    data: new Date(data)
                }
            });
        }
    });
}

// Função principal para semear os dados
async function run(req, res) {
    await inserePerfis();
    await insereUsuarios();
    await insereEquipamentos();
    await insereComentarios();
    if (req) {
        res.json({ message: 'Dados semeados com sucesso!' });
    }
};

module.exports = {
    run
};