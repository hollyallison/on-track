// pages/daily-practice.tsx

import type { NextPage } from 'next';
import Head from 'next/head';
import DailyPractice from '../../components/DailyPractice';

const DailyPracticePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Daily Practice - On Track Journal</title>
        <meta name="description" content="Daily practice reflection" />
      </Head>
      <main className="container mx-auto p-4">
        <DailyPractice />
      </main>
    </>
  );
};

export default DailyPracticePage;
