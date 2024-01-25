import React, { useEffect, useState } from "react";
import Pulse from "../../Share/Pulse/Pulse";
import { NavLink } from "react-router-dom";

const Blog = ({ post }) => {
  const { coverPhoto, email, title, date, description, category } = post;
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:65000/users/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      });
  }, [email]);

  return (
    <>
      <article
        key={post.id}
        className="flex max-w-xl flex-col items-start justify-between"
      >
        <div className="pb-8">
          <img
            alt="banner"
            src={`data:image/png;base64,${coverPhoto}`}
            className="h-48 w-screen"
          />
        </div>
        <div className="flex items-center gap-x-4 text-xs">
          <time dateTime={date} className="text-gray-500">
            {date}
          </time>
          <NavLink
            // href={post.category.href}
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            {category}
          </NavLink>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <NavLink to={`${post._id}`}>
              <span className="absolute inset-0" />
              {title}
            </NavLink>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
            {description}
          </p>
        </div>
        {userData.email ? (
          <div className="relative mt-8 flex items-center gap-x-4">
            <img
              src={`data:image/png;base64,${userData.profilePic}`}
              alt=""
              className="h-10 w-10 rounded-full bg-gray-50"
            />

            <div className="text-sm leading-6">
              <p className="font-semibold text-gray-900">
                <NavLink to={`/profile/${userData._id}`}>
                  <span className="absolute inset-0" />
                  {userData.firstName + " " + userData.lastName}
                </NavLink>
              </p>
              <p className="text-gray-600">{userData.specialist}</p>
            </div>
          </div>
        ) : (
          <Pulse />
        )}
      </article>
    </>
  );
};

export default Blog;
