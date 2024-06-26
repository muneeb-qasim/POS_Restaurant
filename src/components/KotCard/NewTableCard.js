import React from 'react';
// @material-ui/core components
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Table} from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
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

export default function KotTable({
  data,
  callBackIncrement,
  callBackDecrement,
  callBackRemove,
}) {
  React.useEffect(() => {}, [data]);

  

  const classes = useStyles();
  return (
    <div className={classes.bill}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>SL</th>
            <th>ItemCode</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data !== undefined
            ? data.map((e) => (
                <tr>
                  <td>{e[0]}</td>
                  <td>{e[1]}</td>
                  <td>{e[2]}</td>
                  <td>{e[3]}</td>

                  <td>
                    {
                      <Button
                        size="small"
                        color="primary"
                        startIcon={<RemoveOutlinedIcon />}
                        onClick={() => callBackDecrement(e)}
                      ></Button>
                    }

                    {
                      <Button
                        size="small"
                        color="default"
                        startIcon={<AddCircleRoundedIcon />}
                        onClick={() => callBackIncrement(e)}
                      ></Button>
                    }

                    {
                      <Button
                        size="small"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={() => callBackRemove(e)}
                      ></Button>
                    }
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    </div>
  );
}
