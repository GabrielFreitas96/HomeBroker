const swaggerConfig = {
  definition: {
    openapi:"3.0.1",
    info: {
      title: "Testes XP com Swagger",
      description: "Api de uma corretora documentada pelo Swagger",
      version:"1.0"
    },
    servers: [{
      url:"http://localhost:3000",
      description: "rotas servidor local"    
    }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    }
  },
  apis: ["./src/routers/ativoRouter.ts",
        "./src/routers/clienteRouter.ts",
        "./src/routers/contaRouter.ts",
        "./src/routers/investimentoRouter.ts",
        "./src/routers/loginRouter.ts",
        ]
}

export default swaggerConfig;