const baseUrl = '';

export const fetchMetrics = async () => {
    const response = await fetch(`${baseUrl}/api/data/metrics`);
    return response.json();
};

export const fetchTargets = async () => {
    const response = await fetch(`${baseUrl}/api/data/targets`);
    return response.json();
};

export const fetchSignups = async () => {
    const response = await fetch(`${baseUrl}/api/data/signups`);
    return response.json();
};

export const fetchUpcomingInvoices = async () => {
    const response = await fetch(`${baseUrl}/api/data/upcomingInvoices`);
    return response.json();
};

export const fetchSchools = async () => {
    const response = await fetch(`${baseUrl}/api/data/schools`);
    return response.json();
};

export const fetchInvoices = async (schoolId) => {
    const response = await fetch(`${baseUrl}/api/data/schools/${schoolId}/invoices`);
    return response.json();
};

export const createInvoice = async (schoolId, invoiceData) => {
    const response = await fetch(`${baseUrl}/api/data/schools/${schoolId}/invoices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoiceData),
    });
    return response.json();
};

export const updateInvoice = async (schoolId, invoiceId, updatedData) => {
    const response = await fetch(`${baseUrl}/api/data/schools/${schoolId}/invoices/${invoiceId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
    });
    return response.json();
};

export const deleteInvoice = async (schoolId, invoiceId) => {
    const response = await fetch(`${baseUrl}/api/data/schools/${schoolId}/invoices/${invoiceId}`, {
        method: 'DELETE',
    });
    return response.json();
};

export const fetchCollections = async (schoolId) => {
    const response = await fetch(`${baseUrl}/api/data/schools/${schoolId}/collections`);
    return response.json();
};

export const updateCollectionStatus = async (id, status) => {
    const response = await fetch(`${baseUrl}/api/data/collections/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
    });
    return response.json();
};

export const addCollection = async (schoolId, invoiceId, collectionData) => {
    const response = await fetch(`${baseUrl}/api/data/schools/${schoolId}/invoices/${invoiceId}/collections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(collectionData),
    });
    return response.json();
};
