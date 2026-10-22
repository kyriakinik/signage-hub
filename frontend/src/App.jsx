import { useState } from 'react';
import './App.css';
import ScreenCard from './components/ScreenCard';

function App() {
  // Δοκιμαστικά δεδομένα (Mock Data) με την ίδια ακριβώς δομή που επιστρέφει το Django API μας
  const [screens] = useState([
    {
      id: 1,
      name: "Reception Screen",
      location: "Main Entrance",
      status: "online",
      message: "Καλωσήρθατε στην εταιρεία!"
    },
    {
      id: 2,
      name: "Cafeteria Display",
      location: "2nd Floor",
      status: "offline",
      message: "Μενού ημέρας: Pizza & Salad"
    }
  ]);

  return (
    <div className="app-container">
      <header className="dashboard-header">
        <h1>📡 Signage Hub Dashboard</h1>
        <p>Real-Time Digital Signage Management</p>
      </header>

      <main className="dashboard-content">
        <h2>Συνδεδεμένες Οθόνες ({screens.length})</h2>
        
        <div className="screens-grid">
          {screens.map((screen) => (
            <ScreenCard key={screen.id} screen={screen} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;