module.exports = {
  siteMetadata: {
    title: `Game Mole`,
    description: `An aggregator of the latest news from the most popular game news sites on the internet.`,
    author: `Edward L Cheever II`,
  },
  plugins: [
    // {
    //   resolve: `gatsby-source-mongodb`,
    //   options: { connectionString: process.env.MONGODB_URI, dbName: `gamemole`, collection: `documents` },
    // },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
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
