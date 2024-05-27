import React, { useState, useEffect } from "react";
import {
  Page,
  Document,
  StyleSheet,
  View,
  Text,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 50,
    paddingRight: 50,
    lineHeight: 1.5,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  companyDetails: {
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    width: 84,
    height: 70,
  },
  billToSection: {
    marginTop: 10,
  },
  billToLabel: {
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color:"#5D6F79",
  },
  invoiceDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  invoiceInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginRight: 20,
  },
  invoiceTable: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 20,
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor:"#F1F5F8",
  },
  tableCell: {
    flex: 1,
    textAlign: "left",
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    borderTopWidth: 2,
    borderColor: "#e0e0e0",
    paddingTop: 10,
    textAlign: "justify",
  },
  totals: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
    marginRight: 40,
    justifyContent: "flex-end",
    gap: 5,
  },
  bankDetails: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
    textAlign: "justify",
  },
});

const PdfDocument = () => {
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("invoiceData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setInvoiceData(parsedData);
    }
  }, []);

  if (!invoiceData) {
    return null; 
  }

  const calculateAmount = (qty, rate) => qty * rate;

  const subtotal = invoiceData.items.reduce(
    (acc, item) => acc + calculateAmount(item.qty, item.rate),
    0
  );
  const discount = 0; 
  const taxRate = 0; 
  const tax = (subtotal * taxRate) / 100;
  const total = subtotal - discount + tax;

  const fileName = "invoice.pdf";
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.companyDetails}>
            <Text style={{ fontSize: '25px', color: '#5D6F79' }} >Your Company name</Text>
            <Text>Building name</Text>
            <Text>123 Your Street</Text>
            <Text>City, State, Country</Text>
            <Text>Zip Code</Text>
            <View style={styles.billToSection}>
              <Text style={styles.billToLabel}>Bill To:</Text>
              <Text>{invoiceData.fullname}</Text>
              <Text>
                {invoiceData.address.split(", ").slice(0, 3).join(", ")}
              </Text>
              <Text>{invoiceData.address.split(", ")[3]}</Text>
              <Text>{invoiceData.phone}</Text>
              <Text>{invoiceData.email}</Text>
            </View>
          </View>
          <View style={styles.contactDetails}>
            <Text>+1-541-754-3010</Text>
            <Text>you@email.com</Text>
            <Text>yourwebsite.com</Text>
            <Image style={styles.logo} src="your-logo-url" />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Invoice</Text>

        <View style={styles.invoiceDetails}>
          <View style={styles.invoiceInfo}>
            <Text>Invoice No: {invoiceData.invoice_no}</Text>
            <Text>Date of Issue: {invoiceData.trans_date}</Text>
            <Text>Due Date: {invoiceData.due_date}</Text>
          </View>
          <View style={styles.invoiceTable}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableCell}>Description</Text>
              <Text style={styles.tableCell}>Unit cost</Text>
              <Text style={styles.tableCell}>QTY/HR Rate</Text>
              <Text style={styles.tableCell}>Amount</Text>
            </View>
            {invoiceData.items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.desc}</Text>
                <Text style={styles.tableCell}>{`$${item.rate.toFixed(
                  2
                )}`}</Text>
                <Text style={styles.tableCell}>{item.qty}</Text>
                <Text style={styles.tableCell}>{`$${calculateAmount(
                  item.qty,
                  item.rate
                ).toFixed(2)}`}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.totals}>
            <View>
              <Text style={{color:"#5D6F79"}}>Subtotal:</Text>
              <Text>{`$${subtotal.toFixed(2)}`}</Text>
            </View>
            <View>
              <Text style={{color:"#5D6F79"}}>Discount:</Text>
              <Text>{`$${discount.toFixed(2)}`}</Text>
            </View>
            <View>
              <Text style={{color:"#5D6F79"}}>Tax Rate:</Text>
              <Text>{`${taxRate}%`}</Text>
            </View>
            <View>
              <Text style={{color:"#5D6F79"}}>Tax:</Text>
              <Text>{`$${tax.toFixed(2)}`}</Text>
            </View>
            <View>
              <Text style={{color:"#5D6F79"}}>Invoice Total:</Text>
              <Text>{`$${total.toFixed(2)}`}</Text>
            </View>
          </View>
          
          <View style={styles.bankDetails}>
            <Text style={{color:"#5D6F79"}}>Bank Account Details</Text>
            <Text>Account Holder: {invoiceData.fullname}</Text>
            <Text>Account number: {invoiceData.companyID}</Text>
            <Text>ABA rtn: 026073150</Text>
            <Text>Wire rfn: 026073008</Text>
          </View>
          <Text style={{color:"#5D6F79",display:"flex", textAlign:"left"}}>Terms: Please pay invoice by {invoiceData.due_date}</Text>
        </View>
      </Page>
      
    </Document>
    
  );
};

export default PdfDocument;


