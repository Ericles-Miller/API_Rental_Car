const { response }  = require ('express') 
const express = require('express')

const app = express();
app.use(express.json()); // usado para o json 
app.listen(3033)// porta da api

// var 
const {v4: uuidV4} = require ("uuid") // gera ids aleatorios(V4) -- pesquise para saber sobre as outras versoes 
const customers = [];
/*========================================================================================================*/
/*                              Requisitos e  Regras de Negocio                                           */
/*========================================================================================================*/
/**
 * --- Requisitos ---
 *[x] deve ser possivel criar uma conta 
 *[x] deve ser possivel buscar o extrato bancario do cliente
 *[x] deve ser possivel realizar um deposito 
 *[x] deve ser possivel realizar um saque
 *[] deve ser possivel buscar o extrato bancario do clente por data 
 *[] deve ser possivel atualizar dados da conta do cliente 
 *[] deve ser possivel obter dados da conta do cliente 
 *[] deve ser possivel deletar uma conta 

 * --- Regras de Negocio ---
 * [x]nao deve ser possivel cadastrar uma conta com cpf ja existente
 * [x]nao deve ser possivel fazer deposito em uma conta que nao existe 
 * [x]nao deve ser possivel fazer saque me uma conta nao existente
 * []nao deve ser possivel excluir uma conta nao existente 
 * []nao deve ser possivel fazer um saque quando o saldo for insuficiente 
 */


/*========================================================================================================*/
/*                              Funcoes para funcionamento da API                                         */
/*========================================================================================================*/
function verifiyIfExistsAccountCpf(request, response, next){
    const {cpf } = request.headers;
    // find encontra a var passada na rota 
    const customer = customers.find((customer) => customer.cpf === cpf);

    if(!customer){ // verifico se existem um cpf
        return response.status(400).json({error: "Customer not fald!"})
    }

    request.customer = customer // metodo usado para declarar a variavel que esta na rota statement 
    return next();
}

function getBalance(statement) { 
    const balace = statement.reduce((acc,operation) => { // -- operation acesso o objeto do statement -- foi passado como parametro 
        // acesso o campo type no statement e verifico se e credito 
        if(operation.type === 'credit'){ // if a operacao for == a credito 
            return acc + operation.amount; // pego o valor depositado e somo com o saldo atual da conta 
        }
        else{ // se o type == debit -- pego o valor do saque menos o saldo atual 
            return acc - operation.amount;
        }
    },0) // insiro o valor que quero iniciar o balance 
    //OBS: a var balance foi definida como zero 
    return balace
}

/*============================================================================================*/
/*                                 Rotas e suas requisicoes                                   */ 
/*============================================================================================*/
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


app.get("/statement", verifiyIfExistsAccountCpf, (request, response) => {
    const { customer } = request; // uso da referencia feita na funcao middle em relacao a variavel customers 
    return response.json(customer.statement);
})

app.post("/deposit", verifiyIfExistsAccountCpf, (request, response)=>{
    const { customer } = request; // referencia feita a var customers na middle 

    const {description, amount} = request.body; // parametro para receber dados 

    const statementOperation = { 
        description, 
        amount, 
        created_at: new Date(), // data do deposito 
        type: "credit" //credit if deposit -- debit if saque
    };
    customer.statement.push(statementOperation); // referencio ao id da requisicao statement 
    return response.status(201).send();
})

app.post("/withdraw", verifiyIfExistsAccountCpf, (request,response) => {
    const {amount} = request.body // recebo o valor do saque 
    const {customer} = request; // fucao middle 
    // chamando funcao e retorna o saldo em conta  
    const balance = getBalance(customer.statement)
    //verifico se o saldo em conta e menor que o saque
    if(balance < amount){
        return response.status(400).json({Error:"Insufficient Founds!"});
    }

    const statementOperation = {
        amount, 
        created_at: new Date(), // data do deposito 
        type: "debit" //credit if deposit -- debit if saque
    }; // crio novamente o objeto e passo ele para ser adicionado a lista 

    customer.statement.push(statementOperation); //chamo a requisicao statement e mando os dados pelo request
    return response.status(201).send();
    
})