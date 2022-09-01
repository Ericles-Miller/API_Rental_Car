# Requisitos de negócio

## Cadastro de Carro

### Requisitos funcionais

- deve ser possível cadastrar um novo carro.
- deve ser possível listar todas as categorias.

### Requisitos não Funcionais

- Não deve ser possível cadastrar um carro com uma placa já existente.
- Não deve ser possível alterar a placa do carro .
- O carro deve ser cadastrado por padrão com disponibilidade.
- O usuário responsável pelo cadastro de carro deve ser um admin.

## Listagem do Carros

### Requisitos Funcionais

- Deve ser possível listar todos carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria .
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.

### Requisitos não Funcionais

- O usuário não precisa estar logado no sistema.

## Cadastro de Especificação no Carro

### Requisitos Funcionais

- Deve ser possível cadastrar uma especificação para um carro.
- Deve ser possível listar todas as especificações .
- Deve ser possível listar todos os carros.

### Requisitos não Funcionais

- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.

## Cadastro de Imagem do Carro

### Requisitos Funcionais

- Deve ser possível cadastrar a imagem do carro.
- deve ser possível listar todos os carros

### Requisito não Funcional

- utilizar o multer para upload dos arquivos.

### Requisito não Funcional

- o usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um admin

## Aluguel do Carro

### Requisito Funcional

- Deve ser possível cadastrar um aluguel.

### Requisito não Funcional

- O aluguel deve ter duração de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso exista um aberto para o mesmo carro.
