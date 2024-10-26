import "./App.scss";
import PageNavigation from "./components/router/PageNavigation";
import ScrollToTop from "./functions/scrollToTop/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
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
