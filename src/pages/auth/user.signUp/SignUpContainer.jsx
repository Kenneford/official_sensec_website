import { Box } from "@mui/material";
import React from "react";
import {
  StudentsSignUp,
  UserSignUp,
} from "../../../components/lazyLoading/auth/AuthLazyComponents";
import { useParams } from "react-router-dom";

export function SignUpContainer() {
  // const signUpAction = localStorage.getItem("signUpAction");
  const { signUpAction } = useParams();
  return (
    <Box>
      {signUpAction === "students" && <StudentsSignUp />}
      {signUpAction === "partners" && <UserSignUp />}
    </Box>
  );
}
