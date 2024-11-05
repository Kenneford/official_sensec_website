import { useEffect } from "react";
import "./App.scss";
import PageNavigation from "./components/router/PageNavigation";
import ScrollToTop from "./functions/scrollToTop/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

function App() {
  const token = localStorage.getItem("userToken");
  // Auto-Logout When Token Expires
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000 - Date.now(); // Time left until expiration

      // Set a timeout to log out the user when token expires
      const timer = setTimeout(() => {
        localStorage.removeItem("userToken");
        // Optionally, redirect to login page
        // window.location.href = "/login";
      }, expirationTime);

      // Clean up the timer when the component unmounts or token changes
      return () => clearTimeout(timer);
    }
  }, [token]);
  return (
    <>
      {/* <ToastContainer style={{ position: "absolute", top: 0, zIndex: 99999 }} /> */}
      <ScrollToTop />
      <PageNavigation />
      <ToastContainer />
    </>
  );
}

export default App;
