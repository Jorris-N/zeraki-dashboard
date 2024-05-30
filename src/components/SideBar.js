// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';

// const Sidebar = () => {
//   return (
//     <Drawer variant="permanent" className="w-60">
//       <List className="pt-10">
//         <ListItemButton component={Link} to="/dashboard">
//           <ListItemText primary="Dashboard" />
//         </ListItemButton>
//         <ListItemButton component={Link} to="/schools">
//           <ListItemText primary="Schools" />
//         </ListItemButton>
//       </List>
//     </Drawer>
//   );
// };

// export default Sidebar;


import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [show, setShow] = useState(true);
  return (
      <div>
          <div className="rounded-r bg-gray-900 xl:hidden flex justify-between w-full p-6 items-center ">
              <div className="flex justify-between  items-center space-x-3">
                  <p className="text-2xl leading-6 text-white">Zeraki Dashboard</p>
              </div>
              <div aria-label="toggler" className="flex justify-center items-center">
                  <button aria-label="open" id="open" onClick={()=>setShow(true)} className={`${show ? 'hidden' : ''} focus:outline-none focus:ring-2`}>
                      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 6H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M4 12H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M4 18H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                  </button>
                  <button aria-label="close" id="close" onClick={()=>setShow(false)} className={`${show ? '' : 'hidden'} focus:outline-none focus:ring-2`}>
                      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 6L6 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M6 6L18 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                  </button>
              </div>
          </div>
          <div id="Main" className={`${show ? 'translate-x-0' : '-translate-x-full'} xl:rounded-r transform  xl:translate-x-0  ease-in-out transition duration-500 flex justify-start items-start h-full  w-full sm:w-64 bg-gray-900 flex-col`}>
              <div className="hidden xl:flex justify-start p-6 items-center space-x-3">
                  <p className="text-2xl leading-6 text-white">Zeraki Dashboard</p>
              </div>
              <div className="mt-6 flex flex-col justify-start items-center  pl-4 w-full border-gray-600 border-b space-y-6 pb-5 ">
                  <Link to={'/dashboard'}  className="flex jusitfy-start items-center space-x-6 w-full  focus:outline-none  focus:text-indigo-400  text-white rounded ">
                      <svg className="fill-stroke " width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 4H5C4.44772 4 4 4.44772 4 5V9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9V5C10 4.44772 9.55228 4 9 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M19 4H15C14.4477 4 14 4.44772 14 5V9C14 9.55228 14.4477 10 15 10H19C19.5523 10 20 9.55228 20 9V5C20 4.44772 19.5523 4 19 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M9 14H5C4.44772 14 4 14.4477 4 15V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 9.55228 14 9 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M19 14H15C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="text-base leading-4 ">Dashboard</p>
                  </Link>
                  <Link to={'/schools'} className="flex jusitfy-start items-center w-full  space-x-6 focus:outline-none text-white focus:text-indigo-400   rounded ">
                      <svg className="fill-stroke" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="text-base leading-4 ">Schools</p>
                  </Link>
              </div>
          </div>
      </div>
  );
}

export default Sidebar;

