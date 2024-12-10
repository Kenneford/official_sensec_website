import "./App.scss";
import PageNavigation from "./components/router/PageNavigation";
import ScrollToTop from "./functions/scrollToTop/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TokenExpiry from "./pages/auth/token/TokenExpiry";

function App() {
  if (import.meta.env.MODE === "production") {
    console.log("You are in production mode");
  } else {
    console.log("You are in development mode");
  }
  return (
    <>
      <ScrollToTop />
      <TokenExpiry />
      <PageNavigation />
      <ToastContainer />
    </>
  );
}

export default App;
