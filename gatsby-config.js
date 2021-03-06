require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Game Mole`,
    description: `An aggregator of the latest news from the most popular game news sites on the internet.`,
    author: `Edward L Cheever II`,
  },
  plugins: [
    `gatsby-theme-apollo`,
    {
      resolve: 'gatsby-plugin-express',
      options: {
        output: 'config/gatsby-express.json',
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-mongodb`,
      options: { 
        connectionString: `mongodb+srv://${process.env.GATSBY_MONGO_USER}:${process.env.GATSBY_MONGO_PASSWORD}@${process.env.GATSBY_MONGO_SERVER}.mongodb.net/${process.env.GATSBY_MONGO_DB}?retryWrites=true&w=majority`,
        dbName: `${process.env.GATSBY_MONGO_DB}`, 
        collection: [`articles`, `comments`],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
