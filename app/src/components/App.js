import { Line } from '@reactchartjs/react-chart.js'

import React, { Component } from 'react'

// Config Imports 
import { AIPDU, PORT, HOST } from '../config/config'
import { parseData } from '../config/parser'
import { CSVLink, CSVDownload } from "react-csv";

// Component Imports
import Header from './Header'
import { count } from 'console';

const net = require('net'); 

const options = {
	// scales: {
	//   yAxes: [
	// 	{
	// 	  ticks: {
	// 		beginAtZero: true,
	// 	  },
	// 	},
	//   ],
	// },
  }

var exportCoreData = [];

class App extends Component {

	constructor(props) {
		super(props); 

		// Helper function to get last element of array...
		if (!Array.prototype.last){
			Array.prototype.last = function(){
				return this[this.length - 1];
			};
		};

		this.state = {
			connection_status: 'DISCONNECTED',
			count: 0,
			data: {
				core: {
					speed: [],
					rpm: [],
					water_temp: [],
					tps: [],
					battery_mv: [],
					external_5v_mv: [],
					fuel_flow: [],
					lambda: [],
				},
			},
			graphs: {
				rpmData: {
					labels: [0],
					datasets: [
					  {
						label: 'RPM',
						data: [],
						fill: false,
						backgroundColor: 'rgb(255, 99, 132)',
						borderColor: 'rgba(255, 99, 132, 1)',
					  },
					],
				 }
			}
		}
	}

	componentDidMount() {
		this.connectToServer(); 
	}

	connectToServer() {
		const client = new net.Socket();
	
		client.connect({ port: PORT, host: HOST }, () => {
			client.write(AIPDU, ()  => {
				this.setState({ connection_status: 'CONNECTED'} )
			})
		})

		client.on('data',  (data) => {
			const oldData = this.state.data
			const newData = JSON.parse(data);
			var newDataArray = Object.values(newData);
			newDataArray.splice(0,3);
			const parsedData = parseData(oldData, newData);

			switch (parsedData.type) {
				case 2:
					//console.log("Received parsed Core");
					this.onReceivedCore(parsedData);
					console.log(newDataArray);	
					exportCoreData.push(newDataArray);
					break;
				default:
					break;
			}
		})

		client.on('error', (error) => {
			console.log('Error Connnecting to Server...');
		})

		client.on('end', () => {
			console.log('Server connection ended...');
			this.setState( {connection_status: 'DISCONNECTED'} )
		})
	}

	onReceivedCore(data) {
		this.setState({
			count: this.state.count + 1, 
			data: {
				core: data
			}, 
			graphs: {
				rpmData: {
					labels: [...this.state.graphs.rpmData.labels, this.state.count],
					datasets: [
						{ 
							label: 'RPM',
							fill: false,
							backgroundColor: 'rgba(0, 0, 0, 0.5)',
							borderColor: 'rgba(255, 99, 132, 1)',
							data: data.rpm
						}
					]
				}
			}
		})
	}

	render() {
		const conStatus = this.state.connection_status;
		const core = this.state.data.core;
		var keys = Object.keys(core);
		keys.splice(0,1);

		return (
			<div>
				<Header conStatus={conStatus}/> 
				<Line className='chart' data={this.state.graphs.rpmData} options={options} />
				<div className='container'>
					<CSVLink data={exportCoreData} headers={keys}>Export to CSV</CSVLink>
					<h1 className='state'>{'Core Data Received: ' + this.state.count}</h1>
					<h1 className='state'>{'RPM: ' + core.rpm.last()}</h1>
					<h1 className='state'>{'Speed: ' + core.speed.last() + ' KM/H'}</h1>
					<h1 className='state'>{'Water Temp: ' + core.water_temp.last() + ' °C'}</h1>
					<h1 className='state'>{'Throttle Position: ' + core.tps.last() + '%'}</h1>
					<h1 className='state'>{'Battery Voltage: ' + core.battery_mv.last() + ' mV'}</h1>
					<h1 className='state'>{'External 5V: ' + core.external_5v_mv.last() + ' mV'}</h1>
					<h1 className='state'>{'Fuel Flow: ' + core.fuel_flow.last() }</h1>
					<h1 className='state'>{'Lambda: ' + core.lambda.last() }</h1>
				</div>
			</div> 
		)
	}
}

export default App
