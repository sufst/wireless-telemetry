/*
    Southampton University Formula Student Team
    Copyright (C) 2021 SUFST

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
import { makeStyles } from "@material-ui/core";
import { shadows } from '@material-ui/system';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  viewPaper: {
      margin : '50px 0px 0px 75px',
      padding : '15px',
      boxShadow : '0px 0px 0px 0px'
  }
}));