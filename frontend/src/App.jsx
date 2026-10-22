import { useState, useEffect } from 'react';
import './App.css';
import ScreenCard from './components/ScreenCard';
import AddScreenForm from './components/AddScreenForm';

function App() {
  const [screens, setScreens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Φόρτωση οθονών στο αρχικό άνοιγμα
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/screens/')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setScreens(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Σφάλμα σύνδεσης:", err);
        setError("Αποτυχία φόρτωσης οθονών. Βεβαιωθείτε ότι το Django backend τρέχει!");
        setLoading(false);
      });
  }, []);

  // Συνάρτηση που καλείται από τη φόρμα όταν αποθηκευτεί επιτυχώς μια νέα οθόνη
  const handleScreenAdded = (newScreen) => {
    // Χρησιμοποιούμε spread operator για να φτιάξουμε νέο πίνακα (Immutability)
    setScreens((prevScreens) => [...prevScreens, newScreen]);
  };

  return (
    <div className="app-container">
      <header className="dashboard-header">
        <h1>📡 Signage Hub Dashboard</h1>
        <p>Real-Time Digital Signage Management</p>
      </header>

      {/* Φόρμα Προσθήκης Οθόνης */}
      <AddScreenForm onScreenAdded={handleScreenAdded} />

      <main className="dashboard-content">
        <h2>Συνδεδεμένες Οθόνες ({screens.length})</h2>

        {loading && <p className="status-info">⏳ Φόρτωση οθονών από τον server...</p>}
        {error && <p className="status-error">❌ {error}</p>}

        {!loading && !error && (
          screens.length === 0 ? (
            <p className="status-info">Δεν βρέθηκαν οθόνες στη βάση δεδομένων.</p>
          ) : (
            <div className="screens-grid">
              {screens.map((screen) => (
                <ScreenCard key={screen.id} screen={screen} />
              ))}
            </div>
          )
        )}
      </main>
    </div>
  );
}

export default App;