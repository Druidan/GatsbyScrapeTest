/* eslint-disable */
const fetch = require('node-fetch')
exports.handler = async function(event, context) {

  try {
    const response = await fetch(event.headers.myurl, {
      headers: {
          'Accept': "text/html",
          'Content-Type': 'text/html'
      }})
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const newData = response.text().then(data => ({
      body: data,
      statusCode: response.status
  }))

    return newData

  } catch (err) {
    console.log("It didn't work!")
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
