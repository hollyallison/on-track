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
      <h2
          className="col-span-full text-center text-7xl my-10 font-semibold"
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
          My Goals
        </h2>
        <Kanban />
      </main>
    </>
  );
};

export default MyGoals;


