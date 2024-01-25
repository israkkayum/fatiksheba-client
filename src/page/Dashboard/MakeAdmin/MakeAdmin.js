import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Alert,
  AlertTitle,
  Button,
  Chip,
  CircularProgress,
  Divider,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

//BootstrapDialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-container": {
    justifyContent: "center",
    alignItems: "flex-start",
  },
}));

// stack item custom css
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  backgroundColor: "rgba(0, 0, 0, .03)",
  textAlign: "center",
  marginLeft: 20,
  marginRight: 20,
  color: theme.palette.text.secondary,
}));

// table name and filter option
const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },

        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          List of Admins
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const MakeAdmin = ({ users }) => {
  const [email, setEmail] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [id, setId] = React.useState("");

  // handle on blur
  const handleOnBlur = (e) => {
    setEmail(e.target.value);
  };

  // add admin
  const handleAdminSubmit = (e) => {
    setIsLoading(true);

    const user = { email };
    fetch("http://localhost:65000/users/admin/add", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          setSuccess(true);
          setIsLoading(false);
          setFailure(false);
          e.target.reset();
        } else {
          setFailure(true);
          setIsLoading(false);
          setSuccess(false);
          e.target.reset();
        }
      });

    e.preventDefault();
  };

  // remove admin
  const handleAdminRemove = (id) => {
    const user = { id };

    fetch("http://localhost:65000/users/admin/remove", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          window.location.reload();
        }
      });
  };

  // modal open
  const handleDeleteOpen = (id) => {
    setOpenDelete(true);
    setId(id);
  };

  // modal close
  const handleClose = () => {
    setOpenDelete(false);
  };

  return (
    <div>
      {/* --------- */}

      <div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={openDelete}
        >
          <DialogContent dividers>
            <Alert severity="warning" sx={{ lineHeight: "1.5", mb: 2 }}>
              <AlertTitle>Warning</AlertTitle>
              Are you sure, you want to Remove this admin. If you do it, this
              admin will be remove from admin list !
              <p>
                For confirm please type <strong>'Secrete'</strong> word.
              </p>
            </Alert>
            <Divider sx={{ mb: 2 }} />
            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Type Secrete Word"
                  id="fullWidth"
                  onChange={(e) => {
                    if (e.target.value == "sabbir") {
                      setDisabled(false);
                    } else {
                      setDisabled(true);
                    }
                  }}
                />
                <Button
                  sx={{
                    backgroundColor: "blue",
                    px: 4,
                    py: 2,
                    ml: -0.3,
                    borderRadius: "0px 5px 5px 0px",
                  }}
                  variant="contained"
                  disabled={disabled}
                  onClick={() => handleAdminRemove(id)}
                >
                  Confirm
                </Button>
              </Box>
            )}
          </DialogContent>
        </BootstrapDialog>
      </div>

      {/* ------------ */}

      <form onSubmit={handleAdminSubmit}>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={"medium"}
              >
                <TableBody>
                  <Box sx={{ width: "100%", my: 3 }}>
                    <Stack spacing={2}>
                      {users.map(
                        (row) =>
                          row.role == "admin" && (
                            <div>
                              <Item
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                  alignItems: "center",
                                }}
                              >
                                <Typography>
                                  {row.firstName + " " + row.lastName}
                                </Typography>
                                <Typography>{row.email}</Typography>
                                <Typography>{row.status}</Typography>
                                <Chip
                                  label="Remove"
                                  sx={{
                                    backgroundColor: "red",
                                    color: "white",
                                    mr: 2,
                                  }}
                                  size="small"
                                  onClick={() => handleDeleteOpen(row.email)}
                                />
                              </Item>
                            </div>
                          )
                      )}
                    </Stack>
                  </Box>
                  <Box sx={{ m: 5 }}>
                    {success && (
                      <Alert severity="success">Made Admin successfully!</Alert>
                    )}
                    {failure && (
                      <Alert severity="warning">
                        Sorry!! The User Not Found
                      </Alert>
                    )}
                  </Box>
                  <Stack
                    spacing={1}
                    direction="row"
                    sx={{
                      p: 5,
                    }}
                  >
                    <TextField
                      sx={{ width: "70%" }}
                      label="Type Email"
                      id="fullWidth"
                      required
                      type="email"
                      onBlur={handleOnBlur}
                    />
                    {isLoading ? (
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      <Button
                        type="submit"
                        sx={{ px: 5, width: "30%" }}
                        variant="outlined"
                      >
                        Make Admin
                      </Button>
                    )}
                  </Stack>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </form>
    </div>
  );
};

export default MakeAdmin;
