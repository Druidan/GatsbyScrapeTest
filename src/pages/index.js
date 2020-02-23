import React from "react"

import Layout from "../components/layout/index.js"
import Image from "../components/image"
import SEO from "../components/seo"

import scrape from "../util/scraper"
import Articles from "../components/Articles/Articles.js"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <button onClick={ e =>{scrape(e)}}>Scrape!</button>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Articles scrape={e =>{scrape(e)}}/>
  </Layout>
)

export default IndexPage