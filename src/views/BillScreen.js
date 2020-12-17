import React, {useState} from 'react';
// @material-ui/core components
import {makeStyles} from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import ButtonMain from 'components/CustomButtons/Button.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import CardIcon from 'components/Card/CardIcon.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import TextField from '@material-ui/core/TextField';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import Button from '@material-ui/core/Button';
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
    margin: '15%',
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

export default function TableList() {
  const classes = useStyles();

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className={classes.modelHead} toggle={toggle}>
          <h5 className={classes.modelHeader}>Add New Customer</h5>
        </ModalHeader>
        <ModalBody>
          <div className="container ">
            <form>
              <div className="form-group ">
                <label>Customer name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Customer name"
                />
              </div>
              <div className="form-group">
                <label>Mobile</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Mobile"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label>GST number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter GST Number"
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  multiline={true}
                  type="text"
                  className="form-control"
                  placeholder="Address"
                />
              </div>

              <button type="submit" className="btn btn-dark btn-lg btn-block">
                Save
              </button>
            </form>
          </div>
        </ModalBody>
      </Modal>
      <GridContainer className={classes.bill}>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <div className="row">
                <div className="col-sm-10 col-md-9 col-lg-10">
                  <h4 className={classes.cardTitleWhite}>Bill Screen</h4>
                </div>
                <div className="col-sm-2 col-md-3 col-lg-2">
                  <ButtonMain
                    color="danger"
                    startIcon={<ReceiptOutlinedIcon />}
                    round
                  >
                    Save & Print{' '}
                  </ButtonMain>
                </div>
              </div>
            </CardHeader>
            {/* <div className={classes.icons}>
            <CardIcon color="warning" className={classes.icons}>
              {" "}
            </CardIcon>
          </div> */}
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  'SL',
                  'Item',
                  'Qty',
                  'rate',
                  'Taxable',
                  'CGST',
                  'SGST',
                  'IGST',
                  'Cess',
                  'Amount',
                ]}
                tableData={[
                  [
                    'Dakota Rice',
                    'Niger',
                    'Oud-Turnhout',
                    '$36,738',
                    'Dakota Rice',
                    'Niger',
                    'Oud-Turnhout',
                    '$36,738',
                    '$36,738',
                    '$36,738',
                  ],
                  [
                    'Dakota Rice',
                    'Niger',
                    'Oud-Turnhout',
                    '$36,738',
                    'Dakota Rice',
                    'Niger',
                    'Oud-Turnhout',
                    '$36,738',
                    '$36,738',
                    '$36,738',
                  ],
                  [
                    'Dakota Rice',
                    'Niger',
                    'Oud-Turnhout',
                    '$36,738',
                    'Dakota Rice',
                    'Niger',
                    'Oud-Turnhout',
                    '$36,738',
                    '$36,738',
                    '$36,738',
                  ],
                ]}
              />
            </CardBody>
            <CardFooter>
              <div className="row">
                <div className="col-md-6">
                  <TextField
                    id="standard-search"
                    label="Search Customer"
                    type="search"
                  />
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
                  />
                </GridItem>
              </GridContainer>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
