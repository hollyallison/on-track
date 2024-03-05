// pages/index.tsx

import type { NextPage } from 'next';
import Head from 'next/head';
import DailyPractice from './components/DailyPractice';
import MonthlyReflection from './components/MonthlyReflections';
import MyGoals from './components/MyGoals';
import Calendar from './components/CalendarView';
import Navbar from './components/Navbar';
// ... import other necessary components

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>On Track Journal</title>
        <meta name="description" content="Stay on track with your daily practices and goals" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto p-4 space-y-6">
       <Navbar />
       <Calendar /> 
       <DailyPractice />
       <MonthlyReflection />
       <MyGoals />
        
        {/* ... other components */}
      </main>
    </>
  );
};

export default Home;

