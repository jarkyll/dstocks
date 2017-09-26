import React from 'react'
import {render}  from 'react-dom'
import { HashRouter } from 'react-router-dom'
import AV from './components/av/av.jsx'
require('./main.scss')


class Root extends React.Component {
	render () {
	  return (
			<AV/>
	  )
	}
}

render(<Root/>, document.getElementById('app'))
