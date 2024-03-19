"use client"
import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import MonthlyReflectionsComponent from '../../components/MonthlyReflections';
import QuarterlyReflection from '@/app/components/QuarterlyReflections';

const Reflections: NextPage = () => {
  // Initially no reflection type is selected
  const [activeReflection, setActiveReflection] = useState<null | 'monthly' | 'quarterly'>(null);

  return (
    <>
      <Head>
        <title>Reflections - On Track Journal</title>
        <meta name="description" content="Reflect on your progress with On Track Journal." />
      </Head>
      <main className="container mx-auto p-4">
      <h2
          className="col-span-full text-center text-7xl my-96 font-semibold"
          style={{
            backgroundImage: 'url("/images/dailypractice-header.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '65px 0',
            margin: '0 0 60px 0', // Adjust the margin as needed
            borderRadius: '80px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            opacity: '70%',
          }}
        >
          Reflections
        </h2>
        {/* Button container */}
        <div className="flex justify-center space-x-4 mb-4">
          {/* Monthly Reflections Button */}
          <button
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
            onClick={() => setActiveReflection('monthly')}
          >
            Monthly Reflections
          </button>
          
          {/* Quarterly Reflections Button */}
          <button
            className="px-6 py-2 rounded bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition duration-300"
            onClick={() => setActiveReflection('quarterly')}
          >
            Quarterly Reflections
          </button>
        </div>

        {/* Conditional rendering based on `activeReflection` state */}
        {activeReflection === 'monthly' ? <MonthlyReflectionsComponent /> : null}
        {activeReflection === 'quarterly' ? <QuarterlyReflection /> : null}
        
      </main>
    </>
  );
};

export default Reflections;

