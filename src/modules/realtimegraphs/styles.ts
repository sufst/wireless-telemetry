/*
    Southampton University Formula Student Team
    Copyright (C) 2021 Nathan Rowley-Smith

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
import {
	makeStyles
} from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	sensorGraphContainerRoot: {
		paddingBottom: '25px',
		backgroundColor: '#292929'
	},
	sensorPaperHeaderButton: {
		color: 'white',
		width: '10%'
	},
	sensorPaperHeaderTitle: {
		textAlign: 'left',
		color: 'white',
		width: '90%',
		fontWeight: 'bold',
		fontSize: 23,
		margin: '0% 0% 0% 5%'
	},
	sensorGraph: {
		fontSize: 28,
		color: 'white',
		fill: 'white'
	},
	sensorLiveValue: {
		textAlign: 'left',
		color: 'white',
		width: '90%',
		margin: '0% 0% 0% 10%'
	},
	sensorPaper: {
		textAlign: 'center',
		background: '#292929',
		width: '100%',
		margin: '1% 0% 1% 0%'
	},
	groupPaperHeaderButton: {
		color: '#002472',
		width: '10%'
	},
	groupPaperHeaderTitle: {
		textAlign: 'center',
		color: 'white',
		width: '90%',
		fontSize: 33
	},
	groupPaperHeader: {
		background: '#292929',
		textAlign: 'center',
		margin: '1% 0% 1% 0%'
	},
	groupPaper: {
		width: '99.9%',
		background: '#292929'
	}
}));
