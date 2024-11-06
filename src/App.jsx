import "./App.scss";
import PageNavigation from "./components/router/PageNavigation";
import ScrollToTop from "./functions/scrollToTop/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TokenExpiry from "./pages/auth/token/TokenExpiry";

function App() {
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
