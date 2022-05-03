import type { NextPage } from 'next';
import { getSession, signOut, useSession } from 'next-auth/react';
import styles from '../styles/Home.module.css';
//import useRequireAuth from "../lib/useRequireAuth";

export async function getServerSideProps (context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    };
  }

  return {
    props: {
      session,
    }
  }
}

const Home: NextPage = () => {

  const { data:session } = useSession();

  console.log(session, 'session');

  return (
    <div id="container" className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <div className="flex flex-col">
          <div className="sm:w-4/4 p-2">
            <div className="bg-white px-6 py-8 rounded-lg shadow-lg text-center">
              <div className="mb-3">
                <img
                  className="rounded-full"
                  src={session?.user?.image}
                  alt="Profile image"
                  width={400}
                  height={400}
                />
              </div> 
              <span className="text-blue-500 block mb-5">Bem Vindo!</span>
              <h2 className="text-xl font-medium text-gray-700 mb-5">{session?.user?.name}</h2>
              <a 
                href="#" 
                className="px-10 py-2 bg-blue-500 text-white rounded-full mt-5"
                onClick={() => signOut()}
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Home
