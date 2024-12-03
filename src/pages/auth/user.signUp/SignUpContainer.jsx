import { Box } from "@mui/material";
import React from "react";
import {
  SignUpSuccessPage,
  StudentsSignUp,
  UserSignUp,
} from "../../../components/lazyLoading/auth/AuthLazyComponents";
import { useParams } from "react-router-dom";

export function SignUpContainer() {
  // const signUpAction = localStorage.getItem("signUpAction");
  const { signUpAction, uniqueId } = useParams();
  return (
    <Box>
      {signUpAction === "students" && !uniqueId && <StudentsSignUp />}
      {signUpAction === "partners" && !uniqueId && <UserSignUp />}
      {/* {signUpAction && uniqueId && <SignUpSuccessPage />} */}
    </Box>
  );
}
