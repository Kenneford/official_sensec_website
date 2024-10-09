import { useState } from "react";
import "./App.scss";
// import Router from "./routes/Router";
import { Navigate, Route, Routes } from "react-router-dom";
import PageNavigation from "./components/router/PageNavigation";
import ScrollToTop from "./functions/scrollToTop/ScrollToTop";

function App() {
  return (
    <div>
      <ScrollToTop />
      <PageNavigation />
      {/* <PageLayout /> */}
    </div>
  );
}

export default App;
