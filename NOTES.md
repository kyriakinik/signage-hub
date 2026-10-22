# Signage Hub — Οδηγός Μελέτης & Σημειώσεις (Cheat-Sheet)

## 1. Η Αρχιτεκτονική Full-Stack (Η Μεγάλη Εικόνα)
```
[ Frontend: React / Vite ] ──(HTTP JSON)──> [ Backend: Django REST ] ──(ORM)──> [ SQLite DB ]
  localhost:5173                               localhost:8000                     db.sqlite3
```

---

## 2. Πώς περιγράφω το Project στη Συνέντευξη (Elevator Pitch)
> *"Έφτιαξα το **Signage Hub**, μια full-stack cloud πλατφόρμα διαχείρισης ψηφιακών οθονών (Digital Signage). 
> Στο Backend χρησιμοποίησα **Python & Django REST Framework** για να στήσω ένα headless REST API με SQLite και Django ORM, υλοποιώντας πλήρες CRUD για τις οθόνες. 
> Στο Frontend χρησιμοποίησα **React με Vite**, οργανωμένο σε επαναχρησιμοποιήσιμα components (όπως το ScreenCard και AddScreenForm), διαχειριζόμενο το state με React Hooks (`useState`, `useEffect`) και επικοινωνώντας ασύγχρονα με το API μέσω fetch."*

---

## 3. Django Backend — Βασικά Concepts

### Α. Virtual Environment (`venv`)
- **Τι είναι:** Απομονωμένος φάκελος με δική του Python και βιβλιοθήκες.
- **Γιατί:** Για να μην συγκρούονται οι εκδόσεις διαφορετικών projects.
- **Εντολή δημιουργίας:** `python -m venv venv`
- **Ενεργοποίηση (PowerShell):** `.\venv\Scripts\Activate.ps1` (ή `venv\Scripts\activate.bat`)

### Β. Models & ORM (`screens/models.py`)
- **Model:** Python κλάση που ορίζει τη δομή ενός πίνακα στη βάση (πεδία `name`, `location`, `status`, `message`).
- **ORM (Object-Relational Mapping):** Μετατρέπει αυτόματα τις Python κλάσεις σε SQL ερωτήματα χωρίς να γράφουμε raw SQL.

### Γ. Migrations (`makemigrations` & `migrate`)
1. `python manage.py makemigrations`: Διαβάζει το `models.py` και φτιάχνει το σχέδιο αλλαγών.
2. `python manage.py migrate`: Εφαρμόζει το σχέδιο στην πραγματική βάση δεδομένων (`db.sqlite3`).

### Δ. Django REST Framework (DRF)
- **Serializer (`serializers.py`):** "Μεταφραστής". Μετατρέπει Django Objects σε JSON (για έξοδο) και JSON σε Django Objects με validation (για είσοδο).
- **ViewSet (`views.py`):** Συγκεντρώνει όλη τη λογική CRUD (GET, POST, PUT, DELETE) σε μία κλάση.
- **DefaultRouter (`urls.py`):** Παράγει αυτόματα τα URLs για όλα τα endpoints.

---

## 4. React Frontend — Βασικά Concepts

### Α. Core Όροι
- **Component**: Ανεξάρτητο, επαναχρησιμοποιήσιμο κομμάτι UI (σαν τουβλάκι LEGO). Είναι συνάρτηση JS που επιστρέφει JSX.
- **JSX**: JavaScript XML. Μοιάζει με HTML αλλά μεταγλωττίζεται σε JavaScript. (Κανόνας: `className` αντί για `class`).
- **Props**: Παράμετροι που περνάμε από Parent σε Child component. Είναι αυστηρά **read-only (immutable)**.
- **State (`useState`)**: Η εσωτερική μνήμη ενός component. Όταν αλλάζει το state, το React κάνει αυτόματα re-render το UI.
- **Side Effects (`useEffect`)**: Κώδικας που αλληλεπιδρά με τον έξω κόσμο (π.χ. `fetch` από το API). Με `[]` εκτελείται μόνο 1 φορά στο αρχικό φόρτωμα.

---

## 5. Η "Γραμματική" του Κώδικα (JavaScript Syntax Cheat-Sheet)

### 1. Arrow Functions (`=>`)
Σύντομος τρόπος γραφής συναρτήσεων.
- Παραδοσιακό: `function(x) { return x * 2; }`
- Σύγχρονο (Arrow): `(x) => x * 2`

### 2. Events & Inputs: `(e) => setName(e.target.value)`
- `e`: Το Event αντικείμενο που δημιουργεί ο browser όταν πληκτρολογείς.
- `e.target`: Το HTML στοιχείο (`<input>`).
- `e.target.value`: Το κείμενο που υπάρχει μέσα στο input εκείνη τη στιγμή.
- `e.preventDefault()`: Σταματάει το αυτόματο reload της σελίδας όταν υποβάλλεται μια φόρμα.

### 3. Asynchronous Fetch & Promises (`.then` / `.catch`)
- `fetch(url)`: Στέλνει το αίτημα στο δίκτυο (επιστρέφει Promise / υπόσχεση).
- `.then(res => res.json())`: **Μόλις** απαντήσει ο server, μετάτρεψε το κείμενο σε JSON αντικείμενο.
- `.then(data => setScreens(data))`: **Μόλις** μετατραπεί, αποθήκευσέ το στο State.
- `.catch(err => ...)`: **Αν** κάτι αποτύχει (π.χ. κλειστό backend), διαχειρίσου το σφάλμα.

### 4. Spread Operator (`...`) & Immutability
- ΛΑΘΟΣ: `screens.push(newScreen)` (Αλλάζει τον ίδιο πίνακα, το React δεν το παίρνει χαμπάρι και δεν ανανεώνει).
- ΣΩΣΤΟ: `setScreens([...screens, newScreen])` (Ανοίγει τα παλιά στοιχεία και φτιάχνει **καινούριο** πίνακα στη μνήμη).

### 5. JSON Μετατροπές
- `JSON.stringify(obj)`: Μετατρέπει αντικείμενο JS σε απλό string κειμένου για αποστολή μέσω HTTP POST.
- `response.json()`: Μετατρέπει το κείμενο που λάβαμε πίσω σε αντικείμενο JS.

---

## 6. SOS Ερωτήσεις Συνέντευξης (Q&A)

**Ερ. 1: Ποια η διαφορά μεταξύ Props και State;**
- **Props**: Δεδομένα που έρχονται *από έξω* (από τον γονέα). Είναι αμετάβλητα (immutable).
- **State**: Δεδομένα που ζουν *μέσα* στο component και μπορούν να αλλάξουν (mutable) μέσω της συνάρτησης `setState`.

**Ερ. 2: Γιατί βάζουμε `key` όταν κάνουμε `.map()`;**
- Βοηθά το React στον αλγόριθμο **Reconciliation**. Αν έχουμε 100 οθόνες και αλλάξει μόνο η μία, το React ξέρει από το μοναδικό `id` ποια συγκεκριμένη κάρτα να ενημερώσει, χωρίς να ξαναφτιάξει τις υπόλοιπες 99 (καλύτερο performance).

**Ερ. 3: Τι είναι το CORS και πώς το αντιμετωπίσαμε;**
- **Cross-Origin Resource Sharing**. Επειδή το React τρέχει στο port `5173` και το Django στο port `8000`, ο browser μπλοκάρει τα αιτήματα για λόγους ασφαλείας (Same-Origin Policy). Εγκαταστήσαμε το `django-cors-headers` στο backend και ρυθμίσαμε το middleware ώστε να επιτρέπει τα αιτήματα από το frontend.

**Ερ. 4: Πώς χειρίζεσαι τα network requests στο UI;**
- Πάντα με 3 καταστάσεις (States):
  1. `loading`: Ένδειξη αναμονής όσο ταξιδεύουν τα δεδομένα.
  2. `error`: Μήνυμα σφάλματος αν ο server είναι κλειστός.
  3. `data`: Εμφάνιση των δεδομένων μόλις ληφθούν.

---

## 7. Βασικές Εντολές (Cheat-Sheet)

| Εντολή | Τι κάνει |
| :--- | :--- |
| `python manage.py runserver` | Ξεκινάει το Django backend (`http://127.0.0.1:8000/`) |
| `python manage.py makemigrations` | Δημιουργεί νέα migrations βάσει αλλαγών στα models |
| `python manage.py migrate` | Εφαρμόζει τα migrations στη βάση SQLite |
| `npm run dev` | Ξεκινάει το Vite development server (`http://localhost:5173/`) |
| `npm install` | Εγκαθιστά τα dependencies του `package.json` |