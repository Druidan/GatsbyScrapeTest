import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const Article = props => {

    const story = props.data.mongodbgamemolearticles

    return (
      <Layout>
        <div>
          <a href={story.url || "/"} className="itemlink">
            {story.name || "nameless"}
          </a>
          <p>
            <div
              className="story"
            />
          </p>
        </div>
      </Layout>
    )
}

export default Article

export const pageQuery = graphql`
  query($id: String!) {
    mongodbgamemolearticles(id: { eq: $id }) {
      id
      name
      url
      description {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`