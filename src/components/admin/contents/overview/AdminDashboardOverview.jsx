import { Box } from "@mui/material";
import "./adminDashboardOverview.scss";
import { useParams } from "react-router-dom";

export function AdminDashboardOverview() {
  const { adminCurrentAction, adminCurrentLink } = useParams();
  return (
    <Box
      component={"div"}
      id="adminOverview"
      className="adminOverviewWrap"
      // sx={{
      //   fontSize: "calc(0.7rem + 1vmin)",
      // }}
    >
      <Box className="searchWrap">
        <Box className="searchCont">
          <h1 className="dashAction">
            {adminCurrentAction} /{" "}
            <span>{adminCurrentLink?.replace(/_/g, " ")}</span>
          </h1>
          {/* <SearchForm value={searchStudent} onChange={setSearchStudent} /> */}
        </Box>
      </Box>
      <Box>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
        <p>Testing Page Scrolling</p>
      </Box>
    </Box>
  );
}
