import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { useNavigate, useParams } from "react-router-dom";
import { Alert, Avatar, CardHeader } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import Comments from "../Comments/Comments";
import CommentBox from "../CommentBox/CommentBox";

const PostQuickView = () => {
  const { problemsId } = useParams();
  const { profile } = useAuth();

  const [problems, setProblems] = useState([]);
  const [userData, setUserData] = useState({});
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/");
  };

  useEffect(() => {
    fetch(`http://localhost:65000/problem/${problemsId}`)
      .then((res) => res.json())
      .then((data) => {
        setProblems(data);
      });
  }, [problemsId]);

  useEffect(() => {
    fetch(`http://localhost:65000/users/${problems?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      });
  }, [problems?.email]);

  useEffect(() => {
    fetch(`http://localhost:65000/problem-comments/${problems?._id}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });
  }, [problems?._id]);

  // console.log(problems);

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
                    <div class="w-fit h-fit overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                      <img
                        src={`data:image/png;base64,${problems?.image}`}
                        alt="Two each of gray, white, and black shirts arranged on table."
                        class="object-cover h-fit w-fit"
                      />
                    </div>

                    <div className="sm:col-span-8 lg:col-span-7">
                      <CardHeader
                        className="bg-gray-100 rounded-lg mr-16"
                        avatar={
                          <Avatar
                            alt=""
                            src={`data:image/png;base64,${userData?.profilePic}`}
                          />
                        }
                        title={userData?.firstName + " " + userData?.lastName}
                        subheader={problems.date}
                      />

                      <blockquote class="block text-md font-medium text-black leading-normal mt-5">
                        {problems.description}
                      </blockquote>

                      <div className="mt-5 overflow-y-auto lg:h-96">
                        {comments.map((comment) => (
                          <Comments
                            key={comment._id}
                            comment={comment}
                          ></Comments>
                        ))}
                      </div>

                      <div className="mt-10">
                        {profile?.status == "physician" ? (
                          <CommentBox
                            key={profile?._id}
                            profile={profile}
                            post={problems}
                          ></CommentBox>
                        ) : (
                          <Alert severity="info">
                            Patients are not allowed to post comments.
                          </Alert>
                        )}
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

export default PostQuickView;
