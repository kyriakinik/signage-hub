# Signage Hub — Οδηγός Μελέτης & Σημειώσεις (Cheat-Sheet)

## 1. Η Αρχιτεκτονική Full-Stack (Η Μεγάλη Εικόνα)
```
[ Frontend: React / Vite ] ──(HTTP JSON)──> [ Backend: Django REST ] ──(ORM)──> [ SQLite DB ]
  localhost:5173                               localhost:8000                     db.sqlite3
```

---

## 2. Πώς περιγράφω το Project (Elevator Pitch)
> *"Το **Signage Hub** είναι μια full-stack cloud πλατφόρμα διαχείρισης ψηφιακών οθονών (Digital Signage). 
> Επιτρέπει στον διαχειριστή να παρακολουθεί σε πραγματικό χρόνο ποιες οθόνες είναι online/offline, ποιο μήνυμα προβάλλουν, καθώς και να προσθέτει ή να διαγράφει οθόνες. 
> Στο Backend χρησιμοποίησα **Python & Django REST Framework** για να στήσω ένα headless REST API με SQLite και Django ORM. 
> Στο Frontend χρησιμοποίησα **React με Vite**, οργανωμένο σε επαναχρησιμοποιήσιμα components, διαχειριζόμενο το state με React Hooks (`useState`, `useEffect`) και επικοινωνώντας ασύγχρονα με το API μέσω fetch."*

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
- **DefaultRouter (`urls.py`):** Παράγει αυτόματα τα URLs για όλα τα endpoints (`/api/screens/`).

---

## 4. React Frontend — Βασικά Concepts

### Α. Core Όροι
- **Component**: Ανεξάρτητο, επαναχρησιμοποιήσιμο κομμάτι UI (σαν τουβλάκι LEGO). Είναι συνάρτηση JS που επιστρέφει JSX.
- **JSX**: JavaScript XML. Μοιάζει με HTML αλλά μεταγλωττίζεται σε JavaScript. (Κανόνας: `className` αντί για `class`).
- **Props**: Παράμετροι που περνάμε από Parent σε Child component. Είναι αυστηρά **read-only (immutable)**.
- **State (`useState`)**: Η εσωτερική μνήμη ενός component. Όταν αλλάζει το state, το React κάνει αυτόματα re-render το UI.
- **Side Effects (`useEffect`)**: Κώδικας που αλληλεπιδρά με τον έξω κόσμο (π.χ. `fetch` από το API). Με `[]` εκτελείται μόνο 1 φορά στο αρχικό φόρτωμα (on Mount).

---

## 5. Η "Γραμματική" του Κώδικα (JavaScript Syntax Cheat-Sheet)

### 1. Arrow Functions (`=>`)
Σύντομος τρόπος γραφής συναρτήσεων:
- Παραδοσιακό: `function(x) { return x * 2; }`
- Σύγχρονο (Arrow): `(x) => x * 2`

### 2. Events & Inputs: `(e) => setName(e.target.value)`
- `e`: Το Event αντικείμενο που δημιουργεί ο browser όταν πληκτρολογείς.
- `e.target`: Το HTML στοιχείο (`<input>`).
- `e.target.value`: Το κείμενο που υπάρχει μέσα στο input εκείνη τη στιγμή.
- `e.preventDefault()`: Σταματάει το αυτόματο reload της σελίδας όταν υποβάλλεται μια φόρμα.

### 3. Asynchronous Fetch & Promises (`.then` / `.catch`)
- `fetch(url)`: Στέλνει το αίτημα στο δίκτυο (επιστρέφει Promise).
- `.then(res => res.json())`: **Μόλις** απαντήσει ο server, μετάτρεψε το κείμενο σε JSON αντικείμενο.
- `.then(data => setScreens(data))`: **Μόλις** μετατραπεί, αποθήκευσέ το στο State.
- `.catch(err => ...)`: **Αν** κάτι αποτύχει, διαχειρίσου το σφάλμα (error state).

### 4. Spread Operator (`...`) & Immutability
- **Προσθήκη:** `setScreens([...screens, newScreen])` (Δεν κάνουμε `push`. Φτιάχνουμε καινούριο πίνακα στη μνήμη).
- **Διαγραφή:** `setScreens(screens.filter(s => s.id !== deletedId))` (Κρατάμε όλες τις οθόνες εκτός από τη διαγραμμένη).

### 5. JSON Μετατροπές
- `JSON.stringify(obj)`: Μετατρέπει αντικείμενο JS σε κείμενο string για αποστολή μέσω HTTP POST.
- `response.json()`: Μετατρέπει το κείμενο που λάβαμε πίσω σε αντικείμενο JS.

---

## 6. Top 8 Ερωτήσεις & Απαντήσεις (Mock Interview Script)

### Ερ. 1: "Πες μου λίγα λόγια για το project σου 'Signage Hub'."
- **Τι απαντάς:** *"Είναι μια full-stack cloud πλατφόρμα διαχείρισης ψηφιακών οθονών. Υλοποίησα Decoupled αρχιτεκτονική με Django REST Framework στο backend για την έκθεση REST endpoints και React με Vite στο frontend για τη δυναμική απεικόνιση και διαχείριση (CRUD) των οθονών σε πραγματικό χρόνο."*
- **Γιατί το ρωτάνε:** Ελέγχουν αν κατανοείς τη μεγάλη εικόνα του συστήματος και το tech stack.

### Ερ. 2: "Γιατί επέλεξες Decoupled (React + Django API) αντί για Django Templates;"
- **Τι απαντάς:** *"Για Διαχωρισμό Ευθυνών (Separation of Concerns) και Επεκτασιμότητα (Scalability). Το backend ασχολείται μόνο με τα δεδομένα. Έτσι, το ίδιο REST API μπορεί στο μέλλον να εξυπηρετεί τόσο το web dashboard όσο και φυσικά Raspberry Pi players (όπως στη Yodeck) ή mobile apps."*
- **Γιατί το ρωτάνε:** Δείχνει ότι σκέφτεσαι αρχιτεκτονικά και καταλαβαίνεις τη φιλοσοφία του προϊόντος της Yodeck.

### Ερ. 3: "Πώς επικοινωνεί το Django με τη βάση; Τι είναι το ORM και τα Migrations;"
- **Τι απαντάς:** *"Μέσω του Django ORM, ορίζουμε πίνακες ως Python κλάσεις (`models.py`) και το Django παράγει αυτόματα SQL queries. Με το `makemigrations` καταγράφουμε τις αλλαγές των μοντέλων σε αρχεία-σχέδια, και με το `migrate` τις εφαρμόζουμε στους φυσικούς πίνακες της SQLite."*
- **Γιατί το ρωτάνε:** Ελέγχουν αν ξέρεις πώς δουλεύουν οι βάσεις δεδομένων πίσω από το framework.

### Ερ. 4: "Ποιος είναι ο ρόλος του Serializer στο DRF;"
- **Τι απαντάς:** *"Λειτουργεί ως 'μεταφραστής'. Μετατρέπει Python Objects σε JSON για αποστολή στον client (Serialization) και επικυρώνει/μετατρέπει εισερχόμενα JSON δεδομένα σε Python objects για αποθήκευση στη βάση (Deserialization)."*
- **Γιατί το ρωτάνε:** Βασική γνώση για οποιοδήποτε REST API.

### Ερ. 5: "Τι είναι το CORS και πώς το αντιμετωπίσατε;"
- **Τι απαντάς:** *"Cross-Origin Resource Sharing. Επειδή το React τρέχει στο port 5173 και το Django στο 8000, ο browser μπλοκάρει τα αιτήματα λόγω Same-Origin Policy. Χρησιμοποιήσαμε το πακέτο `django-cors-headers` και το δηλώσαμε πρώτο στα Middlewares για να επιτρέπονται τα cross-origin requests."*
- **Γιατί το ρωτάνε:** Κλασικό θέμα web security και δικτύου.

### Ερ. 6: "Ποια η διαφορά μεταξύ Props και State στο React;"
- **Τι απαντάς:** *"Τα Props έρχονται από τον γονέα και είναι αυστηρά read-only (immutable). Το State είναι η εσωτερική μνήμη του component (`useState`), που όταν μεταβάλλεται προκαλεί αυτόματο re-render του UI."*
- **Γιατί το ρωτάνε:** Το θεμέλιο της λειτουργίας του React.

### Ερ. 7: "Τι κάνει το `useEffect` και γιατί βάλατε `[]` στο τέλος;"
- **Τι απαντάς:** *"Διαχειρίζεται Side Effects (όπως το API `fetch`) μετά το rendering. Ο άδειος πίνακας `[]` διασφαλίζει ότι το fetch θα εκτελεστεί αυστηρά μία φορά όταν φορτώνει το component (on mount), αποφεύγοντας άπειρα loops."*
- **Γιατί το ρωτάνε:** Έλεγχος κατανόησης του lifecycle των React components.

### Ερ. 8: "Πώς υλοποίησες την Προσθήκη και τη Διαγραφή; Γιατί όχι `push` ή `splice`;"
- **Τι απαντάς:** *"Στην προσθήκη κάναμε POST και ανανεώσαμε το state με Spread Operator: `[...prev, newScreen]`. Στη διαγραφή κάναμε DELETE και φιλτράραμε με `.filter()`. Αποφεύγουμε μεθόδους mutation (`push`, `splice`) γιατί στο React τηρούμε αυστηρά το Immutability ώστε να ανιχνεύεται η αλλαγή στη μνήμη και να γίνεται re-render."*
- **Γιατί το ρωτάνε:** Δείχνει προχωρημένη κατανόηση του πώς δουλεύει η μνήμη στο React.

---

## 7. Βασικές Εντολές (Cheat-Sheet)

| Εντολή | Τι κάνει |
| :--- | :--- |
| `python manage.py runserver` | Ξεκινάει το Django backend (`http://127.0.0.1:8000/`) |
| `python manage.py makemigrations` | Δημιουργεί νέα migrations βάσει αλλαγών στα models |
| `python manage.py migrate` | Εφαρμόζει τα migrations στη βάση SQLite |
| `npm run dev` | Ξεκινάει το Vite development server (`http://localhost:5173/`) |
| `npm install` | Εγκαθιστά τα dependencies του `package.json` |