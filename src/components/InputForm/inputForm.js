import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./inputForm.css";
import InvoiceContext from "../../InvoiceContext";

function InvoiceForm() {
  const [invoice, setInvoice] = useState({
    billTo: { name: "", address: "", city: "", state: "", zipCode: "" },
    shipTo: { name: "", address: "", city: "", state: "", zipCode: "" },
    invoiceDetails: { number: "", date: "", dueDate: "", subject: "" },
    lineItems: [{ description: "", quantity: 0, unitPrice: 0, total: 0 }],
    tax: 0,
  });

  const { invoiceData, setInvoiceData } = useContext(InvoiceContext);
  const navigate = useNavigate();

  const handleInputChange = (e, section, index = null, field = null) => {
    const { name, value } = e.target;
    const newValue =
      field === "quantity" || field === "unitPrice" || field === "tax"
        ? parseFloat(value)
        : value;

    if (section === "lineItems" && index !== null) {
      const items = [...invoice.lineItems];
      items[index] = {
        ...items[index],
        [name]: newValue,
      };
      // Calculate total for the item
      items[index].total = items[index].quantity * items[index].unitPrice;
      setInvoice({ ...invoice, lineItems: items });
    } else if (section === "tax") {
      setInvoice({ ...invoice, tax: newValue });
    } else {
      setInvoice({
        ...invoice,
        [section]: { ...invoice[section], [name]: newValue },
      });
    }
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      lineItems: [
        ...invoice.lineItems,
        { description: "", quantity: 0, unitPrice: 0, total: 0 },
      ],
    });
  };

  const removeItem = (index) => {
    const items = invoice.lineItems.filter((item, i) => i !== index);
    setInvoice({ ...invoice, lineItems: items });
  };

  const calculateSubtotal = () => {
    return invoice.lineItems.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal + subtotal * (invoice.tax / 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      id: "5df3180a09ea16dc4b95f910", 
      invoice_no: `${invoice.invoiceDetails.number}`,
      balance: `$${calculateTotal().toFixed(2)}`,
      fullname: invoice.billTo.name,
      email: "example@example.com", 
      phone: "+1 (000) 000-0000",
      address: `${invoice.billTo.address}, ${invoice.billTo.city}, ${invoice.billTo.state}, ${invoice.billTo.zipCode}`,
      trans_date: invoice.invoiceDetails.date,
      due_date: invoice.invoiceDetails.dueDate,
      companyID: "10001", 
      companyName: "xyz company", 
      items: invoice.lineItems.map((item, index) => ({
        sno: index + 1,
        desc: item.description,
        qty: item.quantity,
        rate: item.unitPrice,
      })),
    };
    setInvoiceData(formattedData);
    console.log("Invoice", formattedData);
    navigate("/invoice");
  };

  console.log("ContextData", invoiceData);

  return (
    <div>
      <h1>Invoice Generator</h1>
      <Form onSubmit={handleSubmit}>
        <h2>Bill To:</h2>
        <Form.Group className="form-group">
          <Form.Label className="form-label">Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={invoice.billTo.name}
            onChange={(e) => handleInputChange(e, "billTo")}
            required
            className="form-control"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="form-label">Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={invoice.billTo.address}
            onChange={(e) => handleInputChange(e, "billTo")}
            required
            className="form-control"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="form-label">City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={invoice.billTo.city}
            onChange={(e) => handleInputChange(e, "billTo")}
            required
            className="form-control"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="form-label">State</Form.Label>
          <Form.Control
            type="text"
            name="state"
            value={invoice.billTo.state}
            onChange={(e) => handleInputChange(e, "billTo")}
            required
            className="form-control"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="form-label">ZIP Code</Form.Label>
          <Form.Control
            type="text"
            name="zipCode"
            value={invoice.billTo.zipCode}
            onChange={(e) => handleInputChange(e, "billTo")}
            required
            className="form-control"
          />
        </Form.Group>

        <h2>Ship To:</h2>
        <Form.Group className="form-group">
          <Form.Label className="form-label">Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={invoice.shipTo.name}
            onChange={(e) => handleInputChange(e, "shipTo")}
            required
            className="form-control"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="form-label">Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={invoice.shipTo.address}
            onChange={(e) => handleInputChange(e, "shipTo")}
            required
            className="form-control"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="form-label">City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={invoice.shipTo.city}
            onChange={(e) => handleInputChange(e, "shipTo")}
            required
            className="form-control"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="form-label">State</Form.Label>
          <Form.Control
            type="text"
            name="state"
            value={invoice.shipTo.state}
            onChange={(e) => handleInputChange(e, "shipTo")}
            required
            className="form-control"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="form-label">ZIP Code</Form.Label>
          <Form.Control
            type="text"
            name="zipCode"
            value={invoice.shipTo.zipCode}
            onChange={(e) => handleInputChange(e, "shipTo")}
            required
            className="form-control"
          />
        </Form.Group>

        <h2>Invoice Details:</h2>
        <Form.Group className="form-group">
          <Form.Label className="form-label">Invoice Number</Form.Label>
          <Form.Control
            type="text"
            name="number"
            value={invoice.invoiceDetails.number}
            onChange={(e) => handleInputChange(e, "invoiceDetails")}
            required
            className="form-control"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="form-label">Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={invoice.invoiceDetails.date}
            onChange={(e) => handleInputChange(e, "invoiceDetails")}
            required
            className="form-control"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="form-label">Due Date</Form.Label>
          <Form.Control
            type="date"
            name="dueDate"
            value={invoice.invoiceDetails.dueDate}
            onChange={(e) => handleInputChange(e, "invoiceDetails")}
            required
            className="form-control"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="form-label">Subject</Form.Label>
          <Form.Control
            type="text"
            name="subject"
            value={invoice.invoiceDetails.subject}
            onChange={(e) => handleInputChange(e, "invoiceDetails")}
            required
            className="form-control"
          />
        </Form.Group>

        <h2>Line Items:</h2>
        {invoice.lineItems.map((item, index) => (
          <div key={index} className="line-item">
            <Form.Group className="form-group">
              <Form.Label className="form-label">Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={item.description}
                onChange={(e) => handleInputChange(e, "lineItems", index)}
                required
                className="form-control"
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label className="form-label">Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(e) =>
                  handleInputChange(e, "lineItems", index, "quantity")
                }
                required
                className="form-control"
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label className="form-label">Unit Price</Form.Label>
              <Form.Control
                type="number"
                name="unitPrice"
                value={item.unitPrice}
                onChange={(e) =>
                  handleInputChange(e, "lineItems", index, "unitPrice")
                }
                required
                className="form-control"
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label className="form-label">Total</Form.Label>
              <Form.Control
                type="number"
                name="total"
                value={item.total}
                readOnly
                className="form-control"
              />
            </Form.Group>
            <Button
              variant="danger"
              onClick={() => removeItem(index)}
              className="btn-danger"
            >
              Remove
            </Button>
          </div>
        ))}
        <Button variant="primary" onClick={addItem} className="btn-primary">
          Add Item
        </Button>

        <h2>Subtotals:</h2>
        <Form.Group className="form-group">
          <Form.Label className="form-label">Subtotal</Form.Label>
          <Form.Control
            type="number"
            value={calculateSubtotal()}
            readOnly
            className="form-control"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="form-label">Tax (%)</Form.Label>
          <Form.Control
            type="number"
            name="tax"
            value={invoice.tax}
            onChange={(e) => handleInputChange(e, "tax")}
            required
            className="form-control"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="form-label">Total</Form.Label>
          <Form.Control
            type="number"
            value={calculateTotal()}
            readOnly
            className="form-control"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="btn-primary">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default InvoiceForm;
