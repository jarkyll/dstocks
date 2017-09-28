import React from 'react'
import styles from './stock.scss'
const axios = require('axios')
const store = require('store')
import Card from '../card/card.jsx'
import Chart from 'chart.js';
import classNames from 'classnames'
import _ from 'lodash'


class Stock extends React.Component {
	constructor (props) {
		super(props)
		this.fetchStock = this.fetchStock.bind(this)
		this.saveStock = this.saveStock.bind(this)
		this.fetchSavedStock = this.fetchSavedStock.bind(this)
		this.updateInput = this.updateInput.bind(this)
		this.updateSavedInfo = this.updateSavedInfo.bind(this)
		let data = store.get('result')
		console.log(store.get('result'))
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


	shouldComponentUpdate(nextProps, nextState) {
		console.log(nextProps, nextState)
		console.log(store.get('results'))

		return true
	}

	updateSavedInfo (newState) {
		this.setState((prevState, props) => {
			return {
				savedInfo: newState
			}
		})
	}

	render () {

		const button = classNames({
			'button': true,
			'is-loading': this.state.fetchingInfo
		})

		let savedInfo = []


		_.forEach(this.state.savedInfo, function (value, index) {
			savedInfo.push(<Card data={value} key={index} className="column is-12"/>)
		})

		return (
			<div id={ styles.stockContainer } className="columns is-marginless is-multiline">
				<div id={ styles.input }>
					<div className="columns is-marginless">
					<div className="is-clearfix column is-12">
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
						</div>
					</div>
				</div>
				<div className="column is-12">
					<div id={ styles.stocks } className="columns is-multiline">
						{ this.state.result &&
							<Card data={this.state.result} updateSave={this.updateSavedInfo}/>
						}

						{savedInfo}
					</div>


				</div>
			</div>
		)
	}
}


export default Stock
