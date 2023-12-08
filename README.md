# ProjetoWebBack-end
Tecnologias
Deverão ser empregados as seguintes tecnologias na construção do projeto:
 Framework: será utilizado o framework Express, juntamente com os pacotes
apresentados em sala de aula. A utilização de alguma ferramenta adicional
deverá ser consultada, sob penalidade de invalidação do trabalho.
 Banco de dados:Utilizado Sequelize para conexão com Mysql 
 Todas as funcionalidades deverão ser implementadas em formato de API REST
não sendo necessário o desenvolvimento de uma interface. Portanto, os testes
deverão ser realizados utilizando uma ferramenta específica para esta finalidade
como Nodemon, Insomnia, Talend, etc.

Usuários e sistema de autenticação (30%)
Os seguintes requisitos deverão ser implementados em relação ao gerenciamento e
controle de usuários:
1. O sistema deverá possuir uma rota que permite o cadastro de usuários. A rota
deve receber os dados pessoais e as credenciais (usuário e senha) para
autenticação na API.
2. O sistema deverá possuir um (ou mais) usuários administradores que possuem
privilégios específicos como alterar e excluir outros usuários e criar outros
administradores. A instalação do sistema deverá criar um usuário administrador
por padrão na aplicação.
3. Deverá haver uma rota para que os administradores possam criar outros
administradores.
4. Deverá haver uma rota para que os administradores possam excluir um usuário
não administrador.
5. /A rota de login deverá receber o usuário e senha gerar um token JWT que
permitirá acesso às rotas protegidas da API
6. Um usuário poderá alterar seus dados pessoais por meio de uma rota
específica. Os usuários comuns não poderão alterar dados de outros usuários,
todavia os administradores poderão.

Sistema CRUD (valor: 30%)
Como requisito principal, o sistema deve permitir a realização de 3 (individual) ou 4
(dupla) cadastros (operações de CRUD completa), tal que, estes itens apresentem
entre si relacionamentos de um-para-muitos ou muitos-para-muitos, de acordo com a
livre escolha de cada aluno. Obrigatoriamente as operações de inserção, alteração e
exclusão devem ser restritas para o usuário autenticado no sistema (que possuem um
token válido). A restrição do acesso para as operações de listar e buscar pelo
identificador único são de livre escolha do desenvolvedor, conforme o tema proposto.
É necessário realizar a validação adequada dos dados fornecidos pelo usuário, e gerar
mensagens de erros personalizadas conforme o erro obtido. As mensagens de erros e
sucessos deverão ser enviadas juntamente com as respostas. Os métodos HTTP GET,
POST, PUT e DELETE devem ser empregados segundo a operação a ser executada.
Os métodos de listar deverão implementar a paginação dos dados, de tal forma que
eles devem receber 2 parâmetros: limite e página. O atributo limite define quantos
objetos devem ser retornados (os valores possíveis deverão ser 5, 10 e 30) na
consulta. O atributo página define o ponto em que começa o retorno. Por exemplo,
limite=5 e página=1, retorna os 5 primeiros registros; limite=5 e página=3, ignora os 10
primeiros registros e retorna do 11
o ao 15 registro.

Lógica de negócio, instalador e documentação (valor: 40%)
Deverá ser implementado alguma operação especial de livre escolha do aluno ou dupla
(disponível por uma ou mais rotas) implementando uma lógica de negócio que pode
envolver inserção/alteração no banco de dados, geração de consultas elaboradas e/ou
algum processamento dos dados sejam eles recebidos por parâmetros ou do próprio
banco de dados.
Além disso, deverá ser criado uma rota GET /install/ que realiza a instalação do banco
de dados (criação das tabelas/coleções e inserção de dados no banco). Cada
tabela/coleção deverá ser populada com pelo menos 5 registros.
Deverá ser criado uma rota GET /docs contendo a documentação gerada pela
ferramenta Swagger.
Prazos de entrega
A entrega se dará a partir da semana do dia 27 de novembro a partir de agendamento prévio
via Moodle em um sistema de fila (O primeiro a agendar será o primeiro a apresentar). O
agendamento sem apresentação levará a um desconto da nota. Se porventura, o número de
alunos solicitantes for maior do que a capacidade do professor de avaliar, os alunos não
atendidos deverão apresentar na próxima aula.

#Recomendaçoes para utilização do projeto!

1. Criar um database com nome de "clinica".
2. Comando para rodar projeto npm start.
3. Rodar a rota /install para criar os dados. 
4. Caso realize alguma alteração nas rotas necessario atualizar a documentação com o seguinte comando npm start  generate-swagger.


