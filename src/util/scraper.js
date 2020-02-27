import fetch from "node-fetch"
import Cheerio from "cheerio"

import { q, l } from './ELC'

const scrape = (e) => {
    if (e) e.preventDefault()

    return new Promise(async function(resolve, reject) {

    
        // Get html from IGN first by calling the Netlify fetchPastCORS function.
        const IGNScrape = fetch(`${process.env.MY_URL}/.netlify/functions/fetchPastCORS`, {
            headers: { 
                'Accept': "text/html", // We want to accept text and html.
                myURL: "https://www.ign.com/articles?tags=news" // We send the targeted url in a custom header that will be used in fetchPastCORS
            }
        })
        // With the response, convert it back to text, and put it and the response status in an object that will be passed along to the next .then().
        .then(ignResponse => 
            ignResponse.text().then(data => ({
                data: data,
                status: ignResponse.status
            }))
        )
        // With the data processed from the response, now we can actually process the data in our final .then()
        .then(ignData => {
            // Create a Cheerio function binding using the response data from IGN.
            const ign$ = Cheerio.load(ignData.data)
            let allIGNResponses = {}
            // Use the IGN Cheerio function to scrape each article in the html and use an each method to iterate over the article nodes.
            ign$('div.listElmnt').each((i, element) => {
                // Create an iterator that we can use to uniquely number our scraped data.
                i = i + 1
                // Create an empty object in which we can store the ign scraped data specifically.
                let ignResult = {}
                // Create an object for each article, then use find and text methods to fill out each of the following properties from the scraped data: title, link, source, sourceRef, logo, and summary.
                ignResult[`ignArticle ${i}`] = {}
                ignResult[`ignArticle ${i}`].title = ign$(element)
                    .find('div.listElmnt-blogItem')
                    .find('a.listElmnt-storyHeadline')
                    .text();
                ignResult[`ignArticle ${i}`].link = ign$(element)
                    .find('div.listElmnt-blogItem')
                    .find('a.listElmnt-storyHeadline')
                    .attr('href')
                ignResult[`ignArticle ${i}`].source = 'IGN'
                ignResult[`ignArticle ${i}`].sourceRef = 'https://www.ign.com'
                ignResult[`ignArticle ${i}`].logo = 'IGNlogo.png'
                const sum = ign$(element)
                    .find('p')
                    .text()
                    .match(/(?<=-)[\s\S]*(?=Read)/g)
                ignResult[`ignArticle ${i}`].summary = sum.join('').trim();
                allIGNResponses = Object.assign(allIGNResponses, ignResult)
            })
            return allIGNResponses            
        })
        .catch(err => {
            console.log("We've got a problem with the IGN call, captain!")
            console.error(err)
            //If there was an error with the called data, return an empty object so that the whole scrape doesn't fail.
            return {}
        })

        // Get html from Game Informer by fetching through the Netlify fetchPastCORS function
        const GIScrape = fetch("http://localhost:8888/.netlify/functions/fetchPastCORS", {
            headers: {
                'Accept': "text/html",  // We want to accept text and html.
                myURL: 'https://www.gameinformer.com/news' // We send the targeted url in a custom header that will be used in fetchPastCORS
            }
        })
        .then( giResponse => 
            giResponse.text().then(data => ({
                data: data,
                status: giResponse.status
            }))
        )
        .then(giData => {
            // Create a Cheerio function binding using the response data from Game Informer.
            const gi$ = Cheerio.load(giData.data)
            let allGIResponses = {}
            // Use the Game Informer Cheerio function to find each article in the html and use an each method to iterate over the article nodes.
            gi$('article.node--type-article').each((i, element) => {
                // Create an iterator that we can use to uniquely number our scraped data.
                i = i + 1
                // Create an empty object in which we can store the Game Informer scraped data specifically.
                const giResult = {}
                // Create an object for each article, then use find and text methods to fill out each of the following properties from the scraped data: title, link, source, sourceRef, logo, and summary.
                giResult[`giArticle ${i}`] = {}
                giResult[`giArticle ${i}`].title = gi$(element)
                    .find('span.field--name-title')
                    .text()
                giResult[`giArticle ${i}`].link = gi$(element)
                    .find('h2.page-title')
                    .find('a')
                    .attr('href')
                giResult[`giArticle ${i}`].source = 'Game Informer'
                giResult[`giArticle ${i}`].sourceRef = 'https://www.gameinformer.com/'
                giResult[`giArticle ${i}`].logo = 'GIlogo.png'
                giResult[`giArticle ${i}`].summary = gi$(element)
                    .find('div.field--name-field-promo-summary')
                    .text()
                allGIResponses = Object.assign(allGIResponses, giResult)
            })
            return allGIResponses
        })
        .catch(err => {
            console.log("We've got a problem with the Game Informer call, captain!")
            console.error(err)
            //If there was an error with the called data, return an empty object so that the whole scrape doesn't fail.
            return {}
        })

        // Get html from Destructoid by fetching through the Netlify fetchPastCORS function
        const DestScrape = fetch("http://localhost:8888/.netlify/functions/fetchPastCORS", {
            headers: { 
                'Accept': "text/html", // We want to accept text and html.
                myURL: 'https://www.destructoid.com' // We send the targeted url in a custom header that will be used in fetchPastCORS
            }}
        )
        .then( destResponse => 
            destResponse.text().then(data => ({
                data: data,
                status: destResponse.status
            }))
        )
        .then(destData => {
            // Create a Cheerio function binding using the response data from Destructoid.
            const dest$ = Cheerio.load(destData.data)
            let allDestResponses = {}
            // Use the Destructoid Cheerio function to find each article in the html and use an each method to iterate over the article nodes.
            dest$('article.smlpost').each((i, element) => {
                // Create an iterator that we can use to uniquely number our scraped data.
                i = i + 1
                // Create an empty object in which we can store the Destructoid scraped data specifically.
                const destResult = {}
                // Create an object for each article, then use find and text methods to fill out each of the following properties from the scraped data: title, link, source, sourceRef, logo, and summary.
                destResult[`destArticle ${i}`] = {}
                destResult[`destArticle ${i}`].title = dest$(element)
                    .find('h2.sparticle_title')
                    .find('a')
                    .text()
                const newLink = dest$(element)
                    .find('h2.sparticle_title')
                    .find('a')
                    .attr('href')
                destResult[`destArticle ${i}`].link = `https://www.destructoid.com/${newLink}`
                destResult[`destArticle ${i}`].source = 'Destructoid'
                destResult[`destArticle ${i}`].sourceRef = 'https://www.destructoid.com/'
                destResult[`destArticle ${i}`].logo = 'Destlogo.png'
                destResult[`destArticle ${i}`].summary = dest$(element)
                    .find('p')
                    .text()
                // If the article title isn't an empty string, store the article in the results.
                if (destResult[`destArticle ${i}`].title !== '') {
                    allDestResponses = Object.assign(allDestResponses, destResult)
                }
            })
            return allDestResponses
        })
        .catch(err => {
            console.log("We've got a problem with the destructoid call, captain!")
            console.error(err)
            //If there was an error with the called data, return an empty object so that the whole scrape doesn't fail.
            return {}
        })

        // Use an async function to call and wait for all of our fetch calls, and reduce the results to one object upon their completion.
        const allScrapes = async () => {
            const FinalIGNResults = await IGNScrape
            const FinalGIResults = await GIScrape
            const FinalDestructoidResults = await DestScrape

            return [FinalIGNResults, FinalGIResults, FinalDestructoidResults, FinalDestructoidResults].reduce( (acc, current) => {
                if(current !== undefined)  Object.assign(acc, current)
                return acc
            }, {} )
            }

        // Call our async and reduce function, then use the response........
        
        const getResults = async () => {
            return new Promise((resolve, reject) => {
                allScrapes().then( result => {
                    // TODO: Use result object to create articles in the database, etc. from here.
                    resolve(result)
                })
                .catch( err => {
                    console.log("We've got a problem with the scrape function, captain!")
                    reject(err)
                })
            })
        }
        const finalResults = await getResults()
        resolve(finalResults)
    })
}
export default scrape