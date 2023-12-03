import React, { useState } from "react";

const CommentBox = ({ profile, post }) => {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const handleOnCommentSubmit = (e) => {
    setIsLoading(true);
    // collect data
    const allCommentData = {
      comment: comment,
      from: profile.email,
      to: post._id,
      date: new Date().toDateString(),
    };

    fetch("http://localhost:65000/blog-comment", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(allCommentData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
        setComment("");
      });

    e.preventDefault();
  };

  return (
    <div className="flex items-start space-x-4">
      <div className="mx-auto flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
        <div class="shrink-0">
          <img
            alt="profile-pic"
            class="h-9 w-9 rounded-full"
            src={`data:image/png;base64,${profile?.profilePic}`}
          />
        </div>
      </div>
      <form class="w-full" onSubmit={handleOnCommentSubmit}>
        <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label for="comment" class="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows="4"
              cols={4}
              class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Write a comment..."
              required
              onChange={(e) => {
                setComment(e.target.value);
              }}
              value={comment}
            ></textarea>
          </div>
          <div class="flex items-center justify-between px-3 py-1 border-t dark:border-gray-600">
            <div class="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
              <button
                type="button"
                class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 12 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                  />
                </svg>
                <span class="sr-only">Attach file</span>
              </button>
              <button
                type="button"
                class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                </svg>
                <span class="sr-only">Set location</span>
              </button>
              <button
                type="button"
                class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
                <span class="sr-only">Upload image</span>
              </button>
            </div>
            {isLoading ? (
              <button
                type="button"
                className="px-4 py-1 text-sm text-indigo-600 font-semibold rounded-md border border-indigo-200 hover:text-white hover:bg-indigo-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                disabled
              >
                Processing...
              </button>
            ) : (
              <button
                type="submit"
                className={
                  comment
                    ? "block rounded-md bg-indigo-600 px-4 py-1 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    : "block rounded-md bg-gray-400 px-4 py-1 text-center text-sm font-semibold text-white shadow-sm hover:bg-white-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                }
                disabled={comment && post._id && profile._id ? false : true}
              >
                Post
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentBox;
