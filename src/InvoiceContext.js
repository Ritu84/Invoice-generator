import React, { createContext, useState, useEffect } from 'react';

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState(() => {
    const savedData = localStorage.getItem('invoiceData');
    return savedData ? JSON.parse(savedData) : null;
  });

  useEffect(() => {
    if (invoiceData) {
      localStorage.setItem('invoiceData', JSON.stringify(invoiceData));
    }
  }, [invoiceData]);

  return (
    <InvoiceContext.Provider value={{ invoiceData, setInvoiceData }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceContext;
