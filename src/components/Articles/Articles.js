import React, { Fragment, useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
// import { useStaticQuery, graphql } from "gatsby"

// const Articles = useStaticQuery(
//     graphql`
//       query {
//         allMongodbGamemoleArticles {
//             edges {
//             node {
//                 id
//                 title
//                 summary
//                 sourceREF
//                 source
//                 mongodb_id
//                 logo
//                 link
//             }
//             }
//         }
//       }
//     `)


const Articles = props => {
    
const getArticles = gql`
{
    allMongodbGamemoleArticles {
        edges {
        node {
            id
            title
            summary
            sourceREF
            source
            mongodb_id
            logo
            link
        }
        }
    }
}`

const { loading, error, data } = useQuery(getArticles)

    if (loading) return "loading...";
    if (error) return `error: ${error.message}`;

    // const [databaseArticles, setDatabaseArticles] = useState({data})
    // const [databaseComments, setDatabaseComments] = useState({})

    const savedArticles = (
        <Fragment>
            <article>
                {Object.keys(data).map(article => { //databaseArticles
                    const currentArticle = data[article] //databaseArticles

                    return <div key={currentArticle._id} className={`articleDiv ${currentArticle.source} savedArt`} id={currentArticle._id}>
                        <a href={currentArticle.sourceRef} target='_blank' rel='noopener noreferrer'>
                            {/* <img className='newsLogo' src={`./assets/images/${currentArticle.logo}`} alt={`The logo for ${currentArticle.source}`}></img> */}
                        </a>
                        <h2 className='articleTitle'>{currentArticle.title}</h2>
                        <p className='articleSum'>{currentArticle.summary}</p>
                        <a className='goToArticleBtn' href={currentArticle.link} target='_blank' rel='noopener noreferrer'>
                            <button>
                                Read Article
                            </button>
                        </a>
                        {/* <DeleteButton />
                        {currentArticle.notes.map(note => {
                            return <div key={note._id} className='eachComment' id={note._id}>
                                <p>{note.message}</p>
                                <button className='commBtn' onClick={this.deleteComment}><i className="fas fa-trash-alt"></i></button>
                            </div>
                        })}
                        <CommentingDiv /> */}
                    </div>

                    })}
            </article>
        </Fragment>
    )
    
    const scrapedArticles = (
        <Fragment>
            
        </Fragment>
    )

    const allArticles = <Fragment>
        {savedArticles}
        {scrapedArticles}
    </Fragment>

    return allArticles
}

export default Articles