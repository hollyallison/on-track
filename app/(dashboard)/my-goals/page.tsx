import type { NextPage } from 'next';
import Head from 'next/head';
import Kanban from '../../components/Kanban';

const MyGoals: NextPage = () => {
  return (
    <>
      <Head>
        <title>My Goals - On Track Journal</title>
        <meta name="description" content="Set and track your goals with On Track Journal." />
      </Head>
      <main className="container mx-auto p-4">
        <Kanban />
      </main>
    </>
  );
};

export default MyGoals;


