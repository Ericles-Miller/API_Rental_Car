const { response }  = require ('express') 
const express = require('express')

const app = express();
app.use(express.json()); // usado para o json 
app.listen(3033)// porta da api

// var 
const {v4: uuidV4} = require ("uuid") // gera ids aleatorios(V4) -- pesquise para saber sobre as outras versoes 
const customers = [];


/**
 * --- Requisitos ---
 * deve ser possivel criar uma conta 
 * deve ser possivel buscar o extrato bancario do cliente
 * deve ser possivel realizar um deposito 
 * deve ser possivel buscar o extrato bancario do clente por data 
 * deve ser possivel atualizar dados da conta do cliente 
 * deve ser possivel obter dados da conta do cliente 
 * deve ser possivel deletar uma conta 
 */


/**
 * --- Regras de Negocio ---
 * nao deve ser possivel cadastrar uma conta com cpf ja existente
 * nao deve ser possivel fazer deposito em uma conta que nao existe 
 * nao deve ser possivel fazer saque me uma conta nao existente
 * nao deve ser possivel excluir uma conta nao existente 
 * nao deve ser possivel fazer um saque quando o saldo for insuficiente 
 */


/**
 * CPF- String 
 * nome - string 
 * id - uuid -- unique universe identifier 
 * statement [] 
 */
app.post("/account", (request, response)=> {
    // conceito de desestruturacao -- {} 
    const {cpf, name}  = request.body; // parametro para receber o dados -- request body 
    
    //verif if exists cpf  equal
    const customerAlreadyExists = customers.some((customers)=> customers.cpf === cpf // tem que ser igual o tipo e valor da var 
    );

    if (customerAlreadyExists){
        return response.status(400).json({error: "Customers already exits!"});
    }
    
    //pode ser definido dentro do objeto  -- veja abaixo 
    //const id = uuidV4() // chamei a funcao para gerar n aleatorios para o id 
    customers.push({
        id: uuidV4(), 
        name,
        cpf,
        statement: []
    });
    // metodo send nao returna nada 
    // status -- http code para created -- visualizar notion 
    return response.status(201).send();
}); // usando metodo de requisicao post 


app.get("/statement", (request, response) => {
    const {cpf } = request.headers;
    // find encontra a var passada na rota 
    const customer = customers.find((customer) => customer.cpf === cpf);

    if(!customer){ // verifico se existem um cpf
        return response.status(400).json({error: "Customer not fald!"})
    }
    return response.json(customer.statement);
})
