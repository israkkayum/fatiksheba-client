import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import HomeSkeleton from "../../Share/HomeSkeleton/HomeSkeleton";
import Questions from "../Questions/Questions";

const QuestionsAnswers = () => {
  const { user, profile } = useAuth();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:65000/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      });
  }, [user.email]);

  return (
    <div class="bg-gray-100">
      <div class="container py-7 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-4 grid-cols-1 gap-10">
          <div class="lg:flex hidden bg-white p-2 rounded h-screen"></div>
          <div class="col-span-2">
            {questions.length !== 0 ? (
              <>
                {questions.map((question) => (
                  <Questions
                    key={question._id}
                    post={question}
                    profile={profile}
                  ></Questions>
                ))}
              </>
            ) : (
              <HomeSkeleton />
            )}
          </div>
          <div class="lg:flex hidden bg-white p-2 rounded h-screen"></div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsAnswers;
