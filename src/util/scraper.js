import Axios from "axios"
import Cheerio from "cheerio"

const scrape = e => {
    e.preventDefault()

        //TODO: Figure out how saved summaries from the database will be called and used in this function to weed out saved articles from the scrape.
        // Create empty data structures in which we can save the restructured data.
        let savedSummaries = []

        // Get html from IGN using Axios.
        const IGNScrape = Axios({
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
            url: 'https://www.ign.com/articles?tags=news'
        })
        .then(ignResponse => {
        // Create a Cheerio function binding using the response data from IGN.
        const ign$ = Cheerio.load(ignResponse.data)
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
                // If the article is not already amongst the articles that have been previously saved, store the article in the results.
                if (!savedSummaries.includes(ignResult[`ignArticle ${i}`].summary)) {
                    allIGNResponses = Object.assign(allIGNResponses, ignResult)
                }
            })
            return allIGNResponses            
        })
        .catch(err => {
            console.log("We've got a problem with the IGN call, captain!")
            console.log(err)
        })

        // Get html from Game Informer
        const GIScrape = Axios({
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
            url: 'https://www.gameinformer.com/news'
        })
        .then( giResponse => {
            // Create a Cheerio function binding using the response data from Game Informer.
            const gi$ = Cheerio.load(giResponse.data)
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
                // If the article is not already amongst the articles that have been previously saved, store the article in the results.
                if (!savedSummaries.includes(giResult[`giArticle ${i}`].summary)) {
                    allGIResponses = Object.assign(allGIResponses, giResult)
                }
            })
            console.log(allGIResponses)
            return allGIResponses
        })
        .catch(err => {
            console.log("We've got a problem with the Game Informer call, captain!")
            console.log(err)
        })

        // Get html from Destructoid
        const DestScrape = Axios({
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
            url: 'https://www.destructoid.com'
        })
        .then( destResponse => {
            // Create a Cheerio function binding using the response data from Destructoid.
            const dest$ = Cheerio.load(destResponse.data)
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
                // If the article is not already amongst the articles that have been previously saved, store the article in the results.
                if (!savedSummaries.includes(destResult[`destArticle ${i}`].summary)) {
                    if (destResult[`destArticle ${i}`].title !== '') {
                        allDestResponses = Object.assign(allDestResponses, destResult)
                    }
                }
            })
            return allDestResponses
        })
        .catch(err => {
            console.log("We've got a problem with the destructoid call, captain!")
            console.log(err)
        })

        // Use an async function to call and wait for all of our Axios get calls, and reduce the results to one object upon their completion.
        const allScrapes = async () => {
            const FinalIGNResults = await IGNScrape
            const FinalGIResults = await GIScrape
            const FinalDestructoidResults = await DestScrape

            return [FinalIGNResults, FinalGIResults, FinalDestructoidResults].reduce( (acc, current) => {
                if(current !== undefined)  Object.assign(acc, current)
                return acc
            }, {} )
        }

        // Call our async and reduce function, then use the response........
        allScrapes().then( result => {
            // TODO: Use result object to create articles in the database, etc. from here.
            return result
        })
        .catch( err => {
            console.log("We've got a problem with the scrape function, captain!")
            console.log(err)
        })

}

export default scrape



