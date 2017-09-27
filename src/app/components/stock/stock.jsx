import React from 'react'
import styles from './stock.scss'
const axios = require('axios')
const store = require('store')

class Stock extends React.Component {
	constructor (props) {
		super(props)
		this.fetchStock = this.fetchStock.bind(this)
		this.saveStock = this.saveStock.bind(this)
		this.fetchSavedStock = this.fetchSavedStock.bind(this)
		this.updateInput = this.updateInput.bind(this)
		this.state = {
			inputValue: ''
		}
	}

	updateInput (e) {
		e.persist()
		const value = e.target.value.toUpperCase()
		this.setState((prevState, props) => {
			return {
				inputValue: value
			}
		})
	}

	fetchStock () {
		const payload = {
			params: {
				ticker: this.state.inputValue
			}
		}
		axios.get('http://localhost:9000/api/stockInfo', payload).then(response => {
			console.log(response.data)
		}).catch(response => {
			this.setState((prevState, props) => {
				return {
					value: '',
					display: 'No account associated with that PIN.'
				}
			})
		})
	}

	saveStock (page) {
		this.setState((prevState, props) => {
			return {
				page: 'rotate' + page
			}
		})
	}

	fetchSavedStock () {
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
			<div id={ styles.about } className="columns is-marginless is-multiline">
				<div className="column is-12">
					<div className="field">
						<div className="control">
							<input type="text" className="input" value={this.state.inputValue} onChange={this.updateInput}/>
						</div>
					</div>

					<div className="field is-grouped is-pulled-right">
					  <div className="control">
							<button className="button" onClick={this.fetchStock}>Get Stock Info</button>
						</div>

						<div className="control">
							<button className="button" onClick={this.saveStock}>Save</button>
						</div>

						<div className="control">
							<button className="button" onClick={this.fetchSavedStock}>Alert</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}


export default Stock
