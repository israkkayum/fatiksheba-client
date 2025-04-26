import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Skeleton from "../../Share/Skeleton/Skeleton";
import useAuth from "../../../hooks/useAuth";
import CommentBox from "../CommentBox/CommentBox";
import Comments from "../Comments/Comments";

const BlogDetails = () => {
  const { profile } = useAuth();
  const { blogsId } = useParams();

  const [post, setPost] = useState({});
  const [userData, setUserData] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:65000/blog/${blogsId}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
      });
  }, [blogsId]);

  // console.log(post.description);

  useEffect(() => {
    fetch(`http://localhost:65000/users/${post.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      });
  }, [post.email]);

  useEffect(() => {
    fetch(`http://localhost:65000/blog-comments/${post?._id}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });
  }, [post?._id]);

  return (
    <>
      {userData?.email ? (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
          <article
            key={post.id}
            className="flex max-w-xl flex-col items-start justify-between"
          >
            <div className="pb-8">
              <img
                alt="banner"
                src={`data:image/png;base64,${post.coverPhoto}`}
                className="h-auto w-screen"
              />
            </div>
            <div className="flex items-center gap-x-4 text-xs">
              <time dateTime={post.date} className="text-gray-500">
                {post.date}
              </time>
              <NavLink
                // href={post.category.href}
                className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
              >
                {post.category}
              </NavLink>
            </div>
            <div className="group relative">
              <h3 className="mt-3 text-xl leading-relaxed font-bold text-gray-900">
                <span className="absolute inset-0" />
                {post.title}
              </h3>
              {post.description?.split("\n").map((paragraph, index) => (
                <p
                  className="mt-5 text-base leading-relaxed font-normal"
                  key={index}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="relative mt-8 flex items-center gap-x-4">
              <img
                src={`data:image/png;base64,${userData?.profilePic}`}
                alt=""
                className="h-10 w-10 rounded-full bg-gray-50"
              />

              <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900">
                  <NavLink to={`/profile/${userData._id}`}>
                    <span className="absolute inset-0" />
                    {userData?.firstName + " " + userData?.lastName}
                  </NavLink>
                </p>
                <p className="text-gray-600">{userData?.specialist}</p>
              </div>
            </div>
          </article>
          <div
            class="bg-gray-200 lg:w-full mt-20 mb-7"
            style={{ height: "1px" }}
          />

          <div>
            <CommentBox
              key={post._id}
              profile={profile}
              post={post}
            ></CommentBox>
          </div>
          <div className="mt-5">
            {comments.map((comment) => (
              <Comments key={comment._id} comment={comment}></Comments>
            ))}
          </div>
        </Container>
      ) : (
        <Skeleton />
      )}
    </>
  );
};

export default BlogDetails;
