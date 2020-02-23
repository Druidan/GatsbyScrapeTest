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
    
const [databaseArticles, setDatabaseArticles] = useState(null)
// const [databaseComments, setDatabaseComments] = useState({})

let articlesObject = {}
    Object.keys(allMongodbGamemoleArticles.edges).map(article => {
        const currentArticle = allMongodbGamemoleArticles.edges[article].node
        articlesObject[article] = {}
        articlesObject[article].title = currentArticle.title
        articlesObject[article].link = currentArticle.link
        articlesObject[article].source = currentArticle.source
        articlesObject[article].sourceRef = currentArticle.sourceRef
        articlesObject[article].logo = currentArticle.logo
        articlesObject[article].summary = currentArticle.summary
    })
    console.log(articlesObject)



const articlesArr = allMongodbGamemoleArticles.edges
    const savedArticles = (
        <Fragment>
            <article>
                {Object.keys(articlesArr).map(article => { //databaseArticles
                    const currentArticle = articlesArr[article].node //databaseArticles
                    return <div key={currentArticle.id} className={`articleDiv ${currentArticle.source} savedArt`} id={currentArticle._id}>
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