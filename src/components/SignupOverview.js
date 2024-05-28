import React from 'react'
import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { fetchSignups } from '../services/api'

const SignupOverview = () => {
    const [signups, setSignups] = useState({ primary: {}, secondary: {}, igcse: {} });

    useEffect(() => {
      fetchSignups().then(data => setSignups(data));
    }, []);
  
    const getChartData = (product) => ({
      labels: ['Primary', 'Secondary', 'IGCSE'],
      datasets: [
        {
          label: 'Sign-ups',
          data: [signups.primary[product], signups.secondary[product], signups.igcse[product]],
          backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        },
      ],
    });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {['analytics', 'finance', 'timetable'].map(product => (
        <div key={product} className="bg-white shadow-md p-4">
          <h3 className="text-xl mb-4">{product.charAt(0).toUpperCase() + product.slice(1)}</h3>
          <Bar data={getChartData(product)} />
        </div>
      ))}
    </div>
  )
}

export default SignupOverview