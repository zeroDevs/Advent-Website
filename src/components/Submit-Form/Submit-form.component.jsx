import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  input: {
    margin: theme.spacing(2, 0),
  },
  statusMessage: {
    color: theme.palette.error.main,
    height: theme.spacing(8),
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function SubmitForm({ userName, handleClose }) {
  const [date, setDate] = useState('2019-12-01');
  const [url, setUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const classes = useStyles();

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    let body;
    try {
      body = JSON.stringify({ userName, url, date }); // TODO: update property names to match expected body on backend
    } catch (error) {
      setErrorMessage('Invalid input');
      return setIsLoading(false);
    }

    const submissionEndpoint = '/submit';
    const { isSuccessful, error } = await fetch(submissionEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' }, // TODO: add JWT here
      body,
    });

    if (isSuccessful) {
      handleClose();
    } else {
      setErrorMessage(error);
      setIsLoading(false);
    }
  };

  const handleUrlInputChange = event => setUrl(event.target.value);
  const handleDateChange = event => setDate(event.target.value);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={classes.statusMessage}>{errorMessage}</div>

        <TextField
          className={classes.input}
          label='Username'
          type='text'
          value={userName}
          disabled
          fullWidth
        />

        <TextField
          className={classes.input}
          label='Advent Challenge Date'
          type='date'
          value={date}
          onChange={handleDateChange}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />

        <TextField
          className={classes.input}
          label='Solution Url'
          type='text'
          value={url}
          onChange={handleUrlInputChange}
          fullWidth
        />
      </form>
      <Button
        variant='contained'
        color='secondary'
        onClick={handleSubmit}
        fullWidth
      >
        {isLoading ? (
          <CircularProgress color='secondary' size={25} />
        ) : (
          'Submit'
        )}
      </Button>
    </>
  );
}

SubmitForm.propTypes = {
  userName: PropTypes.string,
  isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default SubmitForm;
