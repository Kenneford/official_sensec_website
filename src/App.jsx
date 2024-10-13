import "./App.scss";
import PageNavigation from "./components/router/PageNavigation";
import ScrollToTop from "./functions/scrollToTop/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <PageNavigation />
    </>
  );
}

export default App;
