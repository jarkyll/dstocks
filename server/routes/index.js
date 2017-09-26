const routes = require('express').Router()
const YahooFinanceAPI = require('yahoo-finance-data')

const api = new YahooFinanceAPI({
  key: 'dj0yJmk9SWdjWkhuWlNkRlc3JmQ9WVdrOVZrdENiME5vTkdzbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD05NQ--',
  secret: '97ffee8caa27f3e315b62916e42371e7689a7d32'
})





api
  .getRealtimeQuotes('YHOO,MSFT,AAPL').then(data => {
    console.log(data.query.results)
  }).catch(err => console.log(err))

routes.get('/stockInfo', (req, res) => {
  console.log(req, res)
  console.log('goteeem')
  api.getRealtimeQuotes('YHOO,MSFT,AAPL').then(data => {
    res.status(200).send({
      result: data.query.results
    })
  }).catch(err => console.log(err))
})


module.exports = routes
