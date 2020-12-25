import React, {useState, useEffect} from 'react';
// @material-ui/core components
import {makeStyles} from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import ButtonMain from 'components/CustomButtons/Button.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import TextField from '@material-ui/core/TextField';
import {Modal, ModalHeader, ModalBody, } from 'reactstrap';
import SearchBar from 'material-ui-search-bar';
import Button from '@material-ui/core/Button';

import ArrowBack from '@material-ui/icons/ArrowBack';
import Alert from '@material-ui/lab/Alert';

import CircularProgress from '@material-ui/core/CircularProgress';
import CustomerApi from '../api/Bill';
import BillDetailsApi from '../api/Order';

import BillTable from '../components/BillTable/BillTable';

import {useHistory} from 'react-router-dom';
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
    fontSize: '28px',
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
  modelHead: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modelHeader: {
    color: '#8e0e00',
    fontWeight: '400',
  },
};

const useStyles = makeStyles(styles);

export default function TableList(props) {
  const classes = useStyles();

  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [seaCustomer, setSeaCustomer] = useState();
  const [foundCus, setFoundCus] = useState();
  const [notFound, setNotFound] = useState(false);
  const [customerName, setCustomerName] = useState();
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState();
  const [gstNumber, setGstNumber] = useState();
  const [error, setError] = useState(false);
  const [error1, setError1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [needCus, setNeedCus] = useState(false);
  const [billData, setBillData] = useState();
  const [totAmount, setTotAmount] = useState(0.0);
  const {TableName} = props.location.state;
  const arrCreation = (
    sl,
    itemCode,
    quantity,
    rate,
    taxable,
    cgstamt,
    sgstamt,
    igstamt,
    cessAmt,
    amount
  ) => {
    const arrayItem = [
      sl,
      itemCode,
      quantity,
      rate,
      taxable,
      cgstamt,
      sgstamt,
      igstamt,
      cessAmt,
      amount,
    ];
    return arrayItem;
  };

  const arrData = (bilData) => {
    var count = 1;
    const billDataDet = bilData.map((e) =>
      arrCreation(
        count++,
        e.itemCode,
        e.quantity,
        e.rate,
        e.taxable,
        e.cgstamt,
        e.sgstamt,
        e.igstamt,
        e.cessAmt,
        e.amount
      )
    );
    var netAmount = 0;
    const ttAmount = bilData.map((e) => {
      netAmount = netAmount + e.amount;
    });
    setTotAmount(netAmount);
    console.log('Array Table', billDataDet);

    return billDataDet;
  };
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('jwt');
      const bearerToken = 'Bearer ' + token;
      const result = await BillDetailsApi.getBillDetails(
        bearerToken,
        TableName
      );
      console.log(result.data);
      arrData(result.data);
      setBillData(arrData(result.data));
    })();
  }, []);

  const toggle = () => setModal(!modal);

  const handleSaveBill = async () => {
    if (foundCus !== undefined) {
      console.log('andr aya');
      setNeedCus(false);
      const token = localStorage.getItem('jwt');
      const bearerToken = 'Bearer ' + token;
      const billData = {
        tableName: TableName,
        discPer: 5,
        customerID: foundCus.id,
      };
      const result = await BillDetailsApi.saveBill(bearerToken, billData);
      console.log(result);
      if (result.ok) {
        history.push('/NewOrder');
        localStorage.setItem(`${TableName}`, result.data.id);
      }
    } else {
      console.log('andr aya 2');
      setNeedCus(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('jwt');
    const bearerToken = 'Bearer ' + token;
    if (
      customerName === undefined ||
      mobile === undefined ||
      email === undefined ||
      gstNumber === undefined ||
      address1 === undefined
    ) {
      return setError(!error);
    }

    setError(false);

    setLoading(true);
    const result = await CustomerApi.addCustomer(
      bearerToken,
      customerName,
      address1,
      address2,
      mobile,
      email,
      gstNumber
    );

    setLoading(false);
    if (result.ok) {
      setError1(true);
    } else {
      setError1(false);
    }
  };

  const handleSearch = async () => {
    setFoundCus(undefined);
    setNotFound(false);
    const token = localStorage.getItem('jwt');
    const bearerToken = 'Bearer ' + token;
    const result = await CustomerApi.getCustomer(bearerToken, seaCustomer);
    if (result.data !== null) {
      setFoundCus(result.data);
      setNotFound(false);
    } else {
      setNotFound(true);
      setFoundCus(undefined);
    }
  };

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className={classes.modelHead} toggle={toggle}>
          <h5 className={classes.modelHeader}>Add New Customer</h5>
        </ModalHeader>
        <ModalBody>
          <div className="container ">
            <form onSubmit={handleSubmit}>
              <div className="form-group ">
                <label>Customer name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Customer name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Mobile</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>GST number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter GST Number"
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Address 1</label>
                <input
                  multiline={true}
                  type="text"
                  className="form-control"
                  placeholder="Address 1"
                  maxLength={45}
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Address 2</label>
                <input
                  multiline={true}
                  type="text"
                  className="form-control"
                  placeholder="Address 2"
                  maxLength={45}
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-dark btn-lg btn-block">
                Save
              </button>
              {loading && (
                <CircularProgress
                  style={{alignSelf: 'center'}}
                  color="secondary"
                />
              )}
              {error && (
                <Alert severity="warning">
                  Please provide the missing Fields!
                </Alert>
              )}
              {error1 && <Alert severity="success">Customer Added!</Alert>}
            </form>
          </div>
        </ModalBody>
      </Modal>
      
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
              <div className="row">
                <div className="col-sm-8 col-md-8 col-lg-10">
                  <h4 className={classes.cardTitleWhite}>Bill Screen</h4>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-2">
                  <ButtonMain
                    color="danger"
                    startIcon={<ReceiptOutlinedIcon />}
                    round
                    onClick={handleSaveBill}
                  >
                    Save & Print{' '}
                  </ButtonMain>
                  {needCus && (
                    <Alert severity="error">
                      Please Select Customer First !
                    </Alert>
                  )}
                </div>
              </div>
            </CardHeader>
            {/* <div className={classes.icons}>
            <CardIcon color="warning" className={classes.icons}>
              {" "}
            </CardIcon>
          </div> */}
            <CardBody>
              {billData !== undefined ? <BillTable data={billData} /> : null}
            </CardBody>
            <CardFooter>
              <div className="row">
                <div className="col-md-6">
                  <SearchBar
                    value={seaCustomer}
                    onChange={(key) => setSeaCustomer(key)}
                    onRequestSearch={handleSearch}
                    placeholder="Search Customer"
                  />

                  {foundCus !== undefined && (
                    <Alert severity="success">
                      Customer {foundCus.customerName} Found
                    </Alert>
                  )}
                  {notFound && (
                    <Alert severity="error">Customer Not Found!</Alert>
                  )}
                </div>
                <div className="col-md-6">
                  <p>
                    Customer Not Found?
                    <Button color="secondary" onClick={toggle}>
                      Add Customer
                    </Button>
                  </p>
                </div>
              </div>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    label="Net Amount"
                    disabled
                    id="standard-size-normal"
                    defaultValue="   000"
                    value={totAmount}
                  />
                </GridItem>
              </GridContainer>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      </div>
    </>
  );
}
