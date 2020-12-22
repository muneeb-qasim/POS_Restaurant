import React from 'react';
// @material-ui/core components
import {makeStyles} from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import Button from 'components/CustomButtons/Button.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import CardIcon from 'components/Card/CardIcon.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import TextField from '@material-ui/core/TextField';

import {Link, useHistory} from 'react-router-dom';
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
    margin: '1%',
  },
  icons: {
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const useStyles = makeStyles(styles);

export default function NewOrder({title, addItem, makeBill, makePayment}) {
  const classes = useStyles();
  return (
    <div className={classes.bill}>
      <GridContainer className={classes.bill}>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Table No {title}</h4>

              {addItem && (
                <Button color="warning" size="Large">
                  <Link to="/KotScreen"> Add Item</Link>
                </Button>
              )}
              {makeBill && (
                <Button color="info" size="Large">
                  <Link to="/KotScreen"> Make Bill</Link>
                </Button>
              )}
              {makePayment && (
                <Button color="warning" size="Large">
                  Make Payment
                </Button>
              )}
            </CardHeader>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}