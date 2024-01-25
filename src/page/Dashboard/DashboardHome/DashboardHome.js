import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import Patients from "../Patients/Patients";
import useAuth from "../../../hooks/useAuth";
import Physicians from "../Physicians/Physicians";
import MakeAdmin from "../MakeAdmin/MakeAdmin";
import Questions from "../Questions/Questions";
import Problems from "../Problems/Problems";
import Blogs from "../Blogs/Blogs";

// tab panel

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
        <Box sx={{ p: 3 }}>
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

const DashboardHome = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [physicians, setPhysicians] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [problems, setProblems] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:65000/users")
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data);
      });
  }, [user?.email]);

  useEffect(() => {
    fetch("http://localhost:65000/patients")
      .then((res) => res.json())
      .then((data) => {
        setPatients(data);
      });
  }, [user?.email]);

  useEffect(() => {
    fetch("http://localhost:65000/physicians")
      .then((res) => res.json())
      .then((data) => {
        setPhysicians(data);
      });
  }, [user?.email]);

  useEffect(() => {
    fetch("http://localhost:65000/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      });
  }, [user?.email]);

  useEffect(() => {
    fetch("http://localhost:65000/problems")
      .then((res) => res.json())
      .then((data) => {
        setProblems(data);
      });
  }, [user?.email]);

  useEffect(() => {
    fetch("http://localhost:65000/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
      });
  }, [user?.email]);

  const handleAdminStatus = (id, approval) => {
    setIsLoading(true);
    const status = { approval: approval };

    fetch(`http://localhost:65000/physician/approval/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(status),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        window.location.reload();
      });
  };

  const [value, setValue] = React.useState(0);
  // handleChange for tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Container maxWidth="xl" sx={{ py: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={3.5}>
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
              <Paper elevation={3}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "blue",
                    color: "white",
                    borderRadius: "5px 5px 0px 0px",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    fontSize: "30px",
                  }}
                >
                  <h1>Admin Panel</h1>
                </div>

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
                  >
                    {/* All Patients */}

                    <Tab
                      style={{
                        fontWeight: "bold",
                        fontSize: "15px",
                        display: "flow",
                        justifyContent: "left",
                        textAlign: "left",
                        marginTop: "-5px",
                        marginBottom: "-5px",
                      }}
                      {...a11yProps(0)}
                      iconPosition="start"
                      icon={<Diversity1Icon sx={{ pr: 5, fontSize: "65px" }} />}
                      label="Patients"
                    />

                    {/* All Physicians */}

                    <Tab
                      style={{
                        fontWeight: "bold",
                        fontSize: "15px",
                        display: "flow",
                        justifyContent: "left",
                        textAlign: "left",
                        marginTop: "-5px",
                        marginBottom: "-5px",
                      }}
                      icon={<Diversity2Icon sx={{ pr: 5, fontSize: "65px" }} />}
                      iconPosition="start"
                      label="Physicians"
                      {...a11yProps(1)}
                    />

                    {/* Share Problems  */}

                    <Tab
                      style={{
                        fontWeight: "bold",
                        fontSize: "15px",
                        display: "flow",
                        justifyContent: "left",
                        textAlign: "left",
                        marginTop: "-5px",
                        marginBottom: "-5px",
                        lineHeight: "2",
                      }}
                      icon={<AddToQueueIcon sx={{ pr: 5, fontSize: "65px" }} />}
                      iconPosition="start"
                      label="Share Problems"
                      {...a11yProps(2)}
                    />

                    {/* Questions  */}

                    <Tab
                      style={{
                        fontWeight: "bold",
                        fontSize: "15px",
                        display: "flow",
                        justifyContent: "left",
                        textAlign: "left",
                        marginTop: "-5px",
                        marginBottom: "-5px",
                      }}
                      icon={
                        <QuestionMarkIcon sx={{ pr: 5, fontSize: "65px" }} />
                      }
                      iconPosition="start"
                      label="Questions"
                      {...a11yProps(3)}
                    />

                    {/* Blogs  */}

                    <Tab
                      style={{
                        fontWeight: "bold",
                        fontSize: "15px",
                        display: "flow",
                        justifyContent: "left",
                        textAlign: "left",
                        marginTop: "-5px",
                        marginBottom: "-5px",
                      }}
                      icon={<ViewModuleIcon sx={{ pr: 5, fontSize: "65px" }} />}
                      iconPosition="start"
                      label="Blogs"
                      {...a11yProps(4)}
                    />

                    {/* Make Admin */}

                    <Tab
                      style={{
                        fontWeight: "bold",
                        fontSize: "15px",
                        display: "flow",
                        justifyContent: "left",
                        textAlign: "left",
                        marginTop: "-5px",
                        marginBottom: "-5px",
                      }}
                      icon={
                        <AdminPanelSettingsIcon
                          sx={{ pr: 5, fontSize: "65px" }}
                        />
                      }
                      iconPosition="start"
                      label="Make Admin"
                      {...a11yProps(5)}
                    />
                  </Tabs>
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={8.5}>
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
              <Paper elevation={3}>
                {/* All patients */}

                <TabPanel value={value} index={0}>
                  <Patients patients={patients} setPatients={setPatients} />
                </TabPanel>

                {/* Manage Physicians */}

                <TabPanel value={value} index={1}>
                  <Physicians
                    physicians={physicians}
                    isLoading={isLoading}
                    handleAdminStatus={handleAdminStatus}
                    // handleRemoveBiodata={handleRemoveBiodata}
                  ></Physicians>
                </TabPanel>

                {/* problems */}

                <TabPanel value={value} index={2}>
                  <Problems problems={problems}></Problems>
                </TabPanel>

                {/* Questions */}

                <TabPanel value={value} index={3}>
                  <Questions questions={questions}></Questions>
                </TabPanel>

                {/* Blogs */}

                <TabPanel value={value} index={4}>
                  <Blogs blogs={blogs}></Blogs>
                </TabPanel>

                {/* Make Admin */}

                <TabPanel value={value} index={5}>
                  <MakeAdmin users={allUsers}></MakeAdmin>
                </TabPanel>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default DashboardHome;
