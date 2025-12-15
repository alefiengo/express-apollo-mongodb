const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./typeDefs');
const { resolvers } = require('./resolvers');
const { connectDB } = require('./db');
require('dotenv').config();

const app = express();
connectDB();

app.get('/', (req, res) => {
    res.send('Hello world!');
});

module.exports = app;

async function start() {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
        plugins: [
            require('apollo-server-core').ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.use('*', (req, res) => res.status(404).send('404 Not Found'));

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
        console.log(`GraphQL endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`);
    });
}

start();
