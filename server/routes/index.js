const routes = require('express').Router()
const YahooFinanceAPI = require('yahoo-finance-data')

const api = new YahooFinanceAPI({
  key: 'dj0yJmk9SWdjWkhuWlNkRlc3JmQ9WVdrOVZrdENiME5vTkdzbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD05NQ--',
  secret: '97ffee8caa27f3e315b62916e42371e7689a7d32'
})





routes.get('/stockInfo', (req, res) => {
  const promise = new Promise((resolve, reject) => {
    api.getIntradayChartData(req.query.ticker, '5m').then(data => {
      resolve(data.chart.result)
    }).catch(err => {
      reject(err)
    })
  })
  promise.then(response => {
    api.getRealtimeQuotes(req.query.ticker).then(data => {
      res.status(200).send({
        chart: response[0],
        result: data.query.results
      })
    }).catch(err => console.log(err))
  })
})


module.exports = routes
