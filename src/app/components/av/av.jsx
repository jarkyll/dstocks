import React from 'react'
import styles from './av.scss'

class AV extends React.Component {
	constructor (props) {
		super(props)
		this.updateTest = this.updateTest.bind(this)
		this.state = {
			backgroundUrl: 1,
			count: 0,
			test: false,
			page: 'rotateHome'
		}
	}

	updatePage (page) {
		this.setState((prevState, props) => {
			return {
				page: 'rotate' + page
			}
		})
	}

	updateTest () {
		console.log('clicked it')
		console.log(this.state)
		this.setState((prevState, props) => {
			return {
				count: prevState.count + 1
			}
		})
	}

	render () {
		return (
			<div id={ styles.about } className="columns is-marginless">
				<div id={ styles.test } className="column is-12">AV 1</div>
			</div>
		)
	}
}


export default AV
