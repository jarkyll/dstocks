import React from 'react'
import styles from './card.scss'
const axios = require('axios')
const store = require('store')
import Chart from 'chart.js';
import classNames from 'classnames'
const shortid = require('shortid')

class Card extends React.Component {
	constructor (props) {
		super(props)
		this.saveStock = this.saveStock.bind(this)
		this.deleteStock = this.deleteStock.bind(this)
		this.state = {
			inputValue: '',
			fetchingInfo: false,
			info: this.props.data,
			chartId: shortid.generate()
		}
	}


	saveStock () {
		let savedStocks = store.get('result')
		if (savedStocks) {
			savedStocks.push(this.state.info)
		} else {
			savedStocks = [this.state.info]
		}
		store.set('result', savedStocks)
		this.props.updateSave(savedStocks)
	}

	deleteStock () {
		let savedStocks = store.get('result')
		console.log(savedStocks, this.props)
		savedStocks.splice(this.props.index, 1)
		store.set('result', savedStocks)
		this.props.updateSave(savedStocks)
	}


	componentDidMount () {
		if (this.state.info != null) {
			var ctx = document.getElementById(this.state.chartId);

			var chart = new Chart(ctx, {
		    // The type of chart we want to create
		    type: 'line',

		    // The data for our dataset
		    data: {
		        labels: this.state.info.chart.timestamp,
		        datasets: [{
		            label: this.state.info.result.quote.Symbol,
		            borderColor: 'rgb(48, 149, 180)',
		            data: this.state.info.chart.indicators.quote[0].open,
		        }]
		    }
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState((prevState, props) => {
			return {
				info: nextProps.data
			}
		})
	}

	render () {
		let button = null
		if (this.props.save) {
			button = <button className="button" onClick={this.saveStock}>Save</button>
		} else {
			button = <button className="button" onClick={this.deleteStock}>Delete</button>
		}

		return (
			<div id={ styles.info } className="field is-clearfix animated fadeIn column is-12">
				<div className="card">
				  <div id={ styles.test } className="card-content">
				    <p className="title is-size-2">
				       { this.state.info.result.quote.Name } ({ this.state.info.result.quote.Symbol })
				    </p>
						<div id={ styles.infoContent } className="content is-clearfix columns is-multiline">
							<div className="column is-4">
								<canvas id={this.state.chartId}>
								</canvas>
							</div>

							<div className="column is-8">
								<div className="columns is-multiline">
									<div className="column is-6">
										<span className="subtitle">Open:</span> { this.state.info.result.quote.Open }
									</div>

									<div className="column is-6">
										<span className="subtitle">Current:</span> { this.state.info.result.quote.realtime_price}
									</div>

									<div className="column is-6">
										<span className="subtitle">Change:</span> { this.state.info.result.quote.realtime_change}
									</div>

									<div className="column is-6">
										<span className="subtitle">ChangePercent:</span> { this.state.info.result.quote.realtime_chg_percent}
									</div>
								</div>
							</div>

							<div className="column is-12 field">
								<div className="control">
								{button}
								</div>
							</div>
						</div>
				  </div>
				</div>
			</div>
		)
	}
}


export default Card
