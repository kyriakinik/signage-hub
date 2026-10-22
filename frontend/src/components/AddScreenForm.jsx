import { useState } from 'react';

function AddScreenForm({ onScreenAdded }) {
  // State για κάθε πεδίο εισαγωγής της φόρμας
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('Welcome!');
  const [status, setStatus] = useState('offline');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Η συνάρτηση που εκτελείται όταν πατάμε "Αποθήκευση"
  const handleSubmit = (e) => {
    e.preventDefault(); // Σταματάμε το αυτόματο reload του browser
    setIsSubmitting(true);

    const newScreen = {
      name: name,
      location: location,
      message: message,
      status: status,
    };

    // Κάνουμε HTTP POST request στο Django API
    fetch('http://127.0.0.1:8000/api/screens/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newScreen), // Μετατροπή σε string κειμένου
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Αποτυχία προσθήκης οθόνης');
        }
        return response.json(); // Παίρνουμε την αποθηκευμένη οθόνη (με το νέο της ID)
      })
      .then((savedScreen) => {
        // Ειδοποιούμε το App.jsx να προσθέσει την οθόνη στη λίστα
        onScreenAdded(savedScreen);

        // Καθαρίζουμε τα πεδία της φόρμας
        setName('');
        setLocation('');
        setMessage('Welcome!');
        setStatus('offline');
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error('Σφάλμα:', error);
        alert('Σφάλμα κατά την αποθήκευση της οθόνης.');
        setIsSubmitting(false);
      });
  };

  return (
    <form className="add-screen-form" onSubmit={handleSubmit}>
      <h3>➕ Προσθήκη Νέας Οθόνης</h3>

      <div className="form-group">
        <label>Όνομα Οθόνης:</label>
        <input
          type="text"
          placeholder="π.χ. Οθόνη Κυλικείου"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Τοποθεσία:</label>
        <input
          type="text"
          placeholder="π.χ. 2ος Όροφος"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Προβαλλόμενο Μήνυμα:</label>
        <input
          type="text"
          placeholder="π.χ. Προσφορά ημέρας..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Κατάσταση:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="offline">Offline</option>
          <option value="online">Online</option>
        </select>
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-submit">
        {isSubmitting ? 'Αποθήκευση...' : 'Αποθήκευση Οθόνης'}
      </button>
    </form>
  );
}

export default AddScreenForm;