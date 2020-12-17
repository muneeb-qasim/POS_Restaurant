import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardIcon from "components/Card/CardIcon.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import ReceiptOutlinedIcon from "@material-ui/icons/ReceiptOutlined";
import TextField from "@material-ui/core/TextField";
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "white",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
      fontWeight: "200",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",

    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    fontWeight: "400",
    textDecoration: "none",
    fontSize: "22px",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  bill: {
    margin: "15%",
  },
  icons: {
    alignItems: "center",
    justifyContent: "center",
  },
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  return (
    <GridContainer className={classes.bill}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="warning">
            <div className="row">
              <div className="col-sm-10">
                <h4 className={classes.cardTitleWhite}>Bill Screen</h4>
              </div>
              <div className="col-sm-2">
                <Button color="primary" startIcon={<ReceiptOutlinedIcon />}>
                  Save & Print{" "}
                </Button>
              </div>
            </div>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
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
                "SL",
                "Item",
                "Qty",
                "rate",
                "Taxable",
                "CGST",
                "SGST",
                "IGST",
                "Cess",
                "Amount",
              ]}
              tableData={[
                [
                  "Dakota Rice",
                  "Niger",
                  "Oud-Turnhout",
                  "$36,738",
                  "Dakota Rice",
                  "Niger",
                  "Oud-Turnhout",
                  "$36,738",
                  "$36,738",
                  "$36,738",
                ],
                [
                  "Dakota Rice",
                  "Niger",
                  "Oud-Turnhout",
                  "$36,738",
                  "Dakota Rice",
                  "Niger",
                  "Oud-Turnhout",
                  "$36,738",
                  "$36,738",
                  "$36,738",
                ],
                [
                  "Dakota Rice",
                  "Niger",
                  "Oud-Turnhout",
                  "$36,738",
                  "Dakota Rice",
                  "Niger",
                  "Oud-Turnhout",
                  "$36,738",
                  "$36,738",
                  "$36,738",
                ],
              ]}
            />
          </CardBody>
          <CardFooter>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Enter Mobile"
                  id="enter-mobile"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Net Amount"
                  id="net-amount"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    disabled: true,
                  }}
                />
                <p className="forgot-password text-left">
                  Forgot <a href="#">password?</a>
                </p>
              </GridItem>
            </GridContainer>
          </CardFooter>
        </Card>
      </GridItem>
      {/* <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Table on Plain Background
            </h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Name", "Country", "City", "Salary"]}
              tableData={[
                ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
                ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
                ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
                [
                  "4",
                  "Philip Chaney",
                  "$38,735",
                  "Korea, South",
                  "Overland Park"
                ],
                [
                  "5",
                  "Doris Greene",
                  "$63,542",
                  "Malawi",
                  "Feldkirchen in Kärnten"
                ],
                ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem> */}
    </GridContainer>
  );
}
