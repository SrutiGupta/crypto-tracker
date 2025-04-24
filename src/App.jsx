import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import CryptoTable from './components/CryptoTable';
import { fetchCryptoData } from './features/crypto/cryptoSlice';
import MockSocket from './utils/mockSocket';
import { store } from './app/store';

// Initialize the mock socket
const mockSocket = new MockSocket(store);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch initial cryptocurrency data
    dispatch(fetchCryptoData());

    // Connect to the mock socket for real-time updates
    mockSocket.connect();

    // Clean up on unmount
    return () => {
      mockSocket.disconnect();
    };
  }, [dispatch]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Crypto Tracker</h1>
        <p>Real-time cryptocurrency price tracker</p>
      </header>

      <main className="app-main">
        <CryptoTable />
      </main>

      <footer className="app-footer">
        <p>Data updates every few seconds (simulated)</p>
      </footer>
    </div>
  );
}

export default App;
