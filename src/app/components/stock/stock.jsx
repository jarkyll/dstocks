import React from 'react'
import styles from './stock.scss'
const axios = require('axios')
const store = require('store')
import Card from '../card/card.jsx'
import Chart from 'chart.js';
import classNames from 'classnames'

class Stock extends React.Component {
	constructor (props) {
		super(props)
		this.fetchStock = this.fetchStock.bind(this)
		this.saveStock = this.saveStock.bind(this)
		this.fetchSavedStock = this.fetchSavedStock.bind(this)
		this.updateInput = this.updateInput.bind(this)
		let data = store.get('result')
		this.state = {
			inputValue: '',
			result: null,
			fetchingInfo: false,
			savedInfo: data
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

		this.setState((prevState, props) => {
			return {
				fetchingInfo: true
			}
		})

		axios.get('http://localhost:9000/api/stockInfo', payload).then(response => {
			console.log(response.data)
			this.setState((prevState, props) => {
				return {
					result: response.data,
					fetchingInfo: false
				}
			})


		}).catch(response => {
			this.setState((prevState, props) => {
				return {
					result: response.data,
					fetchingInfo: false
				}
			})
		})
	}

	saveStock () {
		store.set('result', this.state.result)
	}

	fetchSavedStock () {
		console.log(this.state.result)
		console.log(this.state.result.result.quote.Name)
		//console.log(store.get('result'))
	}

	render () {

		const button = classNames({
			'button': true,
			'is-loading': this.state.fetchingInfo
		})
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
							<button className={button} onClick={this.fetchStock}>Get Stock Info</button>
						</div>

						<div className="control">
							<button className={button} onClick={this.fetchSavedStock}>Alert</button>
						</div>
					</div>

					{ this.state.savedInfo &&
						<Card data={this.state.savedInfo}/>
					}

					{ this.state.result &&
						<Card data={this.state.result}/>
					}

				</div>
			</div>
		)
	}
}


export default Stock
