import { Box, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import Skeleton from "../../Share/Skeleton/Skeleton";
import Questions from "../Questions/Questions";
import Post from "../../Home/Post/Post";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PatientProfile = ({ profileData, questions, problems }) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div class="md:flex">
          <div class="md:shrink-0">
            <img
              class="h-full w-full object-cover md:h-full md:w-56"
              src={`data:image/png;base64,${profileData?.profilePic}`}
              alt="profile pic"
            />
          </div>
          <div class="p-8">
            <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              @{profileData.status}
            </div>
            <span class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
              {profileData.firstName + " " + profileData.lastName}
            </span>
            <p class="mt-4">
              <ul className="divide-y divide-gray-100">
                <li className="flex justify-start gap-x-24 py-3">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        Email
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {profileData.email}
                      </span>
                    </p>
                  </div>
                </li>
                <li className="flex justify-start gap-x-6 py-3">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        Contact Number
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {profileData.phoneNumber}
                      </span>
                    </p>
                  </div>
                </li>
                <li className="flex justify-start gap-x-20 py-3">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        Address
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {profileData.city + ", " + profileData.country}
                      </span>
                    </p>
                  </div>
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>
      <Grid container spacing={2} sx={{ marginTop: "20px" }}>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: "100%",
                height: "100%",
              },
            }}
          >
            <Paper elevation={1}>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                  padding: "25px",
                  textAlign: "left",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  orientation="vertical"
                  sx={{
                    width: "100%",
                  }}
                  // TabIndicatorProps={{
                  //   style: {
                  //     // display: "none",
                  //     // width: "100%",
                  //     backgroundColor: "blue",
                  //     borderRadius: "10px",
                  //   },
                  // }}
                >
                  {/* Questions  */}

                  <Tab
                    style={{
                      fontWeight: "bold",
                      fontSize: "15px",
                      display: "flow",
                      justifyContent: "left",
                      textAlign: "left",
                      // marginTop: "-5px",
                      // marginBottom: "-5px",
                    }}
                    {...a11yProps(0)}
                    iconPosition="start"
                    // icon={
                    //   <UserIcon className="h-11 w-11 pr-5" aria-hidden="true" />
                    // }
                    label="Questions"
                  />

                  {/* Problems */}

                  <Tab
                    style={{
                      fontWeight: "bold",
                      fontSize: "15px",
                      display: "flow",
                      justifyContent: "left",
                      textAlign: "left",
                      // marginTop: "-5px",
                      // marginBottom: "-5px",
                      lineHeight: 2,
                    }}
                    // icon={
                    //   <InformationCircleIcon
                    //     className="h-11 w-11 pr-5"
                    //     aria-hidden="true"
                    //   />
                    // }
                    iconPosition="start"
                    label="Problems"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: "100%",
                height: "100%",
              },
            }}
          >
            {/* <Paper elevation={1}> */}
            {/* Questions */}

            <TabPanel value={value} index={0}>
              {questions.length !== 0 ? (
                <>
                  {questions.map((question) => (
                    <Questions
                      key={question._id}
                      post={question}
                      profileData={profileData}
                    ></Questions>
                  ))}
                </>
              ) : (
                <Skeleton />
              )}
            </TabPanel>

            {/* Problems */}

            <TabPanel value={value} index={1}>
              {problems.length !== 0 ? (
                <>
                  {problems.map((problem) => (
                    <Post
                      key={problem._id}
                      post={problem}
                      profileData={profileData}
                    ></Post>
                  ))}
                </>
              ) : (
                <Skeleton />
              )}
            </TabPanel>
            {/* </Paper> */}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default PatientProfile;
