import React from 'react';

// material stuffs
import {
  Card as MUICard,
  CardMedia,
  Typography,
  CardContent,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    maxWidth: 300,
    minHeight: 300,
    textAlign: 'center',
    position: 'relative',
  },
  cardMedia: {
    minHeight: 300,
  },
  linkToSolution: {
    border: '1px solid orange',
    display: 'inline-block',
    padding: '1rem',
    borderRadius: '0.3em',
  },
});

/**
 * Card component. Accepts a few params:
 * - `avatar_url`(optional)
 * - `username`(required)
 * - `date`:(required) date of submission. provide it as date string compitable for parsing using `new Date()`
 * - `day`:(required) day number(for example: 20 if the date is 20th nov)
 * - `solution_url`:(required) url to the solution
 */
export default function Card(props) {
  const { avatar_url, username, date, day, solution_url } = props;
  const classes = useStyles();

  // if (!username || !date || !day || !solution_url)
  //   throw new Error(`You've missed a prop in Card Component`);

  return (
    <>
      <MUICard className={classes.card}>
        <CardMedia
          style={{
            position: 'absolute',
            display: 'inline',
            height: '50px',
            width: '50px',
            background: 'blue',
            top: 10,
            left: 10,
            lineHeight: '50px', // keep it same as `height`
            borderRadius: '0.3em',
          }}
          image=''
        >
          <strong>{day || 1}</strong>
        </CardMedia>
        <CardMedia
          className={classes.cardMedia}
          image={avatar_url || 'https://www.ark-ir.org/images/img_avatar5.png'}
          title='Contemplative Reptile'
        />

        <CardContent>
          <Typography style={{ fontSize: '1.9em' }}>
            {username || 'notAnkur'}
          </Typography>
        </CardContent>

        <CardContent>
          <Typography className={classes.linkToSolution}>
            <Link
              href={solution_url}
              style={{ color: 'inherit', textDecoration: 'none' }}
              target='_blank'
            >
              Solution
            </Link>
          </Typography>
        </CardContent>

        <CardContent style={{ background: '#ffffff', color: '#424242' }}>
          <Typography>Submitted 11 Months Ago</Typography>
        </CardContent>
      </MUICard>
    </>
  );
}
