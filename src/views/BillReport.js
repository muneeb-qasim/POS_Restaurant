import React, {useEffect} from 'react';
// @material-ui/core components
import {makeStyles} from '@material-ui/core/styles';

// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import DateFnsUtils from '@date-io/date-fns';
import ButtonMain from 'components/CustomButtons/Button.js';
import TextField from '@material-ui/core/TextField';

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import ArrowBack from '@material-ui/icons/ArrowBack';
import billReportApi from '../api/Order';
import moment from 'moment';
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const useStyles = makeStyles(styles);

export default function BillReport() {
  const classes = useStyles();
  const [selectedDate1, setSelectedDate1] = React.useState();
  const [selectedDate2, setSelectedDate2] = React.useState();
  const [date1, setDate1] = React.useState('2020-12-01');
  const [date2, setDate2] = React.useState('2020-12-26');
  const [bilData, setBilData] = React.useState();

  const [totAmount, setTotAmount] = React.useState(0);
  const history = useHistory();
  useEffect(() => {
    handleBill(date1, date2);
  }, [date1, date2]);
  const handleBill = async (dat1, dat2) => {
    const token = localStorage.getItem('jwt');
    const bearerToken = 'Bearer ' + token;
    const datey = `${date1}`;
    const datey2 = `${date2}`;
    const result = await billReportApi.getBillReport(
      bearerToken,
      datey,
      datey2
    );
    console.log(result);
    var count = 1;
    const arrData = result.data.map((e) => {
    return  arrCreation(count++,e.invoiceNo, e.netAmt);
    });
    setBilData(arrData);
    
    var netAmount = 0;
    
    const ttAmount = result.data.map((e) => {
      netAmount = netAmount + e.netAmt;
    });
    setTotAmount(netAmount);
    console.log('arrData', arrData);
  };

  const arrCreation = (sl,invoice, amnt) => {
    const arr = [sl,invoice, amnt];
    return arr;
  };
  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
    console.log(date);
    const dateForm = moment(date).format('YYYY-MM-DD');
    console.log(dateForm);
    setDate1(dateForm);
  };
  const handleDateChange2 = (date) => {
    setSelectedDate2(date);

    console.log(date);
    const dateForm = moment(date).format('YYYY-MM-DD');
    console.log(dateForm);
    setDate2(dateForm);
  };

  return (
    <div className={classes.bill}>
      <GridContainer className={classes.bill}>
        <GridItem xs={12} sm={12} md={12}>
          <ButtonMain
            onClick={() => history.push('/Dashboard')}
            color="danger"
            startIcon={<ArrowBack />}
          >
            Back
          </ButtonMain>

          <Card>
            <CardHeader color="warning">
              <div className="row">
                <div className="col-sm-4 col-md-4 col-lg-4">
                  <h4 className={classes.cardTitleWhite}>Bill Report</h4>
                </div>

                <div className="col-sm-8 col-md-8 col-lg-8">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      color="blue"
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Start Data"
                      value={selectedDate1}
                      onChange={handleDateChange1}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />

                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="End Data"
                      value={selectedDate2}
                      onChange={handleDateChange2}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </div>
            </CardHeader>

            <CardBody>
              {bilData !== undefined ? (
                <Table
                  tableHeaderColor="primary"
                  tableHead={['SL','Bill No', 'Net Amount']}
                  tableData={bilData}
                />
              ) : null}
            </CardBody>
            <CardFooter style={{flexDirection:'row',justifyContent:'center'}}>
            <TextField
                    label="Net Amount"
                    disabled
                    id="standard-size-normal"
                    defaultValue="   000"
                    value={totAmount}
                  />
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
