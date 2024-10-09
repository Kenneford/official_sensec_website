import React, { useState } from "react";
import "./questions.scss";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";

export function QuestionsSection() {
  const [openFAQ, setOpenFAQ] = useState(false);
  const [openQ, setOpenQ] = useState(false);
  const [openQ1, setOpenQ1] = useState(false);
  const [openQ2, setOpenQ2] = useState(false);

  console.log(openFAQ);

  const handleQuestion = () => setOpenFAQ(!openFAQ);
  const handleQ = () => setOpenQ(!openQ);
  const handleQ1 = () => setOpenQ1(!openQ1);
  const handleQ2 = () => setOpenQ2(!openQ2);
  return (
    <div className="questionsWrap">
      <div className="courseSecHeader">
        <h2>Frequently Asked Questions</h2>
      </div>
      <div className="questionsCont">
        <div className={!openFAQ ? "questions" : "questions open"}>
          <div
            className={!openFAQ ? "questionsIcon" : "questionsIcon active"}
            onClick={handleQuestion}
          >
            {!openFAQ ? <AddIcon /> : <RemoveIcon />}
            <h4>Which courses does the school offer?</h4>
          </div>
          <div className="questionsAnswer">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
            </p>
            <Link to={"#"}>
              <button className="faqBtn">Read More</button>
            </Link>
          </div>
        </div>
        <div className={!openQ ? "questions" : "questions open"}>
          <div
            className={!openQ ? "questionsIcon" : "questionsIcon active"}
            onClick={handleQ}
          >
            {!openQ ? <AddIcon /> : <RemoveIcon />}
            <h4>Where can I get the school form to buy?</h4>
          </div>
          <div className="questionsAnswer">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
            </p>
            <Link to={"#"}>
              <button className="faqBtn">Read More</button>
            </Link>
          </div>
        </div>
        <div className={!openQ1 ? "questions" : "questions open"}>
          <div
            className={!openQ1 ? "questionsIcon" : "questionsIcon active"}
            onClick={handleQ1}
          >
            {!openQ1 ? <AddIcon /> : <RemoveIcon />}
            <h4>Does the school have a laboratory?</h4>
          </div>
          <div className="questionsAnswer">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
            </p>
            <Link to={"#"}>
              <button className="faqBtn">Read More</button>
            </Link>
          </div>
        </div>
        <div className={!openQ2 ? "questions" : "questions open"}>
          <div
            className={!openQ2 ? "questionsIcon" : "questionsIcon active"}
            onClick={handleQ2}
          >
            {!openQ2 ? <AddIcon /> : <RemoveIcon />}
            <h4>How much is the boarding fees per semester?</h4>
          </div>
          <div className="questionsAnswer">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
            </p>
            <Link to={"#"}>
              <button className="faqBtn">Read More</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
