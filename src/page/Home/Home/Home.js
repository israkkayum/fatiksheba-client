import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import FindPhysician from "../FindPhysician/FindPhysician";
import useAuth from "../../../hooks/useAuth";
import CreatePost from "../CreatePost/CreatePostHome/CreatePostHome";
import HomeSkeleton from "../../Share/HomeSkeleton/HomeSkeleton";

const Home = () => {
  const { user, profile } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [problemsPost, setProblemsPost] = useState([]);

  useEffect(() => {
    fetch("http://localhost:65000/users")
      .then((res) => res.json())
      .then((data) => {
        setProfiles(data);
        setFilteredData(data);
      });
  }, [user.email]);

  useEffect(() => {
    fetch("http://localhost:65000/problems")
      .then((res) => res.json())
      .then((data) => {
        setProblemsPost(data);
      });
  }, [user.email]);

  return (
    <div class="bg-gray-100">
      <div class="container py-7 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-4 grid-cols-1 gap-10">
          <div class="lg:flex hidden bg-white p-2 rounded h-screen"></div>
          <div class="col-span-2">
            <CreatePost profile={profile}></CreatePost>
            {problemsPost.length != 0 ? (
              <>
                {problemsPost.map((post) => (
                  <Post key={post._id} post={post} profile={profile}></Post>
                ))}
              </>
            ) : (
              <HomeSkeleton />
            )}
          </div>
          <div class="lg:flex hidden bg-white p-2 rounded h-screen">
            <FindPhysician
              profiles={profiles}
              filteredData={filteredData}
              setFilteredData={setFilteredData}
            ></FindPhysician>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
