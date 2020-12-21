import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import MenuCard from "../components/KotCard/MenuCard";
import KotTable from "../components/KotCard/KotTable";
import Button from "@material-ui/core/Button";
import ReceiptOutlinedIcon from "@material-ui/icons/ReceiptOutlined";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import BrushOutlinedIcon from "@material-ui/icons/BrushOutlined";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import {
  successColor,
  whiteColor,
  grayColor,
  hexToRgb,
} from "assets/jss/material-dashboard-react.js";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "100%",
    width: "100%",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabPanel: {
    width: "100%",
    height: "100%",
  },

  cardTitle: {
    color: grayColor[2],
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  cardTitleWhite: {
    color: whiteColor,
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
}));

const subMenu = [
  {
    title: "Veg Manchurian",
    color: "secondary",
  },
  {
    title: "Paneer Chilli",
    color: "primary",
  },
  {
    title: "Hakka Noodle",
    color: "warning",
  },
];
//const tableData = [["1", "Veg Manchurian", "12345", "12", "1 USD", "+"]];

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [menuItem, setMenuItem] = React.useState([]);
  const [submenu, setSubMenu] = React.useState(subMenu);
  const [currentValue, setCurrentValue] = React.useState([]);
  const [decrement, setDecrement] = React.useState(false);
  const [increment, setIncrement] = React.useState(false);
  let curr = null;

  const callBack = async (obj) => {
    console.log("Obj Call Back", obj);
    if (obj != undefined) {
      curr = obj;
      setCurrentValue(obj);
    }
    console.log("Decrement State", decrement);
    if (decrement) {
      const found = menuItem.findIndex((o) => o == curr);
      console.log("Found Element", found);
      menuItem[found][2] = menuItem[found][2] - 1;
      setMenuItem(() => menuItem);
      console.log("Found Decrement Element", menuItem[found][2] - 1);
      setDecrement(false);
    }

    if (increment) {
      const found = menuItem.findIndex((o) => o == curr);
      console.log("Found Element", found);
      menuItem[found][2] = menuItem[found][2] + 1;
      setMenuItem(() => menuItem);
      console.log("Found  Increment Element", menuItem[found][2] + 1);
      setIncrement(false);
    }
  };

  const Icon = () => (
    <div>
      <Button
        size="small"
        color="primary"
        startIcon={<RemoveOutlinedIcon />}
        onClick={handleRemoveIcon}
      ></Button>
      <Button
        size="small"
        color="primary"
        startIcon={<AddCircleRoundedIcon />}
        onClick={handlePlusIcon}
      ></Button>
    </div>
  );

  const handleRemoveIcon = () => {
    setDecrement(true);
  };
  const handlePlusIcon = () => {
    setIncrement(true);
  };

  const handleChoose = async (title) => {
    console.log("Handle Click ", title);

    await setMenuItem(() =>
      menuItem.concat([["2", title, 3, "4535USD", Icon()]])
    );
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <GridContainer className={classes.bill}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="warning">
            <h4 className={classes.cardTitleWhite}>Kot Screen</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>

          <CardBody>
            <div className={classes.root}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
              >
                <Tab label="Chinese" {...a11yProps(0)} />
                <Tab label="Tandoor" {...a11yProps(1)} />
                <Tab label="Soup" {...a11yProps(2)} />
                <Tab label="Starter" {...a11yProps(3)} />
              </Tabs>
              <TabPanel value={value} index={0} className={classes.tabPanel}>
                <div className={classes.row}>
                  {submenu.map((obj) => (
                    <MenuCard
                      title={obj.title}
                      color={obj.color}
                      onClick={handleChoose}
                    />
                  ))}
                </div>
                {console.log("Kot Table", menuItem)}
                <KotTable data={menuItem} callBack={callBack} />
              </TabPanel>
              <TabPanel value={value} index={1} className={classes.tabPanel}>
                Item Two
              </TabPanel>
              <TabPanel value={value} index={2} className={classes.tabPanel}>
                Item Three
              </TabPanel>
              <TabPanel value={value} index={3} className={classes.tabPanel}>
                Item Four
              </TabPanel>
              <TabPanel value={value} index={4} className={classes.tabPanel}>
                Item Five
              </TabPanel>
              <TabPanel value={value} index={5}>
                Item Six
              </TabPanel>
              <TabPanel value={value} index={6}>
                Item Seven
              </TabPanel>
            </div>
          </CardBody>
          <CardFooter>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                {" "}
                <Button
                  color="secondary"
                  variant="contained"
                  startIcon={<ReceiptOutlinedIcon />}
                >
                  Select Waiter{" "}
                </Button>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<ReceiptOutlinedIcon />}
                >
                  Save & Print{" "}
                </Button>
              </GridItem>
            </GridContainer>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
