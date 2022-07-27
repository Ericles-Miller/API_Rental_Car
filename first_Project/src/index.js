const { response }  = require ('express') 
const express = require('express')

const app = express();
app.use(express.json()); // usado para o json 
app.listen(3033)// porta da api

// var 
const {v4: uuidV4} = require ("uuid") // gera ids aleatorios(V4) -- pesquise para saber sobre as outras versoes 
const customers = []; // -- Var global
/*========================================================================================================*/
/*                              Requisitos e  Regras de Negocio                                           */
/*========================================================================================================*/
/**
 * --- Requisitos ---
 *[x] deve ser possivel criar uma conta 
 *[x] deve ser possivel buscar o extrato bancario do cliente
 *[x] deve ser possivel realizar um deposito 
 *[x] deve ser possivel realizar um saque
 *[x] deve ser possivel buscar o extrato bancario do clente por data 
 *[x] deve ser possivel atualizar dados da conta do cliente 
 *[x] deve ser possivel obter dados da conta do cliente 
 *[x] deve ser possivel deletar uma conta 
 *[x] deve ser possivel fazer o balanco 

 * --- Regras de Negocio ---
 * [x]nao deve ser possivel cadastrar uma conta com cpf ja existente
 * [x]nao deve ser possivel fazer deposito em uma conta que nao existe 
 * [x]nao deve ser possivel fazer saque em uma conta nao existente
 * [x]nao deve ser possivel excluir uma conta nao existente 
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
//funcao para add saque e deposito 
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
    return response.json(customer.statement); // le o objeto do json statment 
});

app.post("/deposit", verifiyIfExistsAccountCpf, (request, response)=>{
    const { customer } = request; // referencia feita a var customers na middle 

    const {description, amount} = request.body; // parametro para receber dados 

    const statementOperation = { 
        description, 
        amount, 
        created_at: new Date(), // data do deposito 
        type: "credit" //credit if deposit -- debit if saque
    };
    customer.statement.push(statementOperation); // faco append para dicionario statement 
    return response.status(201).send();
});

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

    customer.statement.push(statementOperation); //faco o append para o objeto statment 
    return response.status(201).send();
});

app.get("/statement/date",verifiyIfExistsAccountCpf, (request, response) =>{
    const {customer} = request; // request relacionado ao cpf 
    const {date} = request.query; // passo a data por uma query 

    const dateFormat = new Date(date + " 00:00"); // pego a data e defino com 00 horas 
    // filtro a data referente ao saque 
    // acesso o customer relacionado ao cpf do usuario 
    // feito isso acesso com a data passada via query(date) e comparo com a string do obejto 
    //data e vejo se sao iguais ou existem 
    // passo a var acima como parametro 
    const statement = customer.statement.filter((statement) =>
        statement.created_at.toDateString() === new Date(dateFormat).toDateString()// transforma data em string
    );

    return response.json(customer.statement);// mando os dados para o onjeto 
});

app.put("/account", verifiyIfExistsAccountCpf, (request, response)=>{
    const {name} = request.body;
    const {customer}  = request;

    customer.name = name;

    return response.status(201).send();
});

app.get("/account", verifiyIfExistsAccountCpf, (request,response)=>{
    const {customer} = request;

    return response.json(customer);
});

app.delete("/account", verifiyIfExistsAccountCpf, (request, response) => {
    const {customer} = request;

    //splice -- O método splice() altera o conteúdo de uma lista, 
    //adicionando novos elementos enquanto remove elementos antigos.
    //doc -- https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    customers.splice(customer,1) // remove a posicao do customer 1(deletCount)
    // tome cuidado [e de clientes nao cliente 
    return response.status(200).json(customers)
});

app.get("/balance", verifiyIfExistsAccountCpf, (request,response) => { // saldo em conta em outras palavras 
    const {customer} = request;
    const balance = getBalance(customer.statement); // mando os dados do objeto statement refetente ao cpf passado 

    return response.json(balance);// retorno os dados do cliente 
})

