import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import PatientProfile from "../PatientProfile/PatientProfile";
import Skeleton from "../../Share/Skeleton/Skeleton";
import useAuth from "../../../hooks/useAuth";

const ProfileHome = () => {
  const { profileId } = useParams();
  const { user } = useAuth();

  const [profileData, setProfileData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:65000/profile/${profileId}`)
      .then((res) => res.json())
      .then((data) => {
        setProfileData(data);
      });
  }, [profileId]);

  useEffect(() => {
    fetch(`http://localhost:65000/questions/${profileData?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      });
  }, [profileData?.email]);

  useEffect(() => {
    fetch(`http://localhost:65000/problems/${profileData?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setProblems(data);
      });
  }, [profileData?.email]);

  return (
    <div>
      <Container maxWidth="lg" sx={{ py: 10 }}>
        {profileData?.email ? (
          <div>
            {!profileData?.email == user.email ? (
              <div>fgf</div>
            ) : (
              <div>
                {profileData?.status == "patient" ? (
                  <PatientProfile
                    key={profileData._id}
                    profileData={profileData}
                    questions={questions}
                    problems={problems}
                  />
                ) : (
                  <div>physician</div>
                )}
              </div>
            )}
          </div>
        ) : (
          <Skeleton />
        )}
      </Container>
    </div>
  );
};

export default ProfileHome;
