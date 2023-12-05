import React, { useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import AnswerBox from "../AnswerBox/AnswerBox";
import Answers from "../Answers/Answers";
import { Alert } from "@mui/material";
import { NavLink } from "react-router-dom";

const Questions = ({ post, profile }) => {
  const { question } = post;
  const [answers, setAnswers] = useState([]);

  const [expandedOne, setExpandedOne] = useState(false);
  const [expandedTwo, setExpandedTwo] = useState(false);

  const handleExpandOneClick = () => {
    setExpandedOne(!expandedOne);
    setExpandedTwo(false);
  };
  const handleExpandTwoClick = () => {
    setExpandedTwo(!expandedTwo);
    setExpandedOne(false);
  };

  useEffect(() => {
    fetch(`http://localhost:65000/answers/${post?._id}`)
      .then((res) => res.json())
      .then((data) => {
        setAnswers(data);
      });
  }, [post?._id]);

  return (
    <>
      <div className="bg-white rounded mb-3">
        <NavLink to={`${post._id}`}>
          <CardContent>
            <blockquote class="block mt-1 text-lg font-medium text-black hover:underline cursor-pointer leading-normal">
              {question}
            </blockquote>
          </CardContent>
        </NavLink>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <span class="hover:bg-gray-100 text-gray-600 text-sm font-medium inline-flex items-center px-10 py-2 rounded me-2 hover:dark:bg-gray-700 dark:text-gray-400 cursor-pointer">
            <svg
              class="w-4 h-4 me-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z"
              ></path>
            </svg>
            Share
          </span>
          <span
            class="hover:bg-gray-100 text-gray-600 text-sm font-medium inline-flex items-center px-10 py-2 rounded me-2 hover:dark:bg-gray-700 dark:text-gray-400 cursor-pointer"
            expand={expandedOne}
            onClick={handleExpandOneClick}
            aria-expanded={expandedOne}
            aria-label="show more"
          >
            <svg
              class="w-4 h-4 me-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M15 3.75A5.25 5.25 0 009.75 9v10.19l4.72-4.72a.75.75 0 111.06 1.06l-6 6a.75.75 0 01-1.06 0l-6-6a.75.75 0 111.06-1.06l4.72 4.72V9a6.75 6.75 0 0113.5 0v3a.75.75 0 01-1.5 0V9c0-2.9-2.35-5.25-5.25-5.25z"
              ></path>
            </svg>
            {answers.length} answers
          </span>
          <span
            class="hover:bg-gray-100 text-gray-600 text-sm font-medium inline-flex items-center px-10 py-2 rounded me-2 hover:dark:bg-gray-700 dark:text-gray-400 cursor-pointer"
            expand={expandedTwo}
            onClick={handleExpandTwoClick}
            aria-expanded={expandedTwo}
            aria-label="show more"
          >
            <svg
              class="w-4 h-4 me-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"></path>
              <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"></path>
            </svg>
            Answer
          </span>
        </CardActions>
        <Collapse in={expandedOne} timeout="auto" unmountOnExit>
          <CardContent>
            {answers.map((answer) => (
              <Answers key={answer._id} answer={answer}></Answers>
            ))}
          </CardContent>
        </Collapse>
        <Collapse in={expandedTwo} timeout="auto" unmountOnExit>
          <CardContent>
            {profile?.status == "physician" ? (
              <AnswerBox
                key={profile?._id}
                profile={profile}
                post={post}
              ></AnswerBox>
            ) : (
              <Alert severity="info">
                Patients are not allowed to write answers.
              </Alert>
            )}
          </CardContent>
        </Collapse>
      </div>
    </>
  );
};

export default Questions;
