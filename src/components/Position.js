import React from "react";

import moment from "moment";

// Router
import { Link } from "react-router-dom";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";

const styles = (theme) => ({
  ...theme.spreadThis,
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10,
  },
  divRoot: {
    margin: 20,
  },
  cardRoot: {
    width: 275,
    height: 275,
    padding: 20,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
function Position(props) {
  const {
    classes,
    position: {
      id,
      type,
      company,
      created_at,
      location,
      title,
      company_logo,
      url,
    },
  } = props;

  const bull = <span className={classes.bullet}>•</span>;
  return (
    <div className={classes.cardRoot}>
      <MuiLink component={Link} to={`/positions/${id}`}>
        <Paper className={"flex container column"}>
          <Avatar
            style={{
              marginLeft: "10px",
              marginTop: "-20px",
              backgroundColor: "lightgrey",
              borderRadius: "12px",
            }}
            alt={company}
            src={company_logo}
          />

          <div
            className="flex container column"
            style={{ padding: "20px", width: "auto" }}
          >
            <Typography color="textSecondary" gutterBottom>
              {moment(created_at, "ddd MMM DD h:mm:ss [UTC] YYYY")
                .utc()
                .fromNow()}
              {bull} {type}
            </Typography>

            <Typography variant="h5" gutterBottom>
              {title}
            </Typography>

            <Typography color="textSecondary">{company}</Typography>
            <Typography
              variant="body1"
              color="primary"
              style={{ marginTop: "auto" }}
              gutterBottom
            >
              {location}
            </Typography>
          </div>
        </Paper>
      </MuiLink>
    </div>
  );
}

export default withStyles(styles)(Position);
