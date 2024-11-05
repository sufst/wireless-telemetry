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

import { url } from "config";
import {
	UsersCreate,
	UsersGet,
	UsersGetResponse,
	UsersPatch,
	UsersDelete,
} from "types/api/api";

/**
 *
 * UsersCreate Request
 *
 */
const handleCreateUsers: UsersCreate = async (
	username,
	password,
	privilege,
	department,
	meta,
	accessToken
) => {
	const response = await fetch(`http://${url}/users/${username}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + accessToken,
		},
		body: JSON.stringify({
			password,
			privilege,
			department,
			meta,
		}),
	});

	if (!response.ok) {
		throw Object.assign(new Error(response.statusText));
	}

	return response;
};

export type GetAllUsersType = (accessToken: string) => Promise<any>;

export const usersCreate: UsersCreate = async (
	username,
	password,
	privilege,
	department,
	meta,
	accessToken
) => {
	try {
		const response = await handleCreateUsers(
			username,
			password,
			privilege,
			department,
			meta,
			accessToken
		);

		if (response.status === 200) {
			return true;
		}

		return false;
	} catch (statusText) {
		console.log("Error Creating User: ", statusText);
		return false;
	}
};

/**
 *
 * UsersGet Request
 *
 */
const handleUsersGet: UsersGet = async (username, accessToken) => {
	const response = await fetch(`http://${url}/users/${username}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + accessToken,
		},
	});

	if (!response.ok) {
		throw Object.assign(new Error(response.statusText));
	}

	const data = await response.json();
	return data;
};

export const usersGet: UsersGet = async (username, accessToken) => {
	try {
		const userResponse: UsersGetResponse = await handleUsersGet(
			username,
			accessToken
		);
		return userResponse;
	} catch (statusText) {
		console.log("Error in UsersGet: ", statusText);
		return null;
	}
};

/**
 *
 * UsersPatch Request
 */
const handleUsersPatch: UsersPatch = async (username, accessToken, fields) => {
	const response = await fetch(`http://${url}/users/${username}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + accessToken,
		},
		body: JSON.stringify(fields),
	});

	if (!response.ok) {
		throw Object.assign(new Error(response.statusText));
	}

	return response;
};

const handleUsersDelete: UsersDelete = async (username, accessToken) => {
	const response = await fetch(`http://${url}/users/${username}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + accessToken,
		},
	});

	if (!response.ok) {
		throw Object.assign(new Error(response.statusText));
	}

	return response;
};

export const usersDelete: UsersDelete = async (username, accessToken) => {
	try {
		const response = await handleUsersDelete(username, accessToken);

		if (response.status === 200) {
			return true;
		}

		return false;
	} catch (statusText) {
		console.log("Error in UsersPatch: ", statusText);
		return false;
	}
};

export const usersPatch: UsersPatch = async (username, accessToken, fields) => {
	try {
		const response = await handleUsersPatch(username, accessToken, fields);

		if (response.status === 200) {
			return true;
		}

		return false;
	} catch (statusText) {
		console.log("Error in UsersPatch: ", statusText);
		return false;
	}
};

const handleGetAllUsers: GetAllUsersType = async (accessToken: string) => {
	const response = await fetch(`http://${url}/users`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + accessToken,
		},
	});

	if (!response.ok) {
		throw Object.assign(new Error(response.statusText));
	}

	const data = await response.json();
	return data;
};

export const fetchAllUsers: GetAllUsersType = async (accessToken: string) => {
	try {
		const result = await handleGetAllUsers(accessToken);
		return result;
	} catch (statusText) {
		console.log("Error Fetching all users: ", statusText);
		return null;
	}
};
