import TextField from "@material-ui/core/TextField";
import React, {useState} from "react";
import {Button, Paper, makeStyles} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import {post} from "../../utils/network";

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

export const SendTextForm = (props) => {
  const classes = useStyles();
  const [emailBody, setEmailBody] = useState("");
  const {selected} = props;

  const onTextChange = (e) => setEmailBody(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendEmail(selected)
  }

  const sendEmail = async (emails) => {
    try {
      await post('emails/send', { emails, emailBody });
    } catch (err) {
      console.error('load users error: ', err.message);
    }
  };

  return (
    <Paper>
      {selected?.length > 0 && (
        <Box maxWidth={600}>
          <h3 className={classes.title}>Send Email</h3>
          <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
              onChange={onTextChange}
              value={emailBody}
              label={"Enter text..."}
              inputProps={{
                maxLength: 120,
              }}
              required
            />

            <Button type="submit" variant="contained" color="primary">
              Send
            </Button>
          </form>
        </Box>)}
    </Paper>
  );
};

SendTextForm.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
