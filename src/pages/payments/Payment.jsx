import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  MenuItem,
  Grid,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";
import { CustomTextField } from "../../muiStyling/muiStyling";
import { FetchCurrentAcademicTerms } from "../../data/term.year/FetchAcademicTerms";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { NavigationBar } from "../../components/navbar/NavigationBar";
import { toast } from "react-toastify";
import {
  makePayment,
  resetMakePaymentData,
} from "../../features/payments/paymentsSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingProgress from "../../components/pageLoading/LoadingProgress";
import { TaskAlt } from "@mui/icons-material";
import Redirection from "../../components/pageLoading/Redirection";
import Cookies from "js-cookie";

export function Payment() {
  const {
    currentAction,
    setCurrentAction,
    currentLink,
    setCurrentLink,
    setOpenSubNavLinks,
    openSubNavLinks,
    setOpenUserActions,
    openUserActions,
    setOpenSignUpActions,
    openSignUpActions,
    setOpenMenuLinks,
    openMenuLinks,
  } = useOutletContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // TODO ==>> Fetch All Payments

  const { makePaymentStatus, error, successMessage } = useSelector(
    (state) => state.payments
  );

  const studentIndexNo = Cookies.get("masked_student_index");

  const [paymentMethod, setPaymentMethod] = useState("");
  const [studentId, setStudentId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [schoolName, setSchoolName] = useState("Senya SHS");
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [redirecting, setRedirecting] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [paymentState, setPaymentState] = useState({
    provider: "",
    studentId: studentIndexNo || "",
    phoneNumber: "",
    amount: "",
    schoolName: "Senya SHS",
    nameOfBank: "",
    accountHolder: "",
    email: "",
    reference: "",
  });
  console.log(paymentState);

  const handleInputValue = (e) => {
    setPaymentState({
      ...paymentState,
      [e.target.name]: e.target.value,
    });
  };

  const currentYear = new Date().getFullYear();
  const semester = FetchCurrentAcademicTerms();

  // TODO ==>> Find Existing Payment and navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      provider: paymentState?.provider,
      studentId: paymentState?.studentId,
      phoneNumber: paymentState?.phoneNumber,
      amount: Number(paymentState?.amount),
      reference: paymentState?.reference,
      year: currentYear,
      semester,
      email: paymentState?.email,
    };
    dispatch(makePayment(data));
  };

  // Handle enrollment status check
  useEffect(() => {
    if (makePaymentStatus === "pending") {
      setLoadingComplete(false);
    }
    if (makePaymentStatus === "rejected") {
      setTimeout(() => {
        error?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "light",
            toastId: err,
          })
        );
      }, 1000);
      setTimeout(() => {
        setLoadingComplete(null);
        dispatch(resetMakePaymentData());
      }, 3000);
      return;
    }
    if (makePaymentStatus === "success") {
      setTimeout(() => {
        setLoadingComplete(true);
      }, 3000);
      setTimeout(() => {
        setRedirecting(true);
        dispatch(resetMakePaymentData());
      }, 6000);
      setTimeout(() => {
        // setRedirecting(false);
        // setLoadingComplete(null);
        Cookies.remove("masked_student_index");
        if (paymentState?.reference === "Enrolment") {
          navigate(`/sensec/students/enrollment/online/${studentIndexNo}`);
        }
      }, 9000);
    }
  }, [
    navigate,
    dispatch,
    makePaymentStatus,
    error,
    successMessage,
    studentIndexNo,
    paymentState,
  ]);

  return (
    <>
      {/* School Logo */}
      <Box
        direction="column"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: ".3rem 0",
          height: "4.5rem",
        }}
      >
        <Box
          onClick={() => {
            // Click handler
            localStorage.removeItem("currentNavLink");
            navigate("/sensec/homepage");
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Avatar
            src="/assets/sensec-logo1.png"
            sx={{ alignItems: "center" }}
          />
          <Box sx={{ display: "flex", height: "1.5rem" }}>
            <Typography variant="h6" color="green">
              Sen
            </Typography>
            <Typography variant="h6" color="#aeae0d">
              sec
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* Main navbar links */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          padding: 0,
          zIndex: 5,
        }}
      >
        <NavigationBar
          setOpenSubNavLinks={setOpenSubNavLinks}
          openSubNavLinks={openSubNavLinks}
          setOpenUserActions={setOpenUserActions}
          openUserActions={openUserActions}
          setOpenSignUpActions={setOpenSignUpActions}
          openSignUpActions={openSignUpActions}
          setOpenMenuLinks={setOpenMenuLinks}
          openMenuLinks={openMenuLinks}
          currentAction={currentAction}
          setCurrentAction={setCurrentAction}
          currentLink={currentLink}
          setCurrentLink={setCurrentLink}
        />
      </Box>
      <Box sx={{ maxWidth: 600, margin: "3rem auto 0", padding: 2 }}>
        <Box
          sx={{
            filter: "drop-shadow(0 0 0 rgb(255, 255, 255, 0.68))",
            boxShadow: "0px 1px 9px 1px #292929",
            borderRadius: ".4rem",
            padding: 1,
            paddingBottom: 2,
            //   width: { xs: "95%", sm: { minWidth: "40rem" } }, // Responsive width based on screen size
            //   maxWidth: { md: "40rem", lg: "40rem" }, // Responsive width based on screen size
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            py={2}
            color="#696969"
            sx={{ fontSize: "1.4rem", fontWeight: 500 }}
          >
            Student Transactions
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  label="Student ID"
                  variant="outlined"
                  fullWidth
                  size="small"
                  name="studentId"
                  value={paymentState?.studentId}
                  onChange={handleInputValue}
                  required
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: paymentState?.studentId ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  size="small"
                  name="phoneNumber"
                  value={paymentState?.phoneNumber}
                  onChange={handleInputValue}
                  required
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: paymentState?.phoneNumber ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  select
                  label="Provider"
                  variant="outlined"
                  fullWidth
                  size="small"
                  name="provider"
                  value={paymentState?.provider}
                  onChange={handleInputValue}
                  required
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: paymentState?.provider ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                >
                  <MenuItem value="MTN" sx={{ fontSize: ".8rem" }}>
                    MTN
                  </MenuItem>
                  <MenuItem value="AirtelTigo" sx={{ fontSize: ".8rem" }}>
                    AirtelTigo
                  </MenuItem>
                  <MenuItem value="Telecel/Vodafone" sx={{ fontSize: ".8rem" }}>
                    Telecel/Vodafone
                  </MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  select
                  label="Reference"
                  variant="outlined"
                  fullWidth
                  size="small"
                  name="reference"
                  value={paymentState?.reference}
                  onChange={handleInputValue}
                  required
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: paymentState?.reference ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                >
                  <MenuItem value="Enrolment" sx={{ fontSize: ".8rem" }}>
                    Enrolment
                  </MenuItem>
                  <MenuItem value="Report" sx={{ fontSize: ".8rem" }}>
                    Report
                  </MenuItem>
                </CustomTextField>
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <CustomTextField
                  select
                  label="Currency"
                  variant="outlined"
                  fullWidth
                  size="small"
                  name="currency"
                  value={paymentState?.currency}
                  onChange={handleInputValue}
                  required
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: paymentState?.currency ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                >
                  <MenuItem value="mobilemoneygh" sx={{ fontSize: ".8rem" }}>
                    Mobile Money
                  </MenuItem>
                  <MenuItem value="Bank Transfer" sx={{ fontSize: ".8rem" }}>
                    Bank Transfer
                  </MenuItem>
                  <MenuItem value="Bank Transfer" sx={{ fontSize: ".8rem" }}>
                    Card Transfer
                  </MenuItem>
                </CustomTextField>
              </Grid> */}
              {/* {paymentState?.paymentMethod === "Bank Transfer" && (
                <>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      label="Name of Bank"
                      variant="outlined"
                      fullWidth
                      size="small"
                      name="nameOfBank"
                      value={paymentState?.nameOfBank}
                      onChange={handleInputValue}
                      required
                      sx={{
                        "& .MuiInputLabel-asterisk": {
                          color: paymentState?.nameOfBank ? "green" : "red", // Change the asterisk color to red
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      label="Account Holder"
                      variant="outlined"
                      fullWidth
                      size="small"
                      name="accountHolder"
                      value={paymentState?.accountHolder}
                      onChange={handleInputValue}
                      required
                      sx={{
                        "& .MuiInputLabel-asterisk": {
                          color: paymentState?.accountHolder ? "green" : "red", // Change the asterisk color to red
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      label="Account Number"
                      variant="outlined"
                      fullWidth
                      size="small"
                      name="accountNumber"
                      value={paymentState?.accountNumber}
                      onChange={handleInputValue}
                      required
                      sx={{
                        "& .MuiInputLabel-asterisk": {
                          color: paymentState?.accountNumber ? "green" : "red", // Change the asterisk color to red
                        },
                      }}
                    />
                  </Grid>
                </>
              )} */}
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  size="small"
                  name="email"
                  value={paymentState?.email}
                  onChange={handleInputValue}
                  required
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: paymentState?.email ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  label="Amount (GHS¢)"
                  variant="outlined"
                  fullWidth
                  size="small"
                  type="number"
                  name="amount"
                  value={paymentState?.amount}
                  onChange={handleInputValue}
                  required
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: paymentState?.amount ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                />
              </Grid>
            </Grid>
            {/* <Grid container spacing={2}>
          </Grid> */}

            {/* <CustomTextField
            label="School Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            required
          /> */}

            {/* {paymentState?.provider && ( */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                marginTop: 2,
                backgroundColor: "green",
                transition: ".5s ease",
                "&:hover": {
                  backgroundColor: "#09a80c",
                },
                textTransform: "capitalize",
                height: "2.5rem",
                display: "flex",
                alignItems: "center",
                lineHeight: "1rem",
              }}
              disabled={loading}
            >
              {loadingComplete === false && (
                <LoadingProgress color={"#fff"} size={"1.1rem"} />
              )}
              {loadingComplete === true &&
                makePaymentStatus === "success" &&
                !redirecting && (
                  <>
                    <span>Successful</span>{" "}
                    <TaskAlt style={{ fontSize: "1.2rem" }} />
                  </>
                )}
              {loadingComplete === null && "Make Payment"}
              {redirecting && <Redirection color={"#fff"} size={"1.1rem"} />}
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                marginTop: 2,
                backgroundColor: "#292929",
                transition: ".5s ease",
                "&:hover": {
                  backgroundColor: "#3a3a3a",
                },
                textTransform: "capitalize",
                height: "2.5rem",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() =>
                navigate(`/sensec/students/enrollment/online/${studentIndexNo}`)
              }
            >
              Skip
            </Button>
            {/* )} */}
          </form>
        </Box>

        {/* {error && (
          <Typography color="error" align="center" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}

        {success && (
          <Typography color="primary" align="center" sx={{ marginTop: 2 }}>
            Payment request created successfully!
          </Typography>
        )} */}
      </Box>
    </>
  );
}
