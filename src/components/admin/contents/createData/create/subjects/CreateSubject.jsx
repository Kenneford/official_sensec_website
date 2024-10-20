import React, { useEffect, useRef, useState } from "react";
import "./subject.scss";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import {
  CreateCoreSubject,
  CreateElectiveSubject,
} from "../../../../../lazyLoading/admin/AdminLazyLoadingComponents";

export function CreateSubject() {
  const [select, setSelect] = useState({
    subjectType: "",
  });
  console.log(select);

  const handleSubjectTypeValue = (e) => {
    setSelect({
      ...select,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Box
        sx={{
          width: { xs: "100%", sm: "85%", md: "75%", lg: "60%", xl: "50%" },
          margin: "auto",
          paddingTop: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className="selectSubjectTypeWrap"
      >
        <FormControl component="fieldset">
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              // gap: { xs: "0", sm: "1rem" },
            }}
          >
            <FormLabel
              component="legend"
              className="title"
              sx={{ fontWeight: "500", marginRight: "1rem" }}
            >
              <h1>Choose Subject Type:</h1>
            </FormLabel>
            <RadioGroup
              row
              aria-label="options"
              name="subjectType"
              onChange={handleSubjectTypeValue}
              sx={{ margin: "0 1rem" }}
            >
              <FormControlLabel
                value="core"
                control={
                  <Radio
                    sx={{
                      color: "#6d04a2",
                      "&.Mui-checked": {
                        color: "#6d04a2",
                      },
                    }}
                  />
                }
                label="Core"
                sx={{
                  color: select.subjectType === "core" ? "#6d04a2" : "",
                }}
              />
              <FormControlLabel
                value="elective"
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
                label="Elective"
                sx={{
                  color: select.subjectType === "elective" ? "#04a214" : "",
                }}
              />
            </RadioGroup>
          </Box>
        </FormControl>
      </Box>
      {select.subjectType === "core" && <CreateCoreSubject />}
      {select.subjectType === "elective" && <CreateElectiveSubject />}
    </>
  );
}
