// Define a utilização do model cliente e a dependência http-status
const Produtos = require('../models/produto');
const status = require('http-status');
 
// Cria o método Insert, obtendo os dados da request
exports.Insert = (req, res, next) => {
    const nome = req.body.nome;
    const preco = req.body.preco;
    const quantidade = req.body.quantidade;
    const descricao = req.body.descricao;
    const ativo = req.body.ativo;
 
    // Popula cada um dos campos do model com os campos recebido na request
    Produtos.create({
        nome: nome,
        preco: preco,
        quantidade: quantidade,
        descricao: descricao,
        ativo: ativo,
    })
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(produtos => {
            if (produtos) {
                res.status(status.OK).send(produtos);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        //catch = registra o que queremos que aconteca quando a Promise falhar
        .catch(error => next(error));
};
 
exports.SelectAll = (req, res, next) => {
    Produtos.findAll()
        .then(produtos => {
            if (produtos) {
                res.status(status.OK).send(produtos);
            }
        })
        .catch(error => next(error));
}
 
exports.SelectDetail = (req, res, next) => {
    const id = req.params.id;
 
    Produtos.findByPk(id)
        .then(produtos => {
            if (produtos) {
                res.status(status.OK).send(produtos);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};

exports.Update = (req, res, next) => {
    const id = req.params.id;
    const nome = req.body.nome;
    const preco = req.body.preco;
    const quantidade = req.body.quantidade;
    const descricao = req.body.descricao;
    const ativo = req.body.ativo;
 
    Produtos.findByPk(id)
        .then(produtos => {
            if (produtos) {
                produtos.update({
                    nome: nome,
                    preco: preco,
                    quantidade: quantidade,
                    descricao: descricao,
                    ativo: ativo,
                },
                    {
                        where: { id: id }
                    })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
 
exports.Delete = (req, res, next) => {
    const id = req.params.id;
 
    Produtos.findByPk(id)
        .then(produtos => {
            if (produtos) {
                produtos.destroy({
                    where: { id: id }
                })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            }
            else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};