import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Danger from 'components/Typography/Danger.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import MenuCard from '../components/KotCard/MenuCard';
import KotTable from '../components/KotCard/KotTable';
import Button from '@material-ui/core/Button';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import BrushOutlinedIcon from '@material-ui/icons/BrushOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import WaiterApi from '../api/Order';
import {
  successColor,
  whiteColor,
  grayColor,
  hexToRgb,
} from 'assets/jss/material-dashboard-react.js';

function TabPanel(props) {
  const {children, value, index, ...other} = props;

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
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
    width: '100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabPanel: {
    width: '100%',
    height: '100%',
  },
  stats: {
    color: grayColor[0],
    display: 'inline-flex',
    fontSize: '12px',
    lineHeight: '22px',
    '& svg': {
      top: '4px',
      width: '16px',
      height: '16px',
      position: 'relative',
      marginRight: '3px',
      marginLeft: '3px',
    },
    '& .fab,& .fas,& .far,& .fal,& .material-icons': {
      top: '4px',
      fontSize: '16px',
      position: 'relative',
      marginRight: '3px',
      marginLeft: '3px',
    },
  },
  cardCategory: {
    color: grayColor[0],
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    paddingTop: '10px',
    marginBottom: '0',
  },
  cardCategoryWhite: {
    color: 'rgba(' + hexToRgb(whiteColor) + ',.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitle: {
    color: grayColor[2],
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: grayColor[1],
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  cardTitleWhite: {
    color: whiteColor,
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: grayColor[1],
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));

const subMenu = [
  {
    title: 'Veg Manchurian',
    color: 'secondary',
  },
  {
    title: 'Paneer Chilli',
    color: 'primary',
  },
  {
    title: 'Hakka Noodle',
    color: 'warning',
  },
];
//const tableData = [["1", "Veg Manchurian", "12345", "12", "1 USD", "+"]];

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [menuItem, setMenuItem] = React.useState([]);
  const [submenu, setSubMenu] = React.useState(subMenu);
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');
  const [waiterList, setWaiterList] = React.useState();

  const handleRemoveIcon = (obj) => {
    console.log('Obj ', obj);
    setMenuItem(
      menuItem.filter((e) => {
        console.log('e ye ha s ', e[1]);
        return e[1] != obj;
      })
    );
  };
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('jwt');
      const bearerToken = 'Bearer ' + token;
      const result = await WaiterApi.getKot(bearerToken);
      console.log('Data', result.data);
      setWaiterList(result.data);
    })();
  }, []);
  const handleChanges = (event) => {
    setAge(Number(event.target.value) || '');
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const Icon = (obj) => (
    <div>
      <Button
        size="small"
        color="primary"
        startIcon={<RemoveOutlinedIcon />}
        onClick={(e) => handleRemoveIcon(obj)}
      ></Button>
      <Button
        size="small"
        color="primary"
        startIcon={<BrushOutlinedIcon />}
        onClick={(e) => console.log('Edit Pressing', obj)}
      ></Button>
    </div>
  );

  const handleChoose = async (title) => {
    console.log('Handle Click ', title);
    await setMenuItem(() =>
      menuItem.concat([['2', title, '4', '4535USD', Icon(title)]])
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
                <KotTable data={menuItem} />
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
                {' '}
                <Button
                  color="secondary"
                  variant="contained"
                  startIcon={<ReceiptOutlinedIcon />}
                  onClick={handleClickOpen}
                >
                  Select Waiter{' '}
                </Button>
                <Dialog
                  disableBackdropClick
                  disableEscapeKeyDown
                  open={open}
                  onClose={handleClose}
                >
                  <DialogTitle>Select Waiter</DialogTitle>
                  <DialogContent>
                    <form className={classes.container}>
                      <FormControl className="col-lg-12">
                        <InputLabel htmlFor="demo-dialog-native">
                          Waiter
                        </InputLabel>
                        <Select
                          native
                          value={age}
                          onChange={handleChanges}
                          input={<Input id="demo-dialog-native" />}
                        >
                          {waiterList !== undefined
                            ? waiterList.map((obj) => (
                                <option value={obj.id}>{obj.waiterName}</option>
                              ))
                            : null}
                        </Select>
                      </FormControl>
                    </form>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                      Ok
                    </Button>
                  </DialogActions>
                </Dialog>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<ReceiptOutlinedIcon />}
                >
                  Save & Print{' '}
                </Button>
              </GridItem>
            </GridContainer>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
