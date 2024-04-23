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
import {
  Box,
  Typography,
  Link,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { UserDepartment, UserPrivilege } from "types/models/user";
import { DepartmentLabel, Avatar } from "./styles";

export const DepartmentSelect = (props: {
  department: UserDepartment;
  handleDepartmentChange: (event: any) => void;
}) => {

  const { department, handleDepartmentChange } = props;

  return (
    <>
      <DepartmentLabel
        htmlFor="department-select"
      >
        Department
      </DepartmentLabel>
      <Select
        native
        value={department}
        onChange={handleDepartmentChange}
        sx={{marginTop:"5px"}}
        autoWidth={true}
        inputProps={{
          name: "department",
          id: "department-select",
        }}
      >
        <option value={"Electronics"}>Electronics</option>
        <option value={"Tier 1"}>Tier 1</option>
        <option value={"Operations"}>Operations</option>
        <option value={"Powertrain"}>Power-Train</option>
        <option value={"Vehicle Performance"}>Vehicle Performance</option>
        <option value={"Race Engineering"}>Race Engineering</option>
      </Select>
    </>
  );
};

export const PrivilegeSelect = (props: {
  privilege: UserPrivilege;
  handlePrivilegeChange: (event: any) => void;
}) => {

  const { privilege, handlePrivilegeChange } = props;

  return (
    <>
      <DepartmentLabel
        htmlFor="privilege-select"
      >
        Privilege Level
      </DepartmentLabel>
      <Select
        native
        value={privilege}
        onChange={handlePrivilegeChange}
        sx={{marginTop:"5px"}}
        autoWidth={true}
        inputProps={{
          name: "privilege",
          id: "privilege-select",
        }}
      >
        <option value={"Admin"}>Admin</option>
        <option value={"Basic"}>Basic</option>
        <option value={"Developer"}>Developer</option>
      </Select>
    </>
  );
};

export const RegisterHeader = () => {

  return (
    <>
      <Avatar>
        <AccountCircleIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Please Enter the User Details
      </Typography>
    </>
  );
};

export const RegisterFooter = () => {
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

interface Fields {
  [key: string]: string;
}

export const SubmissionDialog = (props: {
  patchFields: Fields,
  open: boolean,
  handleDialogChange: (event: boolean) => void,
  handleUserPatch: (fields: Fields) => void;
}) => {

  
    const { patchFields, open, handleDialogChange, handleUserPatch } = props;

  
    return(
      <Dialog
        open={open}
        onClose={() => handleDialogChange(false)}
      >
        <DialogTitle>
          Submission
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are u sure u want to submit the following changes?
          </DialogContentText>
            {Object.entries(patchFields).map(([key, value]) => (
              <DialogContentText key={key}>
                {key}: {value}
              </DialogContentText>
            ))}
            <DialogActions>
            <Button onClick={() => {
              handleUserPatch(patchFields);
              handleDialogChange(false);
            }}>Submit</Button>
            </DialogActions>

        </DialogContent>
      </Dialog>
    )
}
