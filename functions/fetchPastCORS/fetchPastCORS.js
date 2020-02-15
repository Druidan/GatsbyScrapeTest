/* eslint-disable */
const fetch = require('node-fetch')

// Our exported asnyc function handler.
exports.handler = async function(event, context) {
  
  // Try fetching with the url provided in an expected custom header called "myurl".
  try {
    const response = await fetch(event.headers.myurl, {
      headers: {
          'Accept': "text/html",
          'Content-Type': 'text/html'
      }})
    if (!response.ok) {
      // If the response is not ok, i.e. (res.status >= 200 && res.status < 300), return the response status and status text in an object.
      return { statusCode: response.status, body: response.statusText }
    }
    //If the response is good, convert it to text then create a new data object containing the data in the body and a response status code, both of which are required later. 
    const newData = response.text().then(data => ({
      body: data,
      statusCode: response.status
    }))
    // Return the constructed data object.
    return newData

  // catch any errors, and provide detailed info in the logs.
  } catch (err) {
    console.log(`The fetch to ${event.headers.myurl} didn't work!`)
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    }
  }
}