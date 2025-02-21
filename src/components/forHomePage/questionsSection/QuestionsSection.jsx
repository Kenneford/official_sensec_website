import React, { useCallback, useEffect, useState } from "react";
import "./questions.scss";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import { ContainerBox, CustomizedButton } from "../../../muiStyling/muiStyling";
import { HashLink } from "react-router-hash-link";

const faqs = [
  {
    question: "Which courses does the school offer?",
    answer:
      "Our school offers six programmes. These are, Business, General Arts, Home Economics, General Science, Agricultural Science and Visual Arts.",
    link: "/sensec/courses#allProgrammes",
  },
  {
    question: "Where can I get the school form to buy?",
    answer: `Forms are not for sale! After GES placement scheme, students can visit our website at <a href="https://www.senyashs.com/sensec/students/enrollment/placement_check" target="blank" style="color: #0794bf; text-decoration: underline;">www.senyashs.com</a> or <a href="https://senyashs.com/sensec/students/enrollment/placement_check" target="blank" style="color: #0794bf; text-decoration: underline;">senyashs.com</a> to check their placement and begin our online enrollment process.`,
    link: "/sensec/students/enrollment/documentation",
  },
  {
    question: "Does the school have a laboratory?",
    answer:
      "Sure, our school has a standard science laboratory which helps promotes scientific literacy among students by helping them develop among other competencies, problem solving skills, critical thinking, and appreciation of the importance of technology.",
    link: "#",
    // link: "/sensec/science_laboratory#science_laboratory",
  },
  {
    question: "How much is the boarding fees per semester?",
    answer:
      "Since the arrival of the free SHS system, student enrolled in our school do not pay any fees. Nevertheless, student are required to pay for basic stuffs they will need in the school for academics.",
    link: "#",
    // link: "/sensec/book_shop#book_shop",
  },
];

export function QuestionsSection() {
  const [openFAQ, setOpenFAQ] = useState(false);
  const [faqClicked, setFaqClicked] = useState("");
  const [openQ, setOpenQ] = useState(false);
  const [openQ1, setOpenQ1] = useState(false);
  const [openQ2, setOpenQ2] = useState(false);

  console.log(openFAQ);
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
    const yOffset = -150;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

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
          padding: { xs: "1rem .5rem", sm: "2rem 1rem" },
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
                  minHeight: "3rem",
                  // borderRadius: ".4rem",
                  // position: "relative",
                  // margin: ".5rem 0",
                  // display: "flex",
                  // justifyContent: "center",
                  // alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    minHeight: "3rem",
                  }}
                >
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
                      minHeight: "3rem",
                      lineHeight: "1.3rem",
                      justifyContent: "unset",
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
                        fontSize: "1.2em",
                        textAlign: "left",
                        fontWeight:
                          openFAQ && faqClicked === faq?.question
                            ? "bold"
                            : 300,
                      }}
                    >
                      {faq?.question}
                    </h4>
                  </Button>
                  {openFAQ && faqClicked === faq?.question && (
                    <Box
                      className="questionsAnswer"
                      sx={{
                        padding: { xs: "0 .5rem 1rem", sm: " 0 1rem 1rem" },
                      }}
                    >
                      <p dangerouslySetInnerHTML={{ __html: faq?.answer }}>
                        {/* {faq?.answer} */}
                      </p>
                      {/* <Link to={"#"}> */}
                      <HashLink
                        to={faq?.link}
                        smooth
                        scroll={scrollWithOffset}
                        className="faqBtn"
                      >
                        Read More
                      </HashLink>
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
  );
}
