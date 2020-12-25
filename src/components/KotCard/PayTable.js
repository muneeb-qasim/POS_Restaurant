import React, {useState} from 'react';
// @material-ui/core components
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Table} from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';

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

export default function PayTable({data, callBackRemove, callback1,callback2,callback3,callback4}) {
  const [textData1, setTextData1] = useState(0);
  const [textData2, setTextData2] = useState(0);
  const [textData3, setTextData3] = useState(0);
  const [textData4, setTextData4] = useState(0);
  React.useEffect(() => {}, [data]);


  const classes = useStyles();
  return (
    <div className={classes.bill}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>MOP Name</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data !== undefined
            ? data.map((obj) => (
                <tr>
                  <td>{obj[0]}</td>
                  <td>
                    <TextField
                      id='field'
                      value={
                        obj[0] === 'CARd'
                          ? textData1
                          : obj[0] === 'Cash'
                          ? textData2
                          : obj[0] === 'Point'
                          ? textData4
                          : textData3
                      }
                      onChange={(event) => {
                        if (obj[0] === 'CARd') {
                          setTextData1(event.target.value);
						  callback1(event.target.value, obj);
                    
                        }
                        if (obj[0] === 'Cash') {
                          setTextData2(event.target.value);
						      callback2(event.target.value, obj);
                    
                        }
                        if (obj[0] === 'Credit Note Adjusted') {
                          setTextData3(event.target.value);
						  callback3(event.target.value, obj);
                    
                        }
                        if (obj[0] === 'Point') {
                          setTextData4(event.target.value);
						  callback4(event.target.value, obj);
                    
                        }
                      }}
                    />
                  </td>
                  <td>
                    <Button
                      size="small"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      onClick={() => callBackRemove(obj)}
                    ></Button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    </div>
  );
}
