import React from "react";

import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { BarChart } from "@mui/x-charts";

const drawerWidth = 240;

const data = [
  { category: "Jan", sales: 400 },
  { category: "Feb", sales: 300 },
  { category: "Mar", sales: 500 },
  { category: "Apr", sales: 700 },
  { category: "May", sales: 600 },
];

export default function FakeDashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["Home", "Reports", "Analytics", "Users"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          marginLeft: `${drawerWidth}px`,
        }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Sales Data
        </Typography>

        {/* Bar Chart */}
        <BarChart
          width={600}
          height={400}
          data={data} // Use the entire data array
          xField="category" // Use the category as x-axis field
          yField="sales" // Use the sales as y-axis field
          series={[{ name: "Sales", data: data.map((item) => item.sales) }]} // Remove explicit xAxis and yAxis props
          label={{
            formatter: (item) => `${item}`,
            position: "top",
          }}
        />
      </Box>
    </Box>
    // <Box sx={{ display: "flex" }}>
    //   <CssBaseline />
    //   {/* Header */}
    //   <AppBar
    //     position="fixed"
    //     sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //   >
    //     <Toolbar>
    //       <Typography variant="h6" noWrap component="div">
    //         Admin Dashboard
    //       </Typography>
    //     </Toolbar>
    //   </AppBar>

    //   {/* Sidebar */}
    //   <Drawer
    //     variant="permanent"
    //     sx={{
    //       width: drawerWidth,
    //       flexShrink: 0,
    //       [`& .MuiDrawer-paper`]: {
    //         width: drawerWidth,
    //         boxSizing: "border-box",
    //       },
    //     }}
    //   >
    //     <Toolbar />
    //     <Box sx={{ overflow: "auto" }}>
    //       <List>
    //         {["Home", "Reports", "Analytics", "Users"].map((text, index) => (
    //           <ListItem button key={text}>
    //             <ListItemText primary={text} />
    //           </ListItem>
    //         ))}
    //       </List>
    //     </Box>
    //   </Drawer>

    //   {/* Main Content */}
    //   <Box
    //     component="main"
    //     sx={{
    //       flexGrow: 1,
    //       bgcolor: "background.default",
    //       p: 3,
    //       marginLeft: `${drawerWidth}px`,
    //     }}
    //   >
    //     <Toolbar />
    //     <Typography variant="h4" gutterBottom>
    //       Sales Data
    //     </Typography>

    //     {/* Bar Chart */}
    //     <BarChart
    //       width={600}
    //       height={400}
    //       series={[
    //         {
    //           data: data.map((item) => item.sales),
    //           label: "Sales",
    //         },
    //       ]}
    //       xAxis={[
    //         {
    //           data: data.map((item) => item.category),
    //           label: "Month",
    //           // type: 'band', // Removed to see if default config works
    //         },
    //       ]}
    //     />
    //   </Box>
    // </Box>
    // <Box sx={{ display: "flex" }}>
    //   <CssBaseline />
    //   {/* Header */}
    //   <AppBar
    //     position="fixed"
    //     sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //   >
    //     <Toolbar>
    //       <Typography variant="h6" noWrap component="div">
    //         Admin Dashboard
    //       </Typography>
    //     </Toolbar>
    //   </AppBar>

    //   {/* Sidebar */}
    //   <Drawer
    //     variant="permanent"
    //     sx={{
    //       width: drawerWidth,
    //       flexShrink: 0,
    //       [`& .MuiDrawer-paper`]: {
    //         width: drawerWidth,
    //         boxSizing: "border-box",
    //       },
    //     }}
    //   >
    //     <Toolbar />
    //     <Box sx={{ overflow: "auto" }}>
    //       <List>
    //         {["Home", "Reports", "Analytics", "Users"].map((text, index) => (
    //           <ListItem button key={text}>
    //             <ListItemText primary={text} />
    //           </ListItem>
    //         ))}
    //       </List>
    //     </Box>
    //   </Drawer>

    //   {/* Main Content */}
    //   <Box
    //     component="main"
    //     sx={{
    //       flexGrow: 1,
    //       bgcolor: "background.default",
    //       p: 3,
    //       marginLeft: `${drawerWidth}px`,
    //     }}
    //   >
    //     <Toolbar />
    //     <Typography variant="h4" gutterBottom>
    //       Sales Data
    //     </Typography>

    //     {/* Bar Chart */}
    //     <BarChart
    //       width={600}
    //       height={400}
    //       series={[
    //         {
    //           data: data.map((item) => item.sales),
    //           label: "Sales",
    //         },
    //       ]}
    //       //   xAxis={[
    //       //     {
    //       //       data: data.map((item) => item.category),
    //       //       label: "Month",
    //       //       type: "band",
    //       //     },
    //       //   ]}
    //     />
    //   </Box>
    // </Box>
  );
}
