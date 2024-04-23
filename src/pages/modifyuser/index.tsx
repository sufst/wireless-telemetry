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

import React, { useCallback, useEffect, useState } from "react";
import { createAlert } from "modules/alert/alert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { showAlert } from "redux/slices/alert";
import { RootState } from "redux/store";
import { ModifyUserContainer } from "./containers";
import { useLocation } from "react-router-dom";

import { SetUserAction, UserRegister } from "types/models/actions";
import { usersGet } from "modules/api/users";


function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}


export const Modify: React.FC = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const selectUser = (state: RootState) => state.user;
  const currentUser = useSelector(selectUser);

  const privilege = currentUser.privilege;

  const query = useQuery();


  const token = currentUser.accessToken

  const username = query.get("username");


  const [user, setUser] = useState<SetUserAction>(
    {
      username: '',
      accessToken: '',
      creation: 0,
      privilege: 'Anon',
      department: 'NON SPECIFIED',
      meta: {}
    }
  )


  const fetchUser = useCallback(async () => {

    console.log(username)

    if (token === undefined || username == null) {
      return;
    }



    const user = await usersGet(username, token);

    setUser(user);
  }, [token, username]);

  useEffect(() => {
    if (privilege !== "Admin") {
      const cannotRegisterUserAlert = createAlert(
        3000,
        "error",
        "alert",
        "You cannot change user data. Sorry :("
      );
      dispatch(showAlert(cannotRegisterUserAlert));

      history.push("/");
    }


    fetchUser()

  }, [dispatch,fetchUser, currentUser, privilege, history]);


  return (
    <>
      <ModifyUserContainer user={user} />
    </>
  );
};
