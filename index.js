const express = require('express');
const app = express();
const expressGraphql = require('express-graphql');
const {GraphQLSchema} = require('graphql');

const RootQueryType = require('./resolvers/query');
const RootMutationType = require('./resolvers/mutation');

const Schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

app.use('/graphql',expressGraphql({
    schema: Schema,
    graphiql: true,
}))

app.listen(3000, ()=>{
    console.log('Server running');    
});
