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

import React, { useCallback, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import { useDispatch } from "react-redux";

import { loginUser } from "redux/slices/user";
import {
  LoginHeader,
  LoginFooter,
  LoginButton,
  UsernameField,
  PasswordField,
} from "./components";

import { ButtonContainer, SignInForm, SignInPaper } from "./styles";

const LoginContainer: React.FC = () => {

  const dispatch = useDispatch();

  const [username, setUsername] = useState<string>("");

  const onLoginSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const password = event.target.password.value;

      dispatch(loginUser({ username, password }));
    },
    [username, dispatch]
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <SignInPaper>
        <LoginHeader />
        <SignInForm noValidate onSubmit={onLoginSubmit}>
          <UsernameField value={username} onChange={setUsername} />
          <PasswordField error={false} label={"Password"} id={"password"} />
          <ButtonContainer>
            <LoginButton text="Login" />
          </ButtonContainer>
        </SignInForm>
      </SignInPaper>
      <LoginFooter />
    </Container>
  );
};

export default LoginContainer;
