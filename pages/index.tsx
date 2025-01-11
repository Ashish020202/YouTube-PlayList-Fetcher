import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const navigator = () => {
    router.push('/api/auth');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-500 via-gray-600 to-gray-800">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome to the Playlist App</h1>
        <p className="text-gray-600 mb-6">Authenticate yourself to access playlists.</p>
        <button
          onClick={navigator}
          className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition ease-in-out duration-150"
        >
          Authenticate Yourself
        </button>
      </div>
    </div>
  );
}
