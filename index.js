const express = require('express')
const http = require('http')
const logger = require('morgan')
const bodyParser = require('body-parser')
const port = process.env.PORT || 9000
const path = require('path')
const file = path.resolve(__dirname, 'src/public/index.html')
const routes = require('./routes')


// App

const app = express()

app.use(express.static(path.join(__dirname, 'src/public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Set up the express app
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
})


// Routes
app.use('/api', routes)

app.get('/', (req, res) => {
  res.sendFile(file)
})

app.get('*', (req, res) => {
  res.redirect('/')
})

app.set('port', port)

const server = http.createServer(app)
console.log('Listening on port: ' + port)
server.listen(port)


module.export = app
