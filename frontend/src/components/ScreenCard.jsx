function ScreenCard({ screen }) {
  // Ελέγχουμε αν η οθόνη είναι online για να δώσουμε ανάλογο στυλ
  const isOnline = screen.status === 'online';

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
    </div>
  );
}

export default ScreenCard;