import React, { Fragment, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"

const Articles = props => {

    const { allMongodbGamemoleArticles } = useStaticQuery(
        graphql`
          query {
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
          }
        `)

// const articlesObject = {}
//     Object.keys(allMongodbGamemoleArticles.edges).map(article => {
//         const currentArticle = allMongodbGamemoleArticles.edges[article].node
//         articlesObject[article] = {
//             id: currentArticle.id,
//             title: currentArticle.title,
//             link: currentArticle.link,
//             source: currentArticle.source,
//             sourceRef: currentArticle.sourceRef,
//             logo: currentArticle.logo,
//             summary: currentArticle.summary
//         }
//     })


const articlesObject = Object.keys(allMongodbGamemoleArticles.edges).map(article => {
    const currentArticle = allMongodbGamemoleArticles.edges[article].node
    return {
        id: currentArticle.id,
        title: currentArticle.title,
        link: currentArticle.link,
        source: currentArticle.source,
        sourceRef: currentArticle.sourceRef,
        logo: currentArticle.logo,
        summary: currentArticle.summary
    }
})

const [databaseArticles, setDatabaseArticles] = useState(articlesObject)
// const [databaseComments, setDatabaseComments] = useState({})

    const savedArticles = (
        <Fragment>
            <article>
                {databaseArticles.map(article => { //databaseArticles
                    return <div key={article.id} className={`articleDiv ${article.source} savedArt`} id={article._id}>
                        <a href={article.sourceRef} target='_blank' rel='noopener noreferrer'>
                            {/* <img className='newsLogo' src={`./assets/images/${currentArticle.logo}`} alt={`The logo for ${currentArticle.source}`}></img> */}
                        </a>
                        <h2 className='articleTitle'>{article.title}</h2>
                        <p className='articleSum'>{article.summary}</p>
                        <a className='goToArticleBtn' href={article.link} target='_blank' rel='noopener noreferrer'>
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