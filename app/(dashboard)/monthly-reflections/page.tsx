import type { NextPage } from 'next';
import Head from 'next/head';
import MonthlyReflectionsComponent from '../../components/MonthlyReflections'; // Renamed import

const MonthlyReflections: NextPage = () => {
  return (
    <>
      <Head>
        <title>Monthly Reflections - On Track Journal</title> {/* Updated title to match the content */}
        <meta name="description" content="Reflect on your month with On Track Journal." /> {/* More descriptive content */}
      </Head>
      <main className="container mx-auto p-4">
        <MonthlyReflectionsComponent /> {/* Updated to use the renamed import */}
      </main>
    </>
  );
};

export default MonthlyReflections;
