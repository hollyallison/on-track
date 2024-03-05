
import type { NextPage } from 'next';
import Head from 'next/head';
import MyGoal from '../../components/MyGoals';

function MyGoals() {
    return (
        <>
            <Head>
                <title>Daily Practice - On Track Journal</title>
                <meta name="description" content="Monthly Reflection" />
            </Head>
            <main className="container mx-auto p-4">
                <MyGoals />
            </main>
        </>
    );
}

export default MyGoals;