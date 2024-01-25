import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Badge from "@mui/material/Badge";
import { Alert, Stack } from "@mui/material";
import CommentBox from "../CommentBox/CommentBox";
import Comments from "../Comments/Comments";
import { NavLink } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Post = ({ post, profile }) => {
  const { image, email, date, description } = post;
  const [userData, setUserData] = useState({});
  const [comments, setComments] = useState([]);

  const [expandedOne, setExpandedOne] = useState(false);
  const [expandedTwo, setExpandedTwo] = useState(false);

  const handleExpandOneClick = () => {
    setExpandedOne(!expandedOne);
    setExpandedTwo(false);
  };
  const handleExpandTwoClick = () => {
    setExpandedTwo(!expandedTwo);
    setExpandedOne(false);
  };

  useEffect(() => {
    fetch(`http://localhost:65000/users/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      });
  }, [email]);

  useEffect(() => {
    fetch(`http://localhost:65000/problem-comments/${post?._id}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });
  }, [post?._id]);

  return (
    <>
      <Card sx={{ width: "100%", marginBottom: "20px" }}>
        <CardHeader
          avatar={
            <Stack direction="row" spacing={2}>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <NavLink to={`/profile/${userData._id}`}>
                  <Avatar
                    alt=""
                    src={`data:image/png;base64,${userData?.profilePic}`}
                  />
                </NavLink>
              </StyledBadge>
            </Stack>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <NavLink to={`/profile/${userData._id}`}>
              {userData?.firstName + " " + userData?.lastName}
            </NavLink>
          }
          subheader={date}
        />
        <NavLink to={`${post._id}`}>
          <CardMedia
            component="img"
            height="194"
            src={`data:image/png;base64,${image}`}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </NavLink>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <span class="hover:bg-gray-100 text-gray-600 text-sm font-medium inline-flex items-center px-10 py-2 rounded me-2 hover:dark:bg-gray-700 dark:text-gray-400 cursor-pointer">
            <svg
              class="w-4 h-4 me-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z"
              ></path>
            </svg>
            Share
          </span>
          <span
            class="hover:bg-gray-100 text-gray-600 text-sm font-medium inline-flex items-center px-10 py-2 rounded me-2 hover:dark:bg-gray-700 dark:text-gray-400 cursor-pointer"
            expand={expandedOne}
            onClick={handleExpandOneClick}
            aria-expanded={expandedOne}
            aria-label="show more"
          >
            <svg
              class="w-4 h-4 me-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97-1.94.284-3.916.455-5.922.505a.39.39 0 00-.266.112L8.78 21.53A.75.75 0 017.5 21v-3.955a48.842 48.842 0 01-2.652-.316c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z"
              ></path>
            </svg>
            Comments
          </span>
          <span
            class="hover:bg-gray-100 text-gray-600 text-sm font-medium inline-flex items-center px-10 py-2 rounded me-2 hover:dark:bg-gray-700 dark:text-gray-400 cursor-pointer"
            expand={expandedTwo}
            onClick={handleExpandTwoClick}
            aria-expanded={expandedTwo}
            aria-label="show more"
          >
            <svg
              class="w-4 h-4 me-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"></path>
              <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"></path>
            </svg>
            Comments
          </span>
        </CardActions>
        <Collapse in={expandedOne} timeout="auto" unmountOnExit>
          <CardContent>
            {comments.map((comment) => (
              <Comments key={comment._id} comment={comment}></Comments>
            ))}
          </CardContent>
        </Collapse>
        <Collapse in={expandedTwo} timeout="auto" unmountOnExit>
          <CardContent>
            {profile?.status == "physician" ? (
              <CommentBox
                key={profile._id}
                profile={profile}
                post={post}
              ></CommentBox>
            ) : (
              <Alert severity="info">
                Patients are not allowed to post comments.
              </Alert>
            )}
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};

export default Post;
