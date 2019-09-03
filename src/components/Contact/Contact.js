import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(3, 2),
    marginTop: 10,
    marginBottom: 10,
  },
}));

const Contact = ({ data, odd }) => {
  const classes = useStyles();
  const styles = odd ? {backgroundColor: grey[200]} : {};

  return (
    <Card className={classes.card} style={{...styles}} >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={data.picture.thumbnail} />
        }
        title={`${data.name.title} ${data.name.first} ${data.name.last}`}
        subheader={data.email}
      />
    </Card>
  );
};

export default Contact;
