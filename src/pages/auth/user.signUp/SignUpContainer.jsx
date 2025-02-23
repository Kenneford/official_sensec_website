import { Box } from "@mui/material";
import {
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
      {signUpAction === "staffs" && !uniqueId && <UserSignUp />}
    </Box>
  );
}
