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
  
  export const createInvoice = async (schoolId, invoice) => {
    const response = await fetch(`http://localhost:3001/schools/${schoolId}/invoices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invoice)
    });
    return response.json();
  };
  
  export const updateInvoice = async (id, updates) => {
    const response = await fetch(`http://localhost:3001/invoices/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return response.json();
  };
  
  export const deleteInvoice = async (id) => {
    await fetch(`http://localhost:3001/invoices/${id}`, { method: 'DELETE' });
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
  