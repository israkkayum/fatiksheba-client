import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Alert, Avatar, CardHeader } from "@mui/material";
import AnswerBox from "../AnswerBox/AnswerBox";
import useAuth from "../../../hooks/useAuth";
import Answers from "../Answers/Answers";

const QuestionQuickView = () => {
  const { questionsId } = useParams();
  const { profile } = useAuth();

  const [questions, setQuestions] = useState([]);
  const [userData, setUserData] = useState({});
  const [answers, setAnswers] = useState([]);

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/answers");
  };

  useEffect(() => {
    fetch(`http://localhost:65000/question/${questionsId}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      });
  }, [questionsId]);

  useEffect(() => {
    fetch(`http://localhost:65000/users/${questions?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      });
  }, [questions?.email]);

  useEffect(() => {
    fetch(`http://localhost:65000/answers/${questions?._id}`)
      .then((res) => res.json())
      .then((data) => {
        setAnswers(data);
      });
  }, [questions?._id]);

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleGoBack}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={handleGoBack}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 md:grid-cols-12 lg:gap-x-8">
                    <div className="overflow-hidden sm:col-span-4 lg:col-span-5">
                      <CardHeader
                        className="bg-gray-100 rounded-lg"
                        avatar={
                          <NavLink to={`/profile/${userData?._id}`}>
                            <Avatar
                              alt=""
                              src={`data:image/png;base64,${userData?.profilePic}`}
                            />
                          </NavLink>
                        }
                        title={
                          <NavLink to={`/profile/${userData?._id}`}>
                            {userData?.firstName + " " + userData?.lastName}
                          </NavLink>
                        }
                        subheader={questions.date}
                      />

                      <blockquote class="block text-md font-medium text-black leading-normal mt-5">
                        {questions.question}
                      </blockquote>
                      <div className="mt-10">
                        {profile?.status == "physician" ? (
                          <AnswerBox
                            key={profile?._id}
                            profile={profile}
                            post={questions}
                          ></AnswerBox>
                        ) : (
                          <Alert severity="info">
                            Patients are not allowed to write answers.
                          </Alert>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-xl font-bold text-gray-900 sm:pr-12">
                        {answers.length} Answers
                      </h2>

                      <div className="mt-5 overflow-y-auto lg:h-96">
                        {answers.map((answer) => (
                          <Answers key={answer._id} answer={answer}></Answers>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default QuestionQuickView;
