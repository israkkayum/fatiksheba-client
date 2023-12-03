import React, { useEffect, useState } from "react";
import Blog from "../Blog/Blog";
import useAuth from "../../../hooks/useAuth";
import Skeleton from "../../Share/Skeleton/Skeleton";

const Blogs = () => {
  const { user, profile } = useAuth();
  const [blogsPost, setBlogsPost] = useState([]);

  useEffect(() => {
    fetch("http://localhost:65000/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogsPost(data);
      });
  }, [user.email]);

  return (
    <div>
      <div class="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        {blogsPost.length != 0 ? (
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {blogsPost.map((post) => (
              <Blog key={post._id} post={post} profile={profile}></Blog>
            ))}
          </div>
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
};

export default Blogs;
