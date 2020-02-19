const path = require("path")
const { ApolloServer } = require("apollo-server-lambda")
const { importSchema } = require("graphql-import")
const { makeExecutableSchema } = require("graphql-tools")
const { resolvers } = require("./resolvers")

const typeDefs = importSchema(path.join(__dirname, "schema.graphql"))
console.log("TypeDefs coming next")
console.log(typeDefs)
console.log("Then Resolvers")
console.log(resolvers)
const schema = makeExecutableSchema({ typeDefs, resolvers })

console.log(schema)

const server = new ApolloServer({
  schema,
  resolvers,
  introspection: true,
  playground: true,
})

exports.handler = server.createHandler()
