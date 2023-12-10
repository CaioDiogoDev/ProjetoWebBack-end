const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes.js'];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    console.log('Documentação Swagger gerada com sucesso!');
}).catch((err) => {

    console.error('Erro ao gerar a documentação Swagger:', err);
});
