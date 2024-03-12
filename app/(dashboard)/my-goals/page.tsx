import type { NextPage } from 'next';
import Head from 'next/head';
import MyGoalComponent from '../../components/MyGoals'; // Ensure the path is correct

const MyGoals: NextPage = () => {
    return (
        <>
            <Head>
                <title>My Goals - On Track Journal</title> {/* Updated title to match the content */}
                <meta name="description" content="Set and track your goals with On Track Journal." /> {/* Updated description */}
            </Head>
            <main className="container mx-auto p-4">
                <MyGoalComponent /> {/* Correct component rendered */}
            </main>
        </>
    );
};

export default MyGoals;
