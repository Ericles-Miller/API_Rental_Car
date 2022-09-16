# Criando API com Node.js

As config iniciais desse projeto são encontradas no cap. anterior da nossa doc.

Criando Categorias 

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fc15ef87-cca3-4bd7-9f34-516d6db7d0df/Untitled.png)

Essas serao nossas classe para a criacao da API

## **Criando Rotas de Navegacao**

Em seguida criaremos a pasta routes em src. Essa pasta ficara os scripts relacionados a criação de rotas. Feito isso, criaremos o scprit com o nome **`categories.routes.ts`.** Em seguida adicionaremos o seguinte código 

```tsx
import { Router } from 'express'; //importo da biblioteca express

// lembrando que essa variavel deve ser importada no arquivo server.ts
// o arquivo server.ts ele e responsavel de gerenciar todas as rotas 
const categoriesRoutes = Router(); // declaro uma var de rotas 

// arrays e var globais 
const categories = [];

/**
* criando as rotas abaixo 
* Como foi definido usamos o nome da var de rotas(categoriesRoutes) 
*/
categoriesRoutes.post("/categories", (request, response) =>{
    const {name,description} = request.body;
    const categorie = {
        name,
        description
    };

    categories.push(categorie);

    return response.status(201).send()
})

export {categoriesRoutes} // exporto para poder referenciar e usar em outros codigos
```

Já no arquivo server.ts escreva o código 

```tsx
import  express from "express"; // importando o modulo express 

/**
* importando a var de rotas do script categories.routes.ts(dentro da pasta routes)
* essa [e a forma de importar as rotas da pasta scr/routes
*/
import { categoriesRoutes } from './routes/categories.routes'; 

const app = express();
app.use(express.json()); // metodo do express para usar json em requests

/* ===========================================================
/*              Rotas vindas de routes 
/* ===========================================================*/

/*// aqui por fim chamo as rotas relacionadas ao script categories.routes.ts
* essa metodo relaciona a todas as rotas relacionadas ao script que tem como definido 
* como rota a var categoriesRoutes 
*/
app.use(categoriesRoutes); 

app.listen(3333, () => console.log("Server is running!"));
```

Dando prosseguimento a nossa API, vamos introduzir como vimos a biblioteca uuid para usarmos em nossas var relacionadas ao ID. Dessa forma, introduze o seguinte código 

```bash
yarn add @types/uuid -D
```

**Como vimos anteriormente ao criar rotas, podemos otimizar nosso tempo e numero de linhas de código fazendo um novo tipo de declaração de rotas. Siga os passos abaixo:**

No código server.ts substitua o seguinte código 

```tsx
app.use(categoriesRoutes);
```

por 

```tsx
app.use("/categories", categoriesRoutes);
```

e em `categories.routes.ts` substitua para o seguinte código

```tsx
categoriesRoutes.post("/", (request, response) =>{
....
)};
```

## Criação de Classes

Para criarmos nossas classes precisamos criar uma pasta dentro src chamada `model`. Feito isso, crie o arquivo `category.ts` e adicione a classe dentro dele

```tsx
// declarando um classe
class Category {
	id: string; // not exits uuid4 in typescript
	name: string;
	description: string;
	created_at: string;

}
```

O import da classe foi feito automaticamente. Se nao for feito de forma automatic faca isso no script `categories.routes.ts`

```tsx
import { Category } from '../model/category'; // import of class 

```

Feito isso precisamos inicializar a nossa classe. Faca isso: Acesse o código `categories.routes.ts` e substitua a variável `categories` por isso 

```tsx
const categories: Category[] = [];

/* e no vetor category do mesmo script tambem */
const category: Category = {
...
};
```

Ficando dessa seguinte forma:

```tsx

import { Category } from '../model/category'; // import of class 

// arrays e var globais 
const categories: Category[] = []; // instance class 

categoriesRoutes.post("/", (request, response) =>{
    const {name,description} = request.body;
    const category: Category = {
        id: uuid4(),    // -- nao esqueca do parenteses 
        name,
        description,
        created_at: new Date()
    };

    categories.push(category);

    return response.status(201).send()
});

export {categoriesRoutes} // exporto para poder referenciar e usar em outros codigos
```

## Construct

Para criarmos o id de forma randomica da formas que estamos fazendo, teremos alguns erro. Para isso, setaremos um construct para nos auxiliar.

```tsx
import {v4 as uuidV4} from 'uuid'; // import do uuid4

class Category{
    id?: string; // not exists in typescript uuid4
    name: string;
    description: string;
    created_at: Date;

    constructor() {
        if(!this.id){
            this.id = uuidV4();
        }
    }
}
```

Como vemos acima, inicializamos um construct para verificar se existe um id. Além disso, decidimos colocar o id como opcional para nao termos o erro de subscrever o id da categoria.

Para facilitar nossa visualização vamos retornar um arquivo json na nossa rota post para verificarmos como esta sendo cadastrado nossa categoria 

```tsx
categoriesRoutes.post("/", (request, response) =>{
    const {name,description} = request.body;
    const category: Category = {
        name,
        description,
        created_at: new Date()
    };

    categories.push(category);

    return response.status(201).json({category}); // alteracao feita 
});
```

Se observamos ao mandarmos o insomnia fazer o post desses dados o id nao aparecera em nossos dados. Diante disso, faremos essa seguinte alteracao

```tsx
const category = new Category();
        category.name        = name,
        category.description = description
        category.created_at  = new Date(),

    categories.push(category);
```

Ao analisar acima vemos que instanciamos a classe a var category. Com isso, o nosso contrcutor ira funcionar e ao analisar os dados quando forem salvos estarão salvos.

So que temos como melhorar isso ainda. Se analisarmos se tivéssemos uma classe com vários atributos ficaria cansativo chamar todos os atributos na `categoty.atributo` . Assim, podemos fazer da seguinte forma.

```tsx
const category = new Category();
    
    Object.assign(category, {
        name,
        description,
        created_at : new Date()
    });
```

## Criando Repositório Category

O que iremos desenvolver aqui tem a funcao de receber os dados e inserir no banco de dados ou mesmo em arquivos json. Essa caracteristica de desenvolvimento tem como objetivo minimizar o nosso cod de rotas alem de padroes de organizacao. Entao criaremos o dentro de `src` uma pasta chamada de `repositories`. Em seguida crie o arquivo com o nome `CategoriesRepositore.ts` . Ao fazer isso, faca o seguinte:

- Crie uma classe conforme o Código abaixo

```tsx
class CategoriesRepository {
	private categories: Category [];

}
export { categoriesRepository } 
```

- Em seguida crie um constructor. Ele auxiliará na inserção da aplicação

```tsx
constructor(){
this.categories = [];
```

- Após isso, por organização criaremos uma interface. Esse processo [e chamado de DTO(data transfer object)

```tsx
//DTO => data transfer object
interface ICreatedCategoryDTO {
    name: string;
    description: string;
}
```

- Depois disso, precisamos criar uma função create para inserir nossos dados. Faca isso:

```tsx
create({description, name} : ICreatedCategoryDTO) {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
            created_at : new Date()
        });
    
        this.categories.push(category);
    }
```

Agora, precisamos alterar o nosso Código `categories.routes.ts` com o seguinte Código 

```tsx
// precisamos importar o codigo vindo do repositories
import { CategoriesRepository } from '../repositories/CategoriesRepository';

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;
    
    categoriesRepository.create({name, description}); // chamo a funcao create referente a class categoriesRepository 
    
    return response.status(201).send();
});
```

## Listando dados Categorias

Precisamos listar nossos dados, para isso necessitamos criar a funcao `list` .Veja abaixo a funcao definida na class `CategoriesRepository`

```tsx
list(): Category[] { // parametro que sera retornado 
        return this.categories
    }
```

Agora precisamos definir a rota em nosso arquivo `categories.routes.ts` . 

```tsx
categoriesRoutes.get('/', (request,response) =>{
    const all = categoriesRepository.list(); // chamo a funcao list da classe categoriesRepository 
    return response.json(all); // retorna o arquivo json de categories 
})
```

## Validando Cadastro de Categoria

Se analisarmos a nossa modelagem de dados temos o requisito que n’ao podemos cadastrar duas ou mais categorias iguais. Além disso, seu id deve ser único. Para resolvermos esse problema, precisamos criar uma função que valide isso, da seguinte forma.

```tsx
findByName(name:string):Category {
        //categories -- list of class category -- set up 
        const category = this.categories.find(category => category.name === name);// check if exists 
        return category;
    }
```

Ja temos a função, agora precisamos valida-la na nossa rota de criar categoria no arquivo `categories.routes.ts` . A nossa rota ficara dessa forma!

```tsx
categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const categoryAlreadyExists = categoriesRepository.findByName(name);
    if(categoryAlreadyExists) {
        return response.status(400).json({error:"Category already exists!"});
    }
    
    categoriesRepository.create({name, description});
    return response.status(201).send();
});
```