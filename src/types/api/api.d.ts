/*
    Southampton University Formula Student Team
    Copyright (C) 2022 SUFST

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

//
// LOGIN
//
export type LoginUser = (username: string, password: string) => Promise;

//
// SocketIO
//
export type SioConnect = (
	accessToken: string,
	onMeta: SioOnMetaHander,
	onData: SioOnDataHandler
) => void;

export type SioOnMetaHander = (meta: SensorsMeta) => void;

export type SioOnDataHandler = (data: {
	[sensor: string]: Array<SensorData>;
}) => void;

//
// USER(S)
//
export type UsersCreate = (
	username: string,
	password: string,
	privilege: UserPrivilege,
	department: UserDepartment,
	meta: object,
	accessToken: string
) => Promise;

export type UsersGet = (username: string, accessToken: string) => Promise;

export interface UsersGetResponse {
	username: string;
	creation: number;
	privilege: UserPrivilege;
	department: UserDepartment;
	meta: string;
}

export interface UsersPatchRequest {
	[username: ?string]: string;
	[password: ?string]: string;
	[privilege: ?string]: UserPrivilege;
	[department: ?string]: UserDepartment;
	[meta: ?string]: UserMeta;
}

export type UsersPatch = (
	username: string,
	accessToken: string,
	fields: UsersPatchRequest
) => Promise;

export type UsersDelete = (username: string, accessToken: string) => Promise;

export type UserGet = (accessToken: string) => Promise;

export interface UserGetResponse {
	username: string;
	creation: number;
	privilege: UserPrivilege;
	department: UserDepartment;
	meta: string;
}

export interface UserPatchRequest {
	[username: ?string]: string;
	[password: ?string]: string;
	[privilege: ?string]: UserPrivilege;
	[department: ?string]: UserDepartment;
	[meta: ?string]: UserMeta;
}

export type UserPatch = (
	accessToken: string,
	fields: UserPatchRequest
) => Promise;

//
// SESSIONS
//

export type HandleSessionsGet = SessionsGetResponse | null;

export type HandleSessionsGetPromise = () => Promise<HandleSessionsGet>;

export type SessionsGet = () => Promise<[SessionsGetResponse | null, boolean]>;

export type SessionsGetResponse = {
	[name: string]: {
		creation: number;
		status: string;
		sensors: [string];
	};
};

export type SessionDetailGet = (string, string) => Promise;

export type SessionDetailGetResponse = {
	meta: {
		condition: string;
		creation: number;
		driver: string;
		sensors: [string];
	};
	notes: [];
	data: {
		string: [{ epoch: number; value: number }];
	};
};

export type SessionCreate = (
	accessToken: string,
	name: string,
	fields: SessionCreateFields
) => Promise;

type SessionCreateFields = {
	sessionMetadata: any;
	sessionSensors: any;
};

export type SessionStop = (name: string, accessToken: string) => Promise;
