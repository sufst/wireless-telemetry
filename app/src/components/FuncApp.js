// Module Imports
import React, { useState, useEffect } from 'react'
import { CSVLink } from 'react-csv'

// Config Imports 
import { PORT, HOST } from '../config/config'
import { parseServerData } from '../config/server'

// Component Imports
import Header from './Header'
import LineGraph from './graphing/LineGraph'

const socket = new WebSocket(`ws://${HOST}:${PORT}/`)

function FuncApp() {    

    

	const [data, setData] = useState({
        core: {
            speed_kph: [],
            rpm: [],
            water_temp_c: [],
            tps_perc: [],
            battery_mv: [],
            external_5v_mv: [],
            fuel_flow: [],
            lambda: [],
        },
        aero: {
            evo_scan_1: [],
            evo_scan_2: [],
            evo_scan_3: [],
            evo_scan_4: [],
            evo_scan_5: [],
            evo_scan_6: [],
            evo_scan_7: [],
        },
        diagnostic: {
            status_ecu_connected: [],
            status_engine: [],
            status_loggin: [],
            inj_time: [],
        },
        power: {
            inj_duty_cycle: [],
            lambda_adjust: [],
            lambda_target: [],
            advance: [],
        }, 
        suspension: {
            ride_height_fl_cm: [],
            ride_height_fr_cm: [],
            ride_height_flw_cm: [],
            ride_height_rear_cm: [],
        },
        misc: {
            lap_time_s: [],
            accel_fl_x_mg: [],
            accel_fl_y_mg: [],
            accel_fl_z_mg: [],
        }
    });

    const {core, aero, diagnostic, power, suspension, misc} = data;

    const [connection_status, setConnectionStatus] = useState('Disconnected');

    // useEffect(() => {
    //     connectToServer()
    // })

    useEffect(() => {
        socket.onopen = () => {
			console.log(`WebSocket connected on ${HOST}:${PORT}`);
			
			setConnectionStatus('CONNECTED')

			setInterval(fetchSensorData, 1000);
		}
    })

    useEffect(() => {
        socket.onmessage = (message) => {
            const epoch = Math.round(Date.now() / 1000) - 120;CSVLink
            console.log('Message Received :' + epoch);
			const values = parseServerData(message)
			setData(values);
		}
    })

    useEffect(() => {
        socket.onclose = (event) => {
			console.log('WebSocket Disconnected: ', event);
			setConnectionStatus('DISCONNECTED')
		}
    })

    useEffect(() => {
        socket.onerror = (error) => {
			console.error('WebSocket Error: ', error);
		}
    })

    const connectToServer = () => {
		socket.onopen = () => {
			console.log(`WebSocket connected on ${HOST}:${PORT}`);
			
			setConnectionStatus('CONNECTED')

			setInterval(fetchSensorData, 1000);
		}

		socket.onmessage = (message) => {
            const epoch = Math.round(Date.now() / 1000) - 120;CSVLink
            console.log('Message Received :' + epoch);
			const values = parseServerData(message)
			setData(values);
		}

		socket.onclose = (event) => {
			console.log('WebSocket Disconnected: ', event);
			setConnectionStatus('DISCONNECTED')
		}

		socket.onerror = (error) => {
			console.error('WebSocket Error: ', error);
		}
	}

    const fetchSensorData = () => { 
		const epoch = Math.round(Date.now() / 1000) - 120; 
		socket.send(`GET /sensors?amount=20&timesince=${epoch}`)
	}

    return(
        <div>
            <Header conStatus={connection_status}/> 
            <LineGraph data={core.rpm} animated={false} />
            <LineGraph data={core.water_temp_c} animated={false} />
            <div className='container'>
                <h2>Core</h2>
                <p className='state'>{'Speed: ' + core.speed_kph[0]?.value}</p>
                <p className='state'>{'RPM: ' + core.rpm[0]?.value}</p>
                <p className='state'>{'Lambda: ' + core.lambda[0]?.value}</p>
                <p className='state'>{'Water Temp: ' + core.water_temp_c[0]?.value}</p>
            </div>
        </div> 
    )
    
}

export default FuncApp;