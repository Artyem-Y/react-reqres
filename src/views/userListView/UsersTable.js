import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {Avatar, Box} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SendTextForm from "./UserForm";
import {getComparator, stableSort} from "../../utils/sort";
import { fetchUsers } from '../../store/actions/users';
import getUsers from '../../store/selectors/users';
import EnhancedTableHead from "./Header";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  title: {
    flex: '1 1 100%',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  avatar_name: {
    padding: '0 15px'
  }
}));

export const ListUsers = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [selected, setSelected] = useState([]);
  const [page] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const { users } = useSelector(getUsers);
  const page1 = JSON.parse(localStorage.getItem('page1'));
  const page2 = JSON.parse(localStorage.getItem('page2'));

  if (page1 && page1.length !== 0 && users?.page === 1) {
    users.data = page1;
  }
  if (page2 && page2.length !== 0 && users?.page === 2) {
    users.data = page2;
  }

  if (users?.page) {
    localStorage.setItem(`page${users?.page}`, JSON.stringify(users?.data));
  }

  const loadUsers = (p) => {
    dispatch(
      fetchUsers({page: p})
    );
  };

  useEffect(() => {
    loadUsers(page + 1);
  }, []);

  const handleLimitChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handlePageChange = async (event, newPage) => {
    if (newPage > Math.ceil(users.total / rowsPerPage) - 1) return;
    await loadUsers(newPage + 1);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users?.data?.map((n) => n.email);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, email) => {
    const selectedIndex = selected.indexOf(email);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, email);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selected && selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const navigate = useNavigate();
  const edit = (e, row) => {
    navigate(`/app/users/${row.id}/edit`,  { state: {row, page: users?.page} });
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.data.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Users
        </Typography>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected?.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={users?.data?.length}
            />
            {users?.data && <TableBody>
              {stableSort(users?.data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.email);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      key={row.email}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, row.email)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.email}
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <a target="_blank" rel="noreferrer" href={row?.avatar || ''}>
                            <Avatar src={row?.avatar}/>
                          </a>
                          <Typography color="textPrimary" variant="body1" className={classes.avatar_name}>
                            {row.first_name}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell align="right">{row.id}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.first_name}</TableCell>
                      <TableCell>{row.last_name}</TableCell>
                      <TableCell>
                        <Button variant="contained"
                                color="primary"
                                onClick={(event) => edit(event, row)}>Edit</Button>
                      </TableCell>

                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>}
          </Table>
        </TableContainer>
        {users?.total && (
          <TablePagination
            component="div"
            count={users.total}
            page={users.page - 1}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[]}
            labelDisplayedRows={({from}) => {
              return `${from}-${(users.page - 1) * rowsPerPage + rowsPerPage} of ${users.total}`;
            }}
          />
        )}
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      <SendTextForm numSelected={selected?.length} selected={selected} />
    </div>
  );
};

export default ListUsers;
