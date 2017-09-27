import React from 'react'
import {render}  from 'react-dom'
import { HashRouter } from 'react-router-dom'
import Stock from './components/stock/stock.jsx'
require('./main.scss')


class Root extends React.Component {
	render () {
	  return (
			<Stock/>
	  )
	}
}

render(<Root/>, document.getElementById('app'))
