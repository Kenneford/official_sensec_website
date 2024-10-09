import React from "react";
import SideBar from "../../components/sidebar/SideBar";

export function About() {
  return (
    <div className="pageFlex">
      <SideBar />
      <div className="contents" style={{ flex: "5" }}>
        <h1>About</h1>
      </div>
    </div>
  );
}
