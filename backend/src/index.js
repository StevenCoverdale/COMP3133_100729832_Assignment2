require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const context = require('./graphql/context');

const { signupValidation } = require("./middleware/userValidation");
const { employeeValidation } = require("./middleware/employeeValidation");
const { handleValidation } = require("./middleware/validation");

const app = express();
app.use(cors());
app.use(express.json()); // REQUIRED so req.body exists

// Validation middleware
app.use("/graphql", async (req, res, next) => {
  // Only validate if body exists (GraphQL POST requests)
  if (req.body && req.body.operationName) {
    if (req.body.operationName === "Signup") {
      await Promise.all(signupValidation.map(v => v.run(req)));
    }

    if (req.body.operationName === "AddEmployee") {
      await Promise.all(employeeValidation.map(v => v.run(req)));
    }

    try {
      handleValidation(req);
    } catch (err) {
      return res.status(400).json({ errors: JSON.parse(err.message) });
    }
  }

  next();
});

async function start() {
  const server = new ApolloServer({ typeDefs, resolvers, context });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  await mongoose.connect(process.env.MONGO_URI);

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);
  });
}

start();