import TextField from "@material-ui/core/TextField";
import React, {useState} from "react";
import {Button, Paper, makeStyles} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {useLocation, useNavigate} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
  title: {
    flex: '1 1 100%',
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const UserEditFrom = () => {
  const classes = useStyles();
  const location = useLocation();
  const [firstName, setFirstName] = useState(location.state.row.first_name);
  const [lastName, setLastName] = useState(location.state.row.last_name);
  const [email, setEmail] = useState(location.state.row.email);

  const page1 = JSON.parse(localStorage.getItem('page1'));
  const page2 = JSON.parse(localStorage.getItem('page2'));
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      id: location.state.row.id,
      avatar: location.state.row.avatar,
      first_name: firstName,
      last_name: lastName,
      email
    };

    if (location.state.page === 1) {
      const objIndex = page1.findIndex((obj => obj.id === user.id));
      page1[objIndex] = user;
      localStorage.setItem('page1', JSON.stringify(page1));
    }

    if (location.state.page === 2) {
      const objIndex = page1.findIndex((obj => obj.id === user.id));
      page1[objIndex] = user;
      localStorage.setItem('page2', JSON.stringify(page2));
    }
    navigate('/app/users');
  };

  const back = () => {
    navigate('/app/users');
  };

  return (
    <Paper>
        <Box maxWidth={600}>
          <h3 className={classes.title}>Edit User</h3>
          <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
              value={firstName}
              inputProps={{
                maxLength: 120,
              }}
              required
              onChange={e => setFirstName(e.target.value)}
            />
            <TextField
              value={lastName}
              inputProps={{
                maxLength: 120,
              }}
              required
              onChange={e => setLastName(e.target.value)}
            />
            <TextField
              value={email}
              inputProps={{
                maxLength: 120,
              }}
              required
              onChange={e => setEmail(e.target.value)}
            />
            <div>
              <Button type="submit" variant="contained" color="primary">
                Edit
              </Button>
              <Button variant="contained"
                      color="primary"
                      onClick={() => back()}>Back to users</Button>
            </div>
          </form>
        </Box>
    </Paper>
  );
};

export default UserEditFrom;
