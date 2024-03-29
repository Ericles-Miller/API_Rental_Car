Cadastro de carro
RF

Deve ser possível cadastrar um novo carro.
RN

Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado, por padrão, com disponibilidade.
O usuário responsável pelo cadastro deve ser um usuário administrador.
Listagem de carros
RF

Deve ser possível listar todos os carros disponíveis
Deve ser possível listar todos os carros disponíveis pelo - nome da categoria
Deve ser possível listar todos os carros disponíveis pelo - nome da marca
Deve ser possível listar todos os carros disponíveis pelo - nome do carro
RN

O usuário não precisar estar logado no sistema.
Cadastro de Especificação no carro
RF

Deve ser possível cadastrar uma especificação para um carro
RN

Não deve ser possível cadastrar uma especificação para um - carro não cadastrado.
Não deve ser possível cadastrar uma especificação já - existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário - administrador.
Cadastro de imagens do carro
RF

Deve ser possível cadastrar a imagem do carro
RNF

Utilizar o multer para upload dos arquivos
RN

O usuário deve poder cadastrar mais de uma imagem para o - mesmo carro
O usuário responsável pelo cadastro deve ser um usuário - administrador.
Alugel de carro
RF

Deve ser possível cadastrar um aluguel
RN

O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já - exista um aberto para o mesmo usuário
Não deve ser possível cadastrar um novo aluguel caso já - exista um aberto para o mesmo carro
O usuário deve estar logado na aplicação
Ao realizar um aluguel, o status do carro deverá ser - alterado para indisponível
Devolução de carro
RF

Deve ser possível realizar a devolução de um carro
RN

Se o carro for devolvido com menos de 24 horas, deverá - ser cobrado diária completa.
Ao realizar a devolução, o carro deverá ser liberado para - outro aluguel.
Ao realizar a devolução, o usuário deverá ser liberado - para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do - aluguel.
Caso o horário de devolução seja superior ao horário - previsto de entrega, deverá ser cobrado multa - proporcional aos dias de atraso.
Caso haja multa, deverá ser somado ao total do aluguel.
O usuário deve estar logado na aplicação
Listagem de Alugueis para usuário
RF

Deve ser possível realizar a busca de todos os alugueis para o usuário
RN

O usuário deve estar logado na aplicação
Recuperar Senha
RF

Deve ser possível o usuário recuperar a senha informando o e-mail
O usuário deve receber um e-mail com o passo a passo para a recuperação da senha
O usuário deve conseguir inserir uma nova senha
RN

O usuário precisa informar uma nova senha
O link enviado para a recuperação deve expirar em 3 horas
=======
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
- Não deve ser possível cadastrar um novo aluguel casa já exista um aberto para o mesmo carro.
- O usuário deve estar logado na aplicação.
- Ao realizar o aluguel do carro, o carro tem que ficar com o status de indisponível.

Requisitos não funcionais

## Devolução do Carro

### Requisito funcionais

- Deve ser possível realizar a devolução de um carro

### Requisitos não Funcionais

- Se o carro for devolvido com menos de 24 horas deverá ser cobrado a diária completa.
- Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- o realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- Ao realizar a devolução, deverá ser calculado o total do aluguel.
- Caso o horário de devolução seja superior ao harário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
- Caso haja multa, deverá ser somado ao total do aluguel.
