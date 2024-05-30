// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const router = jsonServer.router('db.json');
// const middlewares = jsonServer.defaults();

// server.use(middlewares);
// server.use(router);

// module.exports = server;
export const fetchMetrics = async () => {
    const response = await fetch('http://localhost:3001/metrics');
    return response.json();
  };
  
  export const fetchTargets = async () => {
    const response = await fetch('http://localhost:3001/targets');
    return response.json();
  };
  
  export const fetchSignups = async () => {
    const response = await fetch('http://localhost:3001/signups');
    return response.json();
  };
  
  export const fetchUpcomingInvoices = async () => {
    const response = await fetch('http://localhost:3001/upcomingInvoices');
    return response.json();
  };
  
  export const fetchSchools = async () => {
    const response = await fetch('http://localhost:3001/schools');
    return response.json();
  };
  
  export const fetchInvoices = async (schoolId) => {
    const response = await fetch(`http://localhost:3001/schools/${schoolId}/invoices`);
    return response.json();
  };

  export const createInvoice = async (schoolId, invoiceData) => {
    const response = await fetch(`http://localhost:3001/schools/${schoolId}/invoices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invoiceData),
    });
    return response.json();
  };
  
  export const updateInvoice = async (schoolId, invoiceId, updatedData) => {
    const response = await fetch(`http://localhost:3001/schools/${schoolId}/invoices/${invoiceId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    return response.json();
  };
  
  export const deleteInvoice = async (schoolId, invoiceId) => {
    const response = await fetch(`http://localhost:3001/schools/${schoolId}/invoices/${invoiceId}`, {
      method: 'DELETE',
    });
    return response.json();
  };
  
  
  export const fetchCollections = async (schoolId) => {
    const response = await fetch(`http://localhost:3001/schools/${schoolId}/collections`);
    return response.json();
  };
  
  export const updateCollectionStatus = async (id, status) => {
    const response = await fetch(`http://localhost:3001/collections/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return response.json();
  };
  export const addCollection = async (schoolId, invoiceId, collectionData) => {
    const response = await fetch(`http://localhost:3001/schools/${schoolId}/invoices/${invoiceId}/collections`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(collectionData),
    });
    return response.json();
  };
