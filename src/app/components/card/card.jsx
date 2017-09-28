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
		this.convertTimeStamp = this.convertTimeStamp.bind(this)
		let change = parseFloat(this.props.data.result.quote.realtime_change).toFixed(2)
		let changePercent = parseFloat(this.props.data.result.quote.realtime_chg_percent).toFixed(2)
		this.state = {
			inputValue: '',
			fetchingInfo: false,
			info: this.props.data,
			chartId: shortid.generate(),
			change: change,
			changePercent: changePercent
		}
	}


	convertTimeStamp (timestamp) {
		const date = new Date(timestamp * 1000);
		const hours = date.getHours()
		const minutes = "0" + date.getMinutes()
		const seconds = "0" + date.getSeconds()

		return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
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
		        labels: this.state.info.chart.timestamp.map(x => this.convertTimeStamp(x)),
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

		let changeText = ''
		let textClass = null

		if (this.state.change > 0 ) {
				changeText = ' +' + this.state.change + ' (+' + this.state.changePercent + '%)'
				textClass = classNames({
					'has-text-success': true
				})
		} else {
				changeText = ' ' + this.state.change + ' (' + this.state.changePercent + '%)'
				textClass = classNames({
					'has-text-danger': true
				})
		}


		let button = null
		let buttonClass = null
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
									<div className="column is-3">
										<span className="subtitle">Open:</span> { parseFloat(this.state.info.result.quote.Open).toFixed(2) }
									</div>

									<div className="column is-3">
										<span className="subtitle">Current:</span> { parseFloat(this.state.info.result.quote.realtime_price).toFixed(2) }
										<span className={textClass}>{changeText}</span>
									</div>

									<div className="column is-3">
										<span className="subtitle">Day Low:</span> { parseFloat(this.state.info.result.quote.DaysLow).toFixed(2) }
									</div>

									<div className="column is-3">
										<span className="subtitle">Day High:</span> { parseFloat(this.state.info.result.quote.DaysHigh).toFixed(2) }
									</div>

									<div className="column is-3">
										<span className="subtitle">Year Low:</span> { parseFloat(this.state.info.result.quote.YearLow).toFixed(2) }
									</div>

									<div className="column is-3">
										<span className="subtitle">Year High:</span> { parseFloat(this.state.info.result.quote.YearHigh).toFixed(2) }
									</div>

									<div className="column is-3">
										<span className="subtitle">EPS:</span> { parseFloat(this.state.info.result.quote.eps_curr_year).toFixed(2) }
									</div>

									<div className="column is-3">
										<span className="subtitle">Volume:</span> { parseFloat(this.state.info.result.quote.Volume).toFixed(2) }
									</div>

									<div className="column is-3">
										<span className="subtitle">PERatio:</span> { parseFloat(this.state.info.result.quote.PERatio).toFixed(2) }
									</div>

									<div className="column is-3">
										<span className="subtitle">Market Cap:</span> { parseFloat(this.state.info.result.quote.MarketCapitalization).toFixed(2) }
									</div>

									<div className="column is-6">
										<span className="subtitle">TimeStamp:</span> {this.state.info.result.quote.realtime_ts}
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
