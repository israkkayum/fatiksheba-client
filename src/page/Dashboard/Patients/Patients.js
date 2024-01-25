import React from "react";
// file import from mui
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Chip } from "@mui/material";
import { NavLink } from "react-router-dom";

// Table head cells data
const headCells = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "contact",
    label: "Contact Email",
  },
  {
    id: "phone",
    label: "Contact Number",
  },
  {
    id: "profile",
    label: "Profile",
  },
  {
    id: "action",
    label: "Action",
  },
];

// Table head function
function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={"left"} padding={"normal"}>
            <Box sx={{ fontWeight: "bold" }}>
              {/* Table header */}

              {headCell.label}
            </Box>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// set table name and filter option in table head

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
          All Patients
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

const Patients = ({ patients, setPatients }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //arow function for pagination

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - patients.length) : 0;
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead rowCount={patients.length} />
              <TableBody>
                {patients
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="normal"
                        >
                          {/* body row name  */}
                          <NavLink to={`/profile/${row._id}`} target="_blank">
                            {row.firstName + " " + row.lastName}
                          </NavLink>
                        </TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.phoneNumber}</TableCell>

                        <TableCell align="left">
                          {row.phoneNumber ? (
                            <Chip
                              label="completed"
                              sx={{ backgroundColor: "green", color: "white" }}
                              size="small"
                            />
                          ) : (
                            <Chip
                              label="incomplete"
                              sx={{ backgroundColor: "red", color: "white" }}
                              size="small"
                            />
                          )}
                        </TableCell>
                        <TableCell align="left">
                          {" "}
                          <Chip
                            label="Remove"
                            sx={{
                              backgroundColor: "red",
                              color: "white",
                            }}
                            size="small"
                            // onClick={() => handleDeleteOpen(row._id)}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}

                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {/* pagination  */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={patients.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>
  );
};

export default Patients;
