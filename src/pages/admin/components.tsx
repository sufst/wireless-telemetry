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
import React from "react";
import { UserState } from "types/models/user";
import {
	getColorForPrivelege,
	TableHeaderCell,
	Avatar,
	Username,
} from "./styles";
import { v4 } from "uuid";

import { useCallback } from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Grid,
	Typography,
	Button,
	Stack,
} from "@mui/material";

import { usersDelete } from "modules/api/users";
import DeleteIcon from "@mui/icons-material/Delete";
import { useHistory } from "react-router-dom";
import { Token } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

export const AdminPanelTable: React.FC<{ users: UserState[] }> = ({
	users,
}) => {
	return (
		<TableContainer
			component={Paper}
			sx={{
				borderRadius: 5,
				maxWidth: "90%",
				background: "#292929",
			}}
		>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<AdminPanelTableHead />
				<TableBody>
					{users.map((user) => (
						<AdminPanelTableRow user={user} key={v4()} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

// TODO: Solve the warning about user.creation being optional, even though its requied as part of the calculation, potentially breaking the application
const AdminPanelTableRow: React.FC<{ user: UserState }> = ({ user }) => {
	const history = useHistory();

	// TODO: Remove force unwrapping here. Make it safer.
	const createdAt = new Date(user.creation! * 1000).toLocaleString("en-GB", {
		day: "numeric",
		month: "numeric",
		year: "numeric",
	});

	const selectUser = (state: RootState) => state.user;
	const currentUser = useSelector(selectUser);

	const token = currentUser.accessToken;

	const handleUserDelete = useCallback(
		(user: UserState) => {
			if (token && user && user.username) {
				usersDelete(user.username, token);
			}
		},
		[token]
	);

	return (
		<TableRow>
			<TableCell>
				<Grid container>
					<Grid item lg={2}>
						<Avatar alt={user.username} src="." />
					</Grid>
					<Grid item lg={10}>
						<Username>{user.username}</Username>
					</Grid>
				</Grid>
			</TableCell>

			<TableCell>
				<Typography
					sx={{ color: "lightGray" }}
					color="primary"
					variant="subtitle2"
				>
					{user.department}
				</Typography>
			</TableCell>

			<TableCell>
				<div
					style={{
						color: getColorForPrivelege(user.privilege!),
						fontWeight: "bold",
					}}
				>
					{user.privilege}
				</div>
			</TableCell>

			<TableCell>
				<div style={{ color: "lightGray" }}>{createdAt}</div>
			</TableCell>
			<TableCell>
				<Stack spacing={3} direction="row">
					<Button
						onClick={() =>
							history.push({
								pathname: "/modify",
								search: `?username=${user.username}`,
								state: {
									// location state
									username: user.username,
								},
							})
						}
						variant="contained"
					>
						Edit
					</Button>
					<Button
						onClick={() => handleUserDelete(user)}
						color="error"
						variant="contained"
					>
						<DeleteIcon />
					</Button>
				</Stack>
			</TableCell>
		</TableRow>
	);
};

const AdminPanelTableHead: React.FC = () => {
	return (
		<TableHead>
			<TableRow>
				<TableHeaderCell>Username</TableHeaderCell>
				<TableHeaderCell>Department</TableHeaderCell>
				<TableHeaderCell>Privilege</TableHeaderCell>
				<TableHeaderCell>Created At</TableHeaderCell>
				<TableHeaderCell sx={{ width: "15%" }}>
					Modification
				</TableHeaderCell>
			</TableRow>
		</TableHead>
	);
};
