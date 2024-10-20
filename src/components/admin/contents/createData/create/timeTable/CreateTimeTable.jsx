import React, { useState } from "react";
import "./createTimeTable.scss";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import {
  LessonHours,
  TimeTableDayLessons,
  TimeTableProgramme,
} from "../../../../../lazyLoading/admin/AdminLazyLoadingComponents";

export function CreateTimeTable() {
  const [select, setSelect] = useState({
    dataType: "",
  });
  const handleDataTypeValue = (e) => {
    setSelect({
      ...select,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      {/* <div className="selectdataTypeWrap">
        <label htmlFor="dataType" className="title">
          Choose Time-Table Data Type:
        </label>
        <div className="subjectCont">
          <div className="radioGap">
            <label className="subjectTypeLabel" htmlFor="program">
              Programme
            </label>
            <input
              className="program"
              type="radio"
              onChange={handleDataTypeValue}
              name="dataType"
              value={"program"}
              checked={select.dataType === "program"}
            />
          </div>
          <div className="radioGap">
            <label className="subjectTypeLabel" htmlFor="dayLessons">
              Day & Lessons
            </label>
            <input
              className="dayLessons"
              type="radio"
              onChange={handleDataTypeValue}
              name="dataType"
              value={"dayLessons"}
              checked={select.dataType === "dayLessons"}
            />
          </div>
          <div className="radioGap">
            <label className="subjectTypeLabel" htmlFor="timeRange">
              Time Range
            </label>
            <input
              className="timeRange"
              type="radio"
              onChange={handleDataTypeValue}
              name="dataType"
              value={"timeRange"}
              checked={select.dataType === "timeRange"}
            />
          </div>
        </div>
      </div> */}
      <Box
        sx={{
          width: { xs: "100%", sm: "85%", md: "75%", lg: "60%", xl: "50%" },
          margin: "auto",
          paddingTop: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className="selectTimeTableDataTypeWrap"
      >
        <FormControl component="fieldset">
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              // margin: "0 1rem",
              alignItems: "center",
              textAlign: "center",
              // gap: { xs: "0", sm: "1rem" },
            }}
          >
            <FormLabel
              // component="legend"
              className="title"
              sx={{
                fontWeight: "500",
                textAlign: "center",
                marginRight: { xs: "0", sm: "1rem" },
                color: "#696969",
              }}
            >
              <h1>Choose Time-Table Data Type:</h1>
            </FormLabel>
            <RadioGroup
              row
              aria-label="options"
              name="dataType"
              onChange={handleDataTypeValue}
              sx={{ margin: "0 1rem" }}
            >
              <FormControlLabel
                value="programme"
                control={
                  <Radio
                    sx={{
                      color: "#04a214",
                      "&.Mui-checked": {
                        color: "#04a214",
                      },
                    }}
                  />
                }
                label="Programme"
                sx={{
                  color: select.dataType === "programme" ? "#04a214" : "",
                }}
              />
              <FormControlLabel
                value="dayLessons"
                control={
                  <Radio
                    sx={{
                      color: "brown",
                      "&.Mui-checked": {
                        color: "brown",
                      },
                    }}
                  />
                }
                label="Day & Lessons"
                sx={{
                  color: select.dataType === "dayLessons" ? "brown" : "",
                }}
              />
              <FormControlLabel
                value="timeRange"
                control={
                  <Radio
                    sx={{
                      color: "orange",
                      "&.Mui-checked": {
                        color: "orange",
                      },
                    }}
                  />
                }
                label="Time Range"
                sx={{
                  color: select.dataType === "timeRange" ? "orange" : "",
                }}
              />
            </RadioGroup>
          </Box>
        </FormControl>
      </Box>
      {select.dataType === "programme" && <TimeTableProgramme />}
      {select.dataType === "dayLessons" && <TimeTableDayLessons />}
      {select.dataType === "timeRange" && <LessonHours />}
    </>
  );
}
