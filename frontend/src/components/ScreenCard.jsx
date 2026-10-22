function ScreenCard({ screen, onDelete }) {
  const isOnline = screen.status === 'online';

  const handleDeleteClick = () => {
    // Ζητάμε επιβεβαίωση από τον χρήστη πριν τη διαγραφή
    const confirmed = window.confirm(`Είστε σίγουροι ότι θέλετε να διαγράψετε την "${screen.name}";`);
    if (confirmed) {
      onDelete(screen.id);
    }
  };

  return (
    <div className="screen-card">
      <div className="screen-card-header">
        <h3>{screen.name}</h3>
        <span className={`status-badge ${isOnline ? 'online' : 'offline'}`}>
          {screen.status.toUpperCase()}
        </span>
      </div>

      <p className="screen-location">
        📍 <strong>Τοποθεσία:</strong> {screen.location}
      </p>

      <div className="screen-message-box">
        <small>Προβαλλόμενο Μήνυμα:</small>
        <p>"{screen.message}"</p>
      </div>

      {/* Κουμπί Διαγραφής */}
      <button className="btn-delete" onClick={handleDeleteClick}>
        🗑️ Διαγραφή Οθόνης
      </button>
    </div>
  );
}

export default ScreenCard;