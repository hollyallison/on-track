
import type { NextPage } from 'next';
import Head from 'next/head';
import MonthlyReflection from '../components/MonthlyReflections';

const MonthlyReflections: NextPage = () => {
  return (
    <>
      <Head>
        <title>Daily Practice - On Track Journal</title>
        <meta name="description" content="Monthly Reflection" />
      </Head>
      <main className="container mx-auto p-4">
        <MonthlyReflections />
      </main>
    </>
  );
};

export default MonthlyReflections;