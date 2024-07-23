const express = require('express');
const { GraphQLServer } = require('graphql-yoga');
const { makeExecutableSchema } = require('graphql-tools');
const { importSchema } = require('graphql-import');
const path = require('path');
const { sendEmail } = require('./resolvers/mail'); // Ajustar según tus resolvers

require('dotenv').config();

// Importa el esquema GraphQL
const typeDefs = importSchema('./schema.graphql');

// Define los resolvers
const resolvers = require('./resolvers'); // Ajustar según tus resolvers

// Crea el esquema ejecutable
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Configura Express
const app = express();

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configura Multer para manejar la carga de archivos

// Configura el servidor GraphQL
const graphqlServer = new GraphQLServer({
  schema,
  context: req => ({ ...req }),
});

const port = process.env.PORT || 8000;

// Define los endpoints y configuración del servidor GraphQL
const options = {
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
};

// Define rutas adicionales o manejo de peticiones
graphqlServer.express.post('/sendMail', (req, res) => {
  sendEmail(req);
});

// Inicia el servidor GraphQL
graphqlServer.start(options, () => {
  console.log(`Servidor GraphQL levantado en el puerto ${port}`);
});
