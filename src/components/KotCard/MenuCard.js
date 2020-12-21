import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function ContainedButtons({ title, color, onClick }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color={color}
        size="Large"
        onClick={() => onClick(title)}
      >
        {title}
      </Button>
    </div>
  );
}
