import React, { useCallback, useEffect, useState } from "react";
import "./questions.scss";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import { ContainerBox, CustomizedButton } from "../../../muiStyling/muiStyling";

const faqs = [
  {
    question: "Which courses does the school offer?",
    answer:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  },
  {
    question: "Where can I get the school form to buy?",
    answer:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  },
  {
    question: "Does the school have a laboratory?",
    answer:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  },
  {
    question: "How much is the boarding fees per semester?",
    answer:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  },
];

export function QuestionsSection() {
  const [openFAQ, setOpenFAQ] = useState(false);
  const [faqClicked, setFaqClicked] = useState("");
  const [openQ, setOpenQ] = useState(false);
  const [openQ1, setOpenQ1] = useState(false);
  const [openQ2, setOpenQ2] = useState(false);

  console.log(openFAQ);

  const handleQuestion = useCallback((faq) => {
    setFaqClicked(faq);
    setOpenFAQ(!openFAQ);
  }, []);
  // Handling clicked FAQ
  useEffect(() => {}, []);

  const handleQ = () => setOpenQ(!openQ);
  const handleQ1 = () => setOpenQ1(!openQ1);
  const handleQ2 = () => setOpenQ2(!openQ2);
  return (
    <Box
      component="div"
      className="faqsSectionWrap"
      sx={{ width: "100%", backgroundColor: "#292929", color: "#cccc" }}
    >
      <ContainerBox
        sx={{
          width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Box>
          <h1>Frequently Asked Questions</h1>
        </Box>
        <Grid container spacing={3}>
          {faqs?.map((faq) => (
            <Grid key={faq?.question} item xs={12} sm={6} md={6} lg={6}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  // borderRadius: ".4rem",
                  // position: "relative",
                  // margin: ".5rem 0",
                  // display: "flex",
                  // justifyContent: "center",
                  // alignItems: "center",
                }}
              >
                <Box>
                  <Button
                    className={
                      openFAQ && faqClicked === faq?.question
                        ? "questionsIcon active"
                        : "questionsIcon"
                    }
                    onClick={() => {
                      setFaqClicked(faq?.question);
                      if (faqClicked === faq?.question) {
                        setOpenFAQ(!openFAQ);
                      } else {
                        setOpenFAQ(true);
                      }
                    }}
                    sx={{
                      color: "#696969",
                      minHeight: "5rem",
                      lineHeight: "1.3rem",
                    }}
                  >
                    {!openFAQ && !faqClicked && <AddIcon className="faqIcon" />}
                    {!openFAQ && faqClicked && <AddIcon className="faqIcon" />}
                    {openFAQ && faqClicked !== faq?.question && (
                      <AddIcon className="faqIcon" />
                    )}
                    {openFAQ && faqClicked === faq?.question && (
                      <RemoveIcon className="faqIcon" />
                    )}
                    <h4
                      style={{
                        textTransform: "capitalize",
                        fontSize: "1.3em",
                        textAlign: "left",
                      }}
                    >
                      {faq?.question}
                    </h4>
                  </Button>
                  {openFAQ && faqClicked === faq?.question && (
                    <Box className="questionsAnswer">
                      <p>{faq?.answer}</p>
                      {/* <Link to={"#"}> */}
                      <CustomizedButton
                        contained
                        sx={{ backgroundColor: "green", color: "#fff" }}
                        className="faqBtn"
                      >
                        Read More
                      </CustomizedButton>
                      {/* </Link> */}
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </ContainerBox>
    </Box>
    // <Box
    //   component="div"
    //   className="programmeSectionWrap"
    //   sx={{ width: "100%", backgroundColor: "#3e3e3e", color: "#cccc" }}
    // >
    //   <Box
    //     sx={{
    //       // width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
    //       display: "flex",
    //       flexDirection: "column",
    //       justifyContent: "center",
    //       alignItems: "center",
    //       // margin: "auto",
    //     }}
    //   >
    //     <Box
    //       sx={{
    //         width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
    //         // margin: "auto",
    //       }}
    //       className="questionsWrap"
    //     >
    //       <h2>Frequently Asked Questions</h2>
    //       <Box className="questionsCont">
    //         <Box className={!openFAQ ? "questions" : "questions open"}>
    //           <Button
    //             className={!openFAQ ? "questionsIcon" : "questionsIcon active"}
    //             onClick={handleQuestion}
    //           >
    //             {!openFAQ ? <AddIcon /> : <RemoveIcon />}
    //             <h4>Which courses does the school offer?</h4>
    //           </Button>
    //           <Box className="questionsAnswer">
    //             <p>
    //               It is a long established fact that a reader will be distracted
    //               by the readable content of a page when looking at its layout.
    //               The point of using Lorem Ipsum is that it has a more-or-less
    //               normal distribution of letters, as opposed to using 'Content
    //               here, content here', making it look like readable English.
    //             </p>
    //             <Link to={"#"}>
    //               <button className="faqBtn">Read More</button>
    //             </Link>
    //           </Box>
    //         </Box>
    //         <Box className={!openQ ? "questions" : "questions open"}>
    //           <Button
    //             className={!openQ ? "questionsIcon" : "questionsIcon active"}
    //             onClick={handleQ}
    //           >
    //             {!openQ ? <AddIcon /> : <RemoveIcon />}
    //             <h4>Where can I get the school form to buy?</h4>
    //           </Button>
    //           <Box className="questionsAnswer">
    //             <p>
    //               It is a long established fact that a reader will be distracted
    //               by the readable content of a page when looking at its layout.
    //               The point of using Lorem Ipsum is that it has a more-or-less
    //               normal distribution of letters, as opposed to using 'Content
    //               here, content here', making it look like readable English.
    //             </p>
    //             <Link to={"#"}>
    //               <button className="faqBtn">Read More</button>
    //             </Link>
    //           </Box>
    //         </Box>
    //         <Box className={!openQ1 ? "questions" : "questions open"}>
    //           <Button
    //             className={!openQ1 ? "questionsIcon" : "questionsIcon active"}
    //             onClick={handleQ1}
    //           >
    //             {!openQ1 ? <AddIcon /> : <RemoveIcon />}
    //             <h4>Does the school have a laboratory?</h4>
    //           </Button>
    //           <Box className="questionsAnswer">
    //             <p>
    //               It is a long established fact that a reader will be distracted
    //               by the readable content of a page when looking at its layout.
    //               The point of using Lorem Ipsum is that it has a more-or-less
    //               normal distribution of letters, as opposed to using 'Content
    //               here, content here', making it look like readable English.
    //             </p>
    //             <Link to={"#"}>
    //               <button className="faqBtn">Read More</button>
    //             </Link>
    //           </Box>
    //         </Box>
    //         <Box className={!openQ2 ? "questions" : "questions open"}>
    //           <Button
    //             className={!openQ2 ? "questionsIcon" : "questionsIcon active"}
    //             onClick={handleQ2}
    //           >
    //             {!openQ2 ? <AddIcon /> : <RemoveIcon />}
    //             <h4>How much is the boarding fees per semester?</h4>
    //           </Button>
    //           <Box className="questionsAnswer">
    //             <p>
    //               It is a long established fact that a reader will be distracted
    //               by the readable content of a page when looking at its layout.
    //               The point of using Lorem Ipsum is that it has a more-or-less
    //               normal distribution of letters, as opposed to using 'Content
    //               here, content here', making it look like readable English.
    //             </p>
    //             <Link to={"#"}>
    //               <button className="faqBtn">Read More</button>
    //             </Link>
    //           </Box>
    //         </Box>
    //       </Box>
    //     </Box>
    //   </Box>
    // </Box>
  );
}
