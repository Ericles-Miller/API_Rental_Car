const { response } = require('express');
const express = require('express');

const app = express();

app.use(express.json()) // uso essa func para poder receber os dados do arq Json no metodo post
/** 
 * Get    -- buscar uma informação dentro do servidor 
 * Post   -- Insserir uma informação no server 
 * Put    -- alterar uma info no server 
 * patch  -- altera uma info especifica no server 
 * Delete -- deletar uma info no server 
 * existem outras requisições, pesquise
 */

/**
 * tipos de paramentros 
 * 
 * -- Route params => identificar um recurso editar/deletar/buscar 
 * -- Query params => paginacao/filtro
 * -- body  params => os objects insercao/alteracao (JSON)
 */
// Rotas e suas dfefinicoes 
app.get("/courses", (request, response) => {
    const query = request.query; // serve para ler determinada pagina 
    console.log(query);
    return response.json(["Curso1","Curso2","Curso3",])
});

app.post("/courses", (request, response) => {
    const body = request.body; // recebera os dados do json 
    console.log(body);
    return response.json([,"Curso1","Curso2","Curso3","Curso4"]);
});

app.put("/courses/:id", (request, response) => {
    const params = request.params; // pego o valor de id passado no insomnia  --- lembrando ele foi definido na requisicao com um valor 
    console.log(params);

    // outra forma de receber esse id 
    const { id } = request.params; 
    console.log(id);
    return response.json(["Curso6","Curso2","Curso3","Curso4"]); //alteracao no curso para 6
});

app.patch("/courses/:id", (request, response) => {
    return response.json(["Curso6", "Curso7","Curso3","Curso4"]);
});

app.delete("/courses/:id", (request, response) => {
    return response.json(["Curso6", "Curso7","Curso4"]);
});
//localhost:3033
app.listen(3033); // porta da api 

