import React, {useEffect, useState} from 'react';
// @material-ui/core components
import {makeStyles} from '@material-ui/core/styles';

// core components

import ButtonMain from 'components/CustomButtons/Button.js';
import ArrowBack from '@material-ui/icons/ArrowBack';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import Button from 'components/CustomButtons/Button.js';
import CardBody from 'components/Card/CardBody.js';
import TextField from '@material-ui/core/TextField';

import Alert from '@material-ui/lab/Alert';
import PayTable from '../components/KotCard/PayTable';
import MenuCard from '../components/KotCard/MenuCard';
import mopApi from '../api/Order';

import {Link, useHistory} from 'react-router-dom';
import {Table} from 'react-bootstrap';
const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'white',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
      fontWeight: '200',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',

    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    fontWeight: '400',
    textDecoration: 'none',
    fontSize: '22px',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  bill: {
    margin: '5%',
  },
  icons: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bill: {
    margin: '5%',
  },
};

const useStyles = makeStyles(styles);

export default function MakePayment(props) {
  const classes = useStyles();

  const history = useHistory();
  const [billData, setBillData] = useState();
  const [totAmount, setTotAmount] = useState(0);
  const [pay1, setPay1] = useState(0);
  const [pay2, setPay2] = useState(0);
  const [pay3, setPay3] = useState(0);
  const [pay4, setPay4] = useState(0);
  const [cardID, setCardID] = useState();
  const [cashID, setCashID] = useState();
  const [creditID, setCreditID] = useState();
  const [pointID, setPointID] = useState();
  const [bID, setBID] = useState();
  const [billNet, setBillNet] = useState();
  const [menuItem, setMenuItem] = useState([]);
  const [mopList, setMopList] = useState([]);
  const [currentObject, setCurrentObject] = useState();
  const [remove, setRemove] = useState(false);

  const [needCus, setNeedCus] = useState(false);
  const [highAlert, setHighAlert] = useState(false);
  const {TableName} = props.location.state;

  const handleChoose = async (title, price) => {
    console.log('childId', title, price);
    if (menuItem !== undefined) {
      const foundItem = menuItem.find((o) => o[0] == title);
      console.log('Fount ', foundItem);
      if (foundItem === undefined) {
        await setMenuItem(() => menuItem.concat([[title, price]]));
        await setMopList(() => mopList.concat([{mopid: price, amount: 0}]));
      }
    }
  };
  const handleRemove = () => {
    console.log('in handleRemove', remove);
    const found = menuItem.filter((o) => o !== currentObject);
    setMenuItem(() => found);
    setRemove(false);
  };
  const handleDeleteIcon = (curr) => {
    console.log('Call Remove Delete', curr);
    setRemove(true);
    setCurrentObject(curr);
    if (curr[0] === 'CARd') {
      setPay1(0);
    }
    if (curr[0] === 'Cash') {
      setPay2(0);
    }
    if (curr[0] === 'Credit Note Adjusted') {
      setPay3(0);
    }
    if (curr[0] === 'Point') {
      setPay4(0);
    }
  };
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('jwt');
      const bearerToken = 'Bearer ' + token;
      const result = await mopApi.getMOP(bearerToken);
      const res = await mopApi.getBillID(bearerToken, TableName);
      setBillData(result.data);
      setBID(res.data.id);
      setBillNet(res.data.netInvoiceValue);
      checkTotVal();
      if (remove) {
        handleRemove();
      }
    })();
  }, [remove, pay1, pay2, pay3, pay4]);
  var netAmount = 0;

  const objectCreation = (id, amount) => {
    const objCreate = {
      mopid: id,
      amount: amount,
    };

    return objCreate;
  };
  const callbackFun1 = (price, obj) => {
    console.log('New Data', price, obj);
    console.log(typeof parseInt(price));
    setPay1(parseInt(price));
    setCardID(obj[1]);
    // setMopList(() => mopList.concat(objectCreation(obj[1], pay1)));
  };
  const callbackFun2 = (price, obj) => {
    console.log('New Data', price, obj);
    console.log(typeof parseInt(price));
    setPay2(parseInt(price));
    setCashID(obj[1]);
    // setMopList(() => mopList.concat(objectCreation(obj[1], pay2)));
  };
  const callbackFun3 = (price, obj) => {
    console.log('New Data', price, obj);
    console.log(typeof parseInt(price));
    setPay3(parseInt(price));
    setCreditID(obj[1]);
    //  setMopList(() => mopList.concat(objectCreation(obj[1], pay3)));
  };
  const callbackFun4 = (price, obj) => {
    console.log('New Data', price, obj);
    console.log(typeof parseInt(price));
    setPay4(parseInt(price));
    setPointID(obj[1]);
  };
  const mopObjCreation = (id, amount) => {
    const objMop = {
      mopid: id,
      amount: amount,
    };
    return objMop;
  };

  const checkTotVal = () => {
    const sum = pay1 + pay2 + pay3 + pay4;
    if (billNet < sum) {
      return setHighAlert(true);
    }
    setHighAlert(false);
  };
  const setMopObj = () => {
    mopList.map((e) => {
      if (cardID !== null) {
        setMopList(() => mopList.concat(mopObjCreation(cardID, pay1)));
      }
      if (cashID !== null) {
        setMopList(() => mopList.concat(mopObjCreation(cashID, pay2)));
      }
      if (creditID !== null) {
        setMopList(() => mopList.concat(mopObjCreation(creditID, pay3)));
      }
      if (pointID !== null) {
        setMopList(() => mopList.concat(mopObjCreation(pointID, pay4)));
      }
    });
  };
  const handleSubmit = async () => {
    setMopObj();
    const mopData = {
      mopList: mopList,
      bIllID: bID,
    };
    console.log('Data aye ga', mopData);
    if (menuItem.length > 0) {
      setNeedCus(false);
      const token = localStorage.getItem('jwt');
      const bearerToken = 'Bearer ' + token;
      const result = await mopApi.makePay(bearerToken, mopData);
      console.log(result);
      if (result.ok) {
        history.push('/NewOrder');
      }
    } else {
      setNeedCus(true);
    }
  };

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
              <h4 className={classes.cardTitleWhite}>Make Payment</h4>
              <p className={classes.cardCategoryWhite}>
                Here is a subtitle for this table
              </p>
            </CardHeader>

            <CardBody>
              <div className={classes.row}>
                {billData !== undefined
                  ? billData.map((obj) => (
                      <MenuCard
                        title={obj.mopname}
                        price={obj.mopid}
                        color="secondary"
                        onClick={handleChoose}
                      />
                    ))
                  : null}
              </div>
              <div className="container col-sm-4 col-md-6 col-lg-6">
                <PayTable
                  data={menuItem}
                  callBackRemove={handleDeleteIcon}
                  callback1={callbackFun1}
                  callback2={callbackFun2}
                  callback3={callbackFun3}
                  callback4={callbackFun4}
                />
              </div>
              <div className="container col-sm-2 col-md-2 col-lg-2">
                <TextField
                  label="Total Amount"
                  disabled
                  id="standard-size-normal"
                  defaultValue="   000"
                  value={pay1 + pay2 + pay3 + pay4}
                />
              </div>
              <div className="container col-sm-2 col-md-2 col-lg-1">
                <Button onClick={handleSubmit} color="danger" round>
                  OK
                </Button>
              </div>

              {needCus && <Alert severity="error">Please Add Payment!</Alert>}
              {highAlert && (
                <Alert severity="error">
                  Total Amount must be less then Net Amount!
                </Alert>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
