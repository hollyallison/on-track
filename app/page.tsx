import type { NextPage } from 'next';
import Head from 'next/head';
import Calendar from './components/CalendarView';
import "./globals.css";
import TaskBoard from './components/TaskBoard';



const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>On Track Journal</title>
        <meta name="description" content="Stay on track with your daily practices and goals" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto p-4 space-y-6">
       <Calendar /> 
       <TaskBoard />
      </main>
    </>
  );
};

export default Home;

