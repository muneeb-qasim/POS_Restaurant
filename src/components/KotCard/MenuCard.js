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

export default function ContainedButtons({ title,price,count, color,productChildID, onClick }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color={color}
        size="Large"
        onClick={() => onClick(title,price,count,productChildID)}
      >
        {title}
      </Button>
    </div>
  );
}
