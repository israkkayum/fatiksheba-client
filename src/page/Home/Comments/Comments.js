import React, { useEffect, useState } from "react";

const Comments = ({ comment }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:65000/users/${comment?.from}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      });
  }, [comment?.from]);

  return (
    <div>
      <div class="p-2 mx-auto flex items-start space-x-4">
        <div class="shrink-0">
          <img
            class="h-8 w-8 rounded-full"
            src={`data:image/png;base64,${userData?.profilePic}`}
            alt="ChitChat Logo"
          />
        </div>
        <div className="bg-gray-100 rounded-md p-2">
          <div class="text-base font-medium text-black">
            {userData?.firstName + " " + userData?.lastName}
          </div>
          {comment.comment.split("\n").map((paragraph, index) => (
            <p class="text-slate-500 mb-3" key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
