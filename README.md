<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Game Mole ReWrite
</h1>

This project is an experimental rewrite of the project [GameMole](https://gamemole.herokuapp.com/), which I originally wrote over a week as part of my coding bootcamp curriculum. 

## Overview

1.  **What is GameMole?**

    Game Mole is a website built to scrape and aggregate news articles from multiple gaming news sites into one place, with the ability to mark articles as saved, and leave comments on those saved articles.

2.  **No, but what is it REALLY?**

    In reality the purpose of the project is to learn and display a knowledge of React, Gatsby, GraphQL, MongoDB, Netlify, Apollo, and the NPM package Cheerio in an app with CRUD capabilities. 

3.  **Why the Rewrite?**

  * Have you seen the original site? It's ugly as sin. I bit off more than I could chew in the original project by trying to learn React a week early in the program because I didn't like Handlebars. In crash coursing through React, I failed to make the site look alright, and there are multiple clearly unfinished parts of the app.
  * In my rush, I also failed to fully learn React, as shown in how I didn't fully use State properly. I want to have a more polished product to show that I indeed now know React.
  * The original is slow as molasses This is largely due to the asynchronous calls, in which I didn’t have any sort of “Loading” or “Fetching Articles” note, which I would have been incapable of writing at the time anyway. I have many more tools in my toolbox now to speed things up.
  * Speaking of tools, I plan on using this opportunity to further learn new tech, such as Gatsby GraphQL, Netlify, and Apollo. 

4. **Tech Stack**
      * [Gatsby](https://www.gatsbyjs.org/) - Gatsby is my tool of choice for a fast static website and SEO.
      * [GraphQL](https://graphql.org/) - Through Gatsby I want to start learning GraphQL, and use it to bring in my database data more swiftly.
      * [Netlify](https://www.netlify.com/) - Netlify will allow me to use serverless functions to bypass CORS locally, and create a static site with dynamic capabilities. I might eventually host on Netlify, but I need to look into it more.
      * [Apollo](https://www.apollographql.com/) - I plan on incorporating Apollo to use its GraphQL tools.
      * [MongoDB](https://www.mongodb.com/) - MongoDB, hosted on [Mongo Atlas](https://www.mongodb.com/cloud/atlas/lp/general/try?utm_source=google&utm_campaign=gs_americas_united%20states_search_brand_atlas_desktop&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&gclid=Cj0KCQiAqY3zBRDQARIsAJeCVxNwTt1CBhnzyRpA2F4wm2xImHeRMoysFMh3Ch8SCsSQrkZEoGFzJBgaApLAEALw_wcB), with the [Mongoose](https://mongoosejs.com/) ODM, is going to be my database of choice for this project, as I want to slowly incorporate different kinds of databases with GraphQL. This is also partially because the original project was built with MongoDB and I want to be able to reuse some of the code to speed things along.
      * [Cheerio](https://www.npmjs.com/package/cheerio) - This will be my HTML scraping package of choice for the moment, mostly because I already used it in the original project, and I don’t want to add another new tech to learn to the pile with JsDOM.
 
5. **Why the Slow Updates?**
  As I am out of my bootcamp, and I'm working basically full time, this project is very much a side project that I do in my spare time. While I'm hoping to get done sooner than later so I can use what I learn here in my other more interesting projects, I also want to take my time to really learn and absorb this stuff, so progress will be slow and steady, but don't worry, we'll win the race eventually. 
