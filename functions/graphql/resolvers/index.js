// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    getArticles: (parent, args, context) => {
      return find(articles, { 
        id: args.id,
        title: args.title,
        summary: args.summary,
        sourceREF: args.sourceREF,
        source: args.source,
        mongodb_id: args.mongodb_id,
        logo: args.logo,
        link: args.link,
      })
    }
  }
}

module.exports = {
  resolvers,
}
