import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import MenuCard from '../components/KotCard/MenuCard';
import Button from '@material-ui/core/Button';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import NewTableCard from '../components/KotCard/NewTableCard.js';
import OrderKotApi from '../api/Order';
import ArrowBack from '@material-ui/icons/ArrowBack';

import ButtonMain from 'components/CustomButtons/Button.js';
import { useHistory} from 'react-router-dom';
import {
  whiteColor,
  grayColor,
} from 'assets/jss/material-dashboard-react.js';
import Alert from '@material-ui/lab/Alert';

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
  bill: {
    margin: '5%',
  },
}));

//const tableData = [["1", "Veg Manchurian", "12345", "12", "1 USD", "+"]];

export default function VerticalTabs(props) {
  const classes = useStyles();

  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const [menuItem, setMenuItem] = React.useState([]);
  const [category, setCategory] = React.useState();
  const [itemCat, setItemCat] = React.useState();
  const [decrement, setDecrement] = React.useState(false);
  const [increment, setIncrement] = React.useState(false);
  const [remove, setRemove] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');
  const [waiterList, setWaiterList] = React.useState();
  const [currentObject, setCurrentObject] = React.useState();
  const {TableName} = props.location.state;
  const [error1, setError1] = React.useState(false);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('jwt');
      const bearerToken = 'Bearer ' + token;
      const result = await OrderKotApi.getCategory(bearerToken);
      const resultWaiter = await OrderKotApi.getKot(bearerToken);
      console.log(result.data);
      setCategory(result.data);
      setWaiterList(resultWaiter.data);

      if (increment) {
        console.log('Increment', increment);
        handleIncrement();
      }
      if (decrement) {
        handleDecrement();
      }
      if (remove) {
        handleRemove();
      }
    })();
  }, [increment, decrement, remove]);
  //====================================================
  const handleIncrement = () => {
    console.log('in COt', increment);
    const foundPrice = itemCat.find((o) => o.itemCode === currentObject[1]);
    const found = menuItem.findIndex((o) => o === currentObject);
    console.log('Curr', currentObject[1], foundPrice);
    const actualPrice = foundPrice.mrp;
    menuItem[found][2] = 1 + menuItem[found][2];
    menuItem[found][3] = menuItem[found][3] + actualPrice;
    setMenuItem(menuItem);
    console.log('menuItem[found][3] ', menuItem[found][3]);
    setIncrement(false);
  };
  //====================================================
  const handleRemove = () => {
    console.log('in handleRemove', remove);
    const found = menuItem.filter((o) => o !== currentObject);
    setMenuItem(() => found);
    setRemove(false);
  };
  //=====================================================
  const handleDecrement = () => {
    console.log('in Decrement', decrement);
    const foundPrice = itemCat.find((o) => o.itemCode === currentObject[1]);
    const found = menuItem.findIndex((o) => o == currentObject);
    const actualPrice = foundPrice.mrp;
    if (menuItem[found][2] > 1 && actualPrice > 1) {
      menuItem[found][2] = menuItem[found][2] - 1;
      menuItem[found][3] = menuItem[found][3] - actualPrice;
      setMenuItem(menuItem);
      setDecrement(false);
    }
  };
  //=========================================================
  const handleChanges = (event) => {
    setAge(Number(event.target.value) || '');
  };
  //========================================================
  const handleClickOpen = () => {
    setOpen(true);
  };
  //============================================================
  const handleClose = () => {
    setOpen(false);
  };
  //============================================================
  const objCreation = (sl, itemcode, qty, price, childId) => {
    const objItem = {
      productChildID: childId,
      itemCode: itemcode,
      itemName: '',
      qty: qty,
      rate: price,
      remarks: '',
    };
    return objItem;
  };
  //============================================================
  const handleSaveKot = async () => {
    if (menuItem.length > 0) {
      setError1(false);
      const arrItem = menuItem.map((e) =>
        objCreation(e[0], e[1], e[2], e[3], e[4])
      );
      const saveData = {
        itemList: [arrItem][0],
        tableName: TableName,
        person: 2,
        salesManID: 0,
      };
      const token = localStorage.getItem('jwt');
      const bearerToken = 'Bearer ' + token;
      const result = await OrderKotApi.saveKot(bearerToken, saveData);
      console.log(result);
      if (result.ok) {
        history.push('/NewOrder');
      }
    } else {
      setError1(true);
    }
  };

  //=======================================================
  const handleRemoveIcon = (curr) => {
    console.log('Call Decrement', curr);
    setDecrement(true);
    setCurrentObject(curr);
  };
  //======================================================
  const handlePlusIcon = (curr) => {
    console.log('Call P,us', curr);
    setIncrement(true);
    setCurrentObject(curr);
  };
  //========================================================
  const handleDeleteIcon = (curr) => {
    console.log('Call Remove Delete', curr);
    setRemove(true);
    setCurrentObject(curr);
  };
  //=========================================================
  const handleChoose = async (title, price, count, childId) => {
    console.log('childId', childId);
    if (menuItem !== undefined) {
      const foundItem = menuItem.find((o) => o[1] == title);
      console.log('Fount ', foundItem);
      if (foundItem === undefined) {
        await setMenuItem(() =>
          menuItem.concat([[count, title, 1, price, childId]])
        );
      }
    }
  };

  //===========================================================
  const handleChange = async (event, newValue) => {
    const token = localStorage.getItem('jwt');
    const bearerToken = 'Bearer ' + token;
    setValue(newValue);
    const res = await OrderKotApi.getItem(bearerToken, newValue);
    setItemCat(res.data);
    console.log(newValue);
  };
  //============================================================
  let cont = 1;
  return (
    <div className={classes.bill}>
      <GridContainer className={classes.bill}>
        <GridItem xs={12} sm={12} md={12}>
          <ButtonMain
            onClick={() => history.push('/NewOrder')}
            color="danger"
            startIcon={<ArrowBack />}
          >
            Back
          </ButtonMain>
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
                  {category !== undefined
                    ? category.map((obj) => (
                        <Tab label={obj.categoryName} {...a11yProps(obj.id)} />
                      ))
                    : null}
                </Tabs>
                <TabPanel value={value} index={1} className={classes.tabPanel}>
                  <div className={classes.row}>
                    {itemCat !== undefined
                      ? itemCat.map((obj) => (
                          <MenuCard
                            title={obj.itemCode}
                            price={obj.mrp}
                            count={cont++}
                            productChildID={obj.productChildId}
                            color="secondary"
                            onClick={handleChoose}
                          />
                        ))
                      : null}
                  </div>

                  <NewTableCard
                    data={menuItem}
                    callBackIncrement={handlePlusIcon}
                    callBackDecrement={handleRemoveIcon}
                    callBackRemove={handleDeleteIcon}
                  />
                </TabPanel>
              </div>
            </CardBody>
            <CardFooter>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
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
                                  <option value={obj.id}>
                                    {obj.waiterName}
                                  </option>
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
                    onClick={handleSaveKot}
                  >
                    Save & Print{' '}
                  </Button>

                  {error1 && (
                    <Alert severity="warning">Please Add Item in List!</Alert>
                  )}
                </GridItem>
              </GridContainer>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
