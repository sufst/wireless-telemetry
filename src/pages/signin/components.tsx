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

import React from "react";
import {
  TextField,
  Link,
  Box,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { SubmitButton, Avatar } from "./styles";

export const LoginFooter: React.FC = () => {
  return (
    <Box mt={4}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://sufst.co.uk/">
          SUFST
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export const LoginHeader: React.FC = () => {;

  return (
    <>
      <Avatar>
        <LockOutlinedIcon sx={{color:"white"}} />
      </Avatar>
      <Typography component="h1" variant="h5">
        Please Login In
      </Typography>
    </>
  );
};

//#region UsernameField Setup

interface UsernameProps {
  value?: string,
  onChange?: any
}

const defaultUsernameProps: UsernameProps = {
  value: "",
  onChange: undefined,
}

export const UsernameField: React.FC<UsernameProps> = (props) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      {...(props.value && props.onChange && {
        value:props.value,
        onChange:
          (event: React.ChangeEvent<HTMLInputElement>) => {
          props.onChange(event.target.value);
      }}

      )}

      required
      fullWidth
      id="username"
      label="Username"
      autoComplete="root"
      autoFocus
      // https://mui.com/material-ui/react-text-field/#limitations
      // "The input label "shrink" state isn't always correct.
      // The input label is supposed to shrink as soon as the input is displaying something.
      // In some circumstances, we can't determine the "shrink" state (number input, datetime input, Stripe input).
      // You might notice an overlap."
      //
      //To fix this issue, we force the label to shrink by setting the shrink prop to true.
      InputLabelProps={{shrink:true}}
    />
  );
};

UsernameField.defaultProps = defaultUsernameProps;

//#endregion


export const PasswordField: React.FC<{error:boolean; label: string; id: string }> = (
  props
) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      label={props.label}
      type="password"
      id={props.id}
      autoComplete="current-password"
      error={props.error}
    />
  );
};

export const LoginButton: React.FC<{ text: string }> = (props) => {

  return (
    <SubmitButton
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
    >
      {props.text}
    </SubmitButton>
  );
};
