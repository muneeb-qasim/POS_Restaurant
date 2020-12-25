import React, {useEffect, useState} from 'react';
// @material-ui/core components
import {makeStyles} from '@material-ui/core/styles';

// core components
import Table from 'components/Table/Table.js';
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
    marginTop: '5%',
  },
  icons: {
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const useStyles = makeStyles(styles);

export default function BillTable({data}) {
  console.log('Data Created Cahal', data);

  const classes = useStyles();

  return (
    <div className={classes.bill}>
      <Table
        tableHeaderColor="primary"
        tableHead={[
          'SL',
          'Item',
          'Qty',
          'Rate',
          'Taxable',
          'CGST',
          'SGST',
          'IGST',
          'Cess',
          'Amount',
        ]}
        tableData={data}
      />
    </div>
  );
}
