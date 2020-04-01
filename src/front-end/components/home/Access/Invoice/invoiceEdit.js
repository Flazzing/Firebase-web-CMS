import React, { useState } from "react";
import firestore from "../../../../config/firestore";
import { Form, Grid, Button, Modal, Icon } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import Page from "../../../Page";
import { Link, useParams } from "react-router-dom";

var id;

function useProject(invoiceID) {
  id = invoiceID;
  let invoiceRef = firestore.collection("Invoice").doc(invoiceID);

  invoiceRef
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        document.getElementById("invoiceLink").value = doc.data().invoiceLink;
        document.getElementById("invoiceName").value = doc.data().invoiceName;
        document.getElementById("invoiceType").value = doc.data().invoiceType;
      }
    })
    .catch(err => {
      console.error("Error happened when updateing invoice: " + err);
    });
}

function onSubmit(e) {
  //   e.perventDefault();
  firestore
    .collection("Invoice")
    .doc(id)
    .update({
      invoiceLink: document.getElementById("invoiceLink").value,
      invoiceName: document.getElementById("invoiceName").value,
      invoiceType: document.getElementById("invoiceType").value
    })
    .then(console.log("successfully update the invoice: " + id))
    .catch(err => {
      console.error("Failed to update the invoice: " + err);
    });
}

const InvoiceUpdateField = () => {
  let { invoiceid } = useParams();
  const projects = useProject(invoiceid);
  console.log(projects);
  return (
    <Modal open dimmer="blurring">
      <div style={{ float: "right" }}>
        <Link to="/home/:customerid/:projectid/access/invoice">
          <Icon name="close" size="large" />
        </Link>
      </div>

      <Modal.Header>Update Invoice</Modal.Header>
      <Modal.Description>
        <Page title="Update Invoice">
          <Helmet>
            <title>Update Invoice</title>
          </Helmet>
          <Grid.Column width={6} />
          <div style={{ marginLeft: "41%" }}>
            <Grid.Column width={4}>
              <Form>
                <Form.Input
                  className="invoiceLinkEdit"
                  inline
                  label="invoiceLink"
                  type="invoiceLink"
                  id="invoiceLink"
                  name="invoiceLink"
                />
                <Form.Input
                  className="invoiceNameEdit"
                  inline
                  label="invoiceName"
                  type="invoiceName"
                  id="invoiceName"
                  name="invoiceName"
                />
                <Form.Input
                  className="invoiceTypeEdit"
                  inline
                  label="invoiceType"
                  type="invoiceType"
                  id="invoiceType"
                  name="invoiceType"
                />
                <Form.Button
                  type="submit"
                  onClick={onSubmit}
                  className="customerEditConfirm"
                >
                  Update!
                </Form.Button>
              </Form>
            </Grid.Column>
          </div>
        </Page>
      </Modal.Description>
      <Modal.Actions>
        <Link to="/home/:customerid/:projectid/access/invoice">
          <Button>Close</Button>
        </Link>
      </Modal.Actions>
    </Modal>
  );
};

export default InvoiceUpdateField;