import { useState, useEffect } from 'react';
import './App.css';
import ScreenCard from './components/ScreenCard';
import AddScreenForm from './components/AddScreenForm';

function App() {
  const [screens, setScreens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. GET: Φόρτωση οθονών
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

  // 2. POST: Προσθήκη οθόνης
  const handleScreenAdded = (newScreen) => {
    setScreens((prevScreens) => [...prevScreens, newScreen]);
  };

  // 3. DELETE: Διαγραφή οθόνης
  const handleDeleteScreen = (screenId) => {
    fetch(`http://127.0.0.1:8000/api/screens/${screenId}/`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Αποτυχία διαγραφής οθόνης');
        }
        // Αφαιρούμε την οθόνη από το State χρησιμοποιώντας filter
        setScreens((prevScreens) => prevScreens.filter((s) => s.id !== screenId));
      })
      .catch((err) => {
        console.error("Σφάλμα κατά τη διαγραφή:", err);
        alert("Σφάλμα κατά τη διαγραφή της οθόνης.");
      });
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
                <ScreenCard 
                  key={screen.id} 
                  screen={screen} 
                  onDelete={handleDeleteScreen} 
                />
              ))}
            </div>
          )
        )}
      </main>
    </div>
  );
}

export default App;