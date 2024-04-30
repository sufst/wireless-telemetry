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

import React, { useCallback, useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import { createAlert } from "modules/alert/alert";
import {
  LoginButton,
  PasswordField,
  UsernameField,
} from "pages/signin/components";
import { useDispatch } from "react-redux";
import { showAlert } from "redux/slices/alert";
import { UserRegister } from "types/models/actions";
import { UserDepartment, UserPrivilege } from "types/models/user";
import {
  DepartmentSelect,
  PrivilegeSelect,
  RegisterFooter,
  RegisterHeader,
} from "./components";
import { RegistrationForm, RegisterPaper } from "./styles";

export const RegisterContainer: React.FC<{ registerUser: UserRegister }> = (
  props
) => {

  const { registerUser } = props;

  const dispatch = useDispatch();

  const [error, setError] = useState<boolean>(false);

  const [department, setDepartment] = useState<UserDepartment>("Electronics");

  const [privilege, setPrivilege] = useState<UserPrivilege>("Basic");

  const handleDepartmentChange = useCallback((event: any) => {
    setDepartment(event.target.value);
  }, []);

  const handlePrivilegeChange = useCallback((event: any) => {
    setPrivilege(event.target.value);
  }, []);

  const onRegisterSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const username: string = event.target.username.value;
      const password: string = event.target.password.value;
      const confirmPass: string = event.target.passconfirm.value;

      if (username === "" || password === "" || confirmPass === "") {
        const emptyFieldAlert = createAlert(
          3000,
          "error",
          "alert",
          "Please fill all fields."
        );
        dispatch(showAlert(emptyFieldAlert));
        setError(true);
        return;
      }

      if (password === confirmPass) {
        setError(false);
        registerUser(username, password, privilege, department);
        return;
      }

      const mismatchPassAlert = createAlert(
        3000,
        "error",
        "alert",
        "The passwords don't match."
      );
      dispatch(showAlert(mismatchPassAlert));
    },
    [department, privilege, dispatch, registerUser]
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <RegisterPaper>
        <RegisterHeader />
        <RegistrationForm noValidate onSubmit={onRegisterSubmit}>
          <UsernameField />
          <PasswordField error={error} label="Password" id={"password"} />
          <PasswordField error={error} label="Confirm Password" id={"passconfirm"} />
          <DepartmentSelect
            department={department}
            handleDepartmentChange={handleDepartmentChange}
          />
          <PrivilegeSelect
            privilege={privilege}
            handlePrivilegeChange={handlePrivilegeChange}
          />
          <div style={{marginTop: "2rem"}}>
            <LoginButton text="Register" />
          </div>
        </RegistrationForm>
      </RegisterPaper>
      <RegisterFooter />
    </Container>
  );
};
