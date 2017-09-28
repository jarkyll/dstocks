import React from 'react'
import styles from './stock.scss'
const axios = require('axios')
const store = require('store')
import Card from '../card/card.jsx'
import Chart from 'chart.js';
import classNames from 'classnames'
import _ from 'lodash'
import AlertContainer from 'react-alert'



class Stock extends React.Component {
	constructor (props) {
		super(props)
		this.fetchStock = this.fetchStock.bind(this)
		this.saveStock = this.saveStock.bind(this)
		this.fetchSavedStock = this.fetchSavedStock.bind(this)
		this.updateInput = this.updateInput.bind(this)
		this.updateSavedInfo = this.updateSavedInfo.bind(this)
		this.showAlert = this.showAlert.bind(this)
		this.state = {
			inputValue: '',
			result: null,
			fetchingInfo: false,
			savedInfo: null,
			alertOptions: {
		    offset: 14,
		    position: 'bottom left',
		    theme: 'dark',
		    time: 5000,
		    transition: 'scale'
		  }
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
		if (!_.isEmpty(this.state.inputValue)) {
			if (/^[a-zA-Z]+$/.test(this.state.inputValue)) {
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
				this.showAlert('Fetching Stock Info', 'show')

				axios.get('http://localhost:9000/api/stockInfo', payload).then(response => {
					console.log(response)
					this.setState((prevState, props) => {
						return {
							result: response.data,
							fetchingInfo: false
						}
					})
				}).catch((response) => {
					this.showAlert('Unable to fetch Stock Info', 'error')
					this.setState((prevState, props) => {
						return {
							fetchingInfo: false
						}
					})
				})
			} else {
				this.showAlert('Input must be alphabetical characters', 'error')
			}
		} else {
			this.showAlert('Input can not be empty', 'error')
		}
	}

	saveStock () {
		store.set('result', this.state.result)
	}

	fetchSavedStock () {
		this.showAlert('Fetching Saved Stock Info', 'show')
		let data = store.get('result')
		this.setState((prevState, props) => {
			return {
				savedInfo: data
			}
		})
	}

	updateSavedInfo (newState) {
		this.showAlert('Updating Saved Stocks', 'info')
		this.setState((prevState, props) => {
			return {
				savedInfo: newState
			}
		})
	}

	showAlert (mssg, type) {
		this.msg[type](mssg, {
      time: 2000,
      type: 'success'
    })
	}

	render () {

		const button = classNames({
			'button': true,
			'is-loading': this.state.fetchingInfo
		})

		let savedInfo = [<div id={ styles.savedTitle } className="title is-size-1 is-size-5-mobile has-text-centered column is-12" key={0}>Saved Stocks</div>]

		_.forEach(this.state.savedInfo, (value, index) => {
			savedInfo.push(<Card data={value} key={index + 1} save={false} updateSave={this.updateSavedInfo} index={index} className="column is-12"/>)
		})

		return (
			<div id={ styles.stockContainer } className="columns is-marginless is-multiline">
				<div id={ styles.input }>
					<div className="columns is-marginless">
					<div className="is-clearfix column is-12">
						<div className="field">
							<label className="label title is-size-1 is-size-5-mobile">Stocks Demo</label>
							<div className="control">
								<input type="text" className="input" autoCorrect="off" spellCheck="false" value={this.state.inputValue} onChange={this.updateInput}/>
							</div>
						</div>

						<div className="field is-grouped is-pulled-right">
							<div className="control">
								<button className={button} onClick={this.fetchStock}>Get Stock Info</button>
							</div>

							<div className="control">
								<button className={button} onClick={this.fetchSavedStock}>Get Saved Stocks</button>
							</div>
						</div>
						</div>
					</div>
				</div>
				<div className="column is-12">
					<div id={ styles.stocks } className="columns is-multiline">
						{ this.state.result &&
							<Card data={this.state.result} save={true} updateSave={this.updateSavedInfo} alert={this.showAlert = this.showAlert.bind(this)}/>
						}

						{savedInfo.length > 1 && savedInfo}
					</div>
				</div>

				<AlertContainer ref={a => this.msg = a} {...this.state.alertOptions} />
			</div>
		)
	}
}


export default Stock
