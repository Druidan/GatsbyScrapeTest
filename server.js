//TODO: Express may have been a wrong move here, and I think I don't need it. If it turns out I don't, be sure to uninstall the gatsby express plugin and serverless-http package. 

const gatsyExpress = require('gatsby-plugin-express');
const app = express()
const serverless = require('serverless-http')


// serve static files before gatsbyExpress
app.use(express.static('public/'))

app.use(gatsyExpress('config/gatsby-express.json', {
  publicDir: 'public/',
  template: 'public/404/index.html',
  redirectSlashes: false,
}))

const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        'hello': 'Hi!'
    })
})

app.use('/.netlify/functions/api', router)

module.exports.handler = serverless(app)

//npm run develop