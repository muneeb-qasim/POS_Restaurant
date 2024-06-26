import React, {useEffect, useState} from 'react';
// @material-ui/core components
import {makeStyles} from '@material-ui/core/styles';

// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import ArrowBack from '@material-ui/icons/ArrowBack';
import TableCard from '../components/KotCard/TableCard';

import { useHistory} from 'react-router-dom';
import ButtonMain from 'components/CustomButtons/Button.js';
import OrderTableApi from '../api/Order';

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
};



const useStyles = makeStyles(styles);
export default function NewOrder() {
  const [table, setTable] = useState();
  const classes = useStyles();

  const history = useHistory();
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('jwt');
      const bearerToken = 'Bearer ' + token;
      const result = await OrderTableApi.getTable(bearerToken);
      console.log(result.data);
      setTable(result.data);
    })();
  }, [table]);
  return (
    <div className={classes.bill}>
      <ButtonMain
        onClick={() => history.push('/Dashboard')}
        color="danger"
        startIcon={<ArrowBack />}
      >
        Back
      </ButtonMain>
      <GridContainer className={classes.bill}>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>New Order</h4>
            </CardHeader>

            <CardBody>
              {table !== undefined
                ? table.map((obj) => (
                    <TableCard
                      title={obj.tableName}
                      addItem={obj.docType !== 'ConfirmKOT' ? true : false}
                      makeBill={obj.docType === 'KOT' ? true : false}
                      makePayment={obj.docType === 'ConfirmKOT' ? true : false}
                    />
                  ))
                : null}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
