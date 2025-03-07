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

  const studentIndexNo = localStorage.getItem("studentIndexNo");

  const [paymentMethod, setPaymentMethod] = useState("");
  const [studentId, setStudentId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [schoolName, setSchoolName] = useState("Senya SHS");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [paymentState, setPaymentState] = useState({
    paymentMethod: "",
    studentId: studentIndexNo,
    phoneNumber: "",
    amount: "",
    schoolName: "Senya SHS",
    nameOfBank: "",
    accountHolder: "",
    accountNumber: "",
    currency: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Send the payment request to the backend
    try {
      const response = await axios.post(`${SENSEC_API_ENDPOINT}/pay_fees`, {
        paymentMethod: paymentState?.paymentMethod,
        studentId: paymentState?.studentId,
        phoneNumber: paymentState?.phoneNumber,
        amount: paymentState?.amount,
        schoolName: paymentState?.schoolName,
        year: currentYear,
        semester,
        nameOfBank: paymentState?.nameOfBank,
        accountHolder: paymentState?.accountHolder,
        accountNumber: paymentState?.accountNumber,
        enrollmentFees: studentIndexNo ? true : false,
      });
      console.log(response?.data);

      if (response.data.success) {
        setSuccess(true);
      } else {
        setError("Payment request failed!");
      }
    } catch (error) {
      setError("Payment request failed!", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate(`/sensec/students/enrollment/online/${studentIndexNo}`);
      }, 3000);
    }
  }, [success, studentIndexNo, navigate]);

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
            School Fees Payment
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  label="Student ID"
                  variant="outlined"
                  fullWidth
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
                  label="Payment Method"
                  variant="outlined"
                  fullWidth
                  name="paymentMethod"
                  value={paymentState?.paymentMethod}
                  onChange={handleInputValue}
                  required
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: paymentState?.paymentMethod ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                >
                  <MenuItem value="Mobile Money" sx={{ fontSize: ".8rem" }}>
                    Mobile Money
                  </MenuItem>
                  <MenuItem value="Bank Transfer" sx={{ fontSize: ".8rem" }}>
                    Bank Transfer
                  </MenuItem>
                  <MenuItem value="Bank Transfer" sx={{ fontSize: ".8rem" }}>
                    Card Transfer
                  </MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  select
                  label="Currency"
                  variant="outlined"
                  fullWidth
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
              </Grid>
              {paymentState?.paymentMethod === "Bank Transfer" && (
                <>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      label="Name of Bank"
                      variant="outlined"
                      fullWidth
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
              )}
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  label="Amount (GHS)"
                  variant="outlined"
                  fullWidth
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

            {paymentState?.paymentMethod && (
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
                }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : paymentState?.paymentMethod === "MTN Momo" ? (
                  "Pay via MoMo"
                ) : (
                  "Pay via Bank Transfer"
                )}
              </Button>
            )}
          </form>
        </Box>

        {error && (
          <Typography color="error" align="center" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}

        {success && (
          <Typography color="primary" align="center" sx={{ marginTop: 2 }}>
            Payment request created successfully!
          </Typography>
        )}
      </Box>
    </>
  );
}
