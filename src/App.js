import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/SideBar';
import Dashboard from './components/Dashboard';
import Schools from './components/Schools';
import SchoolDetails from './components/SchoolDetails';
import Invoices from './components/Invoices';
import Collections from './components/Collections';

function App() {
  const [selectedSchool, setSelectedSchool] = React.useState(null);

  return (
    <Router>
      <div className="lg:flex lg:z-0 z-40">
        <Sidebar className='fixed' />
        <div className="lg:flex-grow p-6">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schools" element={<Schools onSelectSchool={setSelectedSchool} />} />
          </Routes>
          {selectedSchool && (
            <div>
              <SchoolDetails school={selectedSchool} />
              <Invoices schoolId={selectedSchool.id} />
              <Collections schoolId={selectedSchool.id} />
            </div>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
