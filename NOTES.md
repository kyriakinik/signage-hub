# Signage Hub — Οδηγός Μελέτης & Σημειώσεις (Cheat-Sheet)

## 1. Η Αρχιτεκτονική Full-Stack (Η Μεγάλη Εικόνα)
```
[ Frontend: React / HTML / CSS / JS ]
                │
         HTTP (JSON)
                ▼
[ Backend: Django REST Framework ]
                │
           SQL Queries (ORM)
                ▼
[ Database: SQLite (db.sqlite3) ]
```

---

## 2. Django Backend — Τα Βασικά Concepts

### Α. Virtual Environment (`venv`)
- **Τι είναι:** Ένας απομονωμένος φάκελος με δική του εγκατάσταση Python και βιβλιοθηκών.
- **Γιατί:** Για να μην μπερδεύονται οι εκδόσεις διαφορετικών projects.
- **Εντολή δημιουργίας:** `python -m venv venv`
- **Εντολή ενεργοποίησης (CMD):** `venv\Scripts\activate.bat`

### Β. Project vs App
- **Project (`core`):** Ολόκληρη η εφαρμογή και οι κεντρικές ρυθμίσεις (`settings.py`, `urls.py`).
- **App (`screens`):** Ένα συγκεκριμένο feature (π.χ. διαχείριση οθονών). Περιέχει τα δικά του models, views, serializers.
- **Εντολή δημιουργίας app:** `python manage.py startapp screens`

### Γ. Models & ORM (`screens/models.py`)
- **Τι είναι:** Ορισμός της δομής της βάσης δεδομένων χρησιμοποιώντας Python κλάσεις.
- **ORM (Object-Relational Mapping):** Μηχανισμός που μετατρέπει αυτόματα τις Python κλάσεις σε SQL πίνακες χωρίς να γράφουμε SQL.
- **`__str__(self)`:** Μέθοδος που ορίζει πώς θα εμφανίζεται το αντικείμενο ως κείμενο (π.χ. στο Django Admin).

### Δ. Migrations (`makemigrations` & `migrate`)
1. **`python manage.py makemigrations`:** Διαβάζει το `models.py` και φτιάχνει το "σχέδιο" αλλαγών (`migrations/0001_initial.py`).
2. **`python manage.py migrate`:** Εφαρμόζει το σχέδιο στην πραγματική βάση δεδομένων (`db.sqlite3`).

### Ε. Django REST Framework (DRF)
- **Serializer (`serializers.py`):** 
  - *Serialization:* Μετατρέπει Python Objects σε JSON.
  - *Deserialization:* Μετατρέπει εισερχόμενο JSON σε Python Objects με ταυτόχρονο validation (έλεγχο εγκυρότητας).
- **ViewSet (`views.py`):**
  - Συγκεντρώνει όλη τη λογική CRUD (Create, Read, Update, Delete) σε μία κλάση.
- **DefaultRouter (`urls.py`):**
  - Παράγει αυτόματα τα URLs για όλες τις λειτουργίες CRUD (`GET`, `POST`, `PUT`, `DELETE`).

---

## 3. Βασικές Εντολές Django (Cheat-Sheet)
| Εντολή | Τι κάνει |
| :--- | :--- |
| `python manage.py runserver` | Ξεκινάει τον τοπικό web server στο `http://127.0.0.1:8000/` |
| `python manage.py makemigrations` | Δημιουργεί νέα αρχεία migration βάσει του `models.py` |
| `python manage.py migrate` | Εφαρμόζει τα migrations στη βάση δεδομένων |
| `python manage.py createsuperuser` | Δημιουργεί διαχειριστή για το `/admin/` |

## 4. Frontend Initialization (React + Vite)

### Architecture
- **Decoupled / Headless Architecture**: 
  - Backend: Django REST Framework (`http://localhost:8000`) -> Data Provider (JSON).
  - Frontend: React SPA via Vite (`http://localhost:5173`) -> Presentation Layer.
- **Same-Origin Policy & CORS**: Επειδή frontend και backend τρέχουν σε διαφορετικά ports, απαιτείται ρύθμιση CORS στο Django για να επιτρέπονται τα cross-origin αιτήματα.

### Key Tools & Terms
- **Vite**: Modern build tool που αξιοποιεί native ES Modules και esbuild για instant HMR (Hot Module Replacement) και ταχύτατο bundling.
- **React**: Declarative, Component-Based UI library. Χρησιμοποιεί Virtual DOM και αλγόριθμο συμφιλίωσης (Reconciliation) για βέλτιστα DOM updates.
- **JSX (JavaScript XML)**: Συντακτική ζάχαρη (syntactic sugar) για τη δημιουργία React elements μέσα σε JavaScript. Μεταγλωττίζεται σε κανονική JS κατά το build.

### Useful Commands
- `npm create vite@latest frontend -- --template react` (Scaffold project)
- `cd frontend && npm install` (Install dependencies)
- `npm run dev` (Start local development server)

### React Fundamentals
- **Functional Components**: Συναρτήσεις JavaScript που επιστρέφουν JSX (UI).
- **JSX Syntax Rules**:
  - Χρήση `className` αντί για `class` (λόγω reserved keyword στη JS).
  - Όλα τα tags πρέπει να κλείνουν αυτοτελώς (self-closing tags π.χ. `<img />`).
  - Επιστροφή ενός ενιαίου root element ή React Fragment (`<>...</>`).
- **HMR (Hot Module Replacement)**: Η δυνατότητα του Vite να αντικαθιστά modules στον browser εν ώρα εκτέλεσης χωρίς full page reload, διατηρώντας το state της εφαρμογής.

### Props & List Rendering
- **Props (Properties)**: Παράμετροι που περνάμε από Parent σε Child component. Είναι αυστηρά **read-only (immutable)**.
- **List Rendering (`.map()`)**: Μετατροπή πίνακα αντικειμένων σε πίνακα JSX elements.
- **The `key` Prop (Interview Must-Know)**: 
  - Υποχρεωτικό μοναδικό αναγνωριστικό (π.χ. `key={screen.id}`) σε κάθε στοιχείο λίστας.
  - Βοηθά τον αλγόριθμο Reconciliation του React να εντοπίζει ποια στοιχεία άλλαξαν/προστέθηκαν/διαγράφηκαν, αποτρέποντας περιττά re-renders ολόκληρου του DOM.

---

## 5. Πώς περιγράφω το Project στη Συνέντευξη (Elevator Pitch)

> *"Έφτιαξα το **Signage Hub**, μια full-stack cloud πλατφόρμα διαχείρισης ψηφιακών οθονών (Digital Signage). 
> Στο Backend χρησιμοποίησα **Python & Django REST Framework** για να στήσω ένα headless REST API με SQLite και Django ORM, υλοποιώντας πλήρες CRUD για τις οθόνες. 
> Στο Frontend χρησιμοποίησα **React με Vite**, οργανωμένο σε επαναχρησιμοποιήσιμα components (όπως το ScreenCard), διαχειριζόμενο το state με React Hooks (`useState`) και επικοινωνώντας ασύγχρονα με το API μέσω fetch."*

---

## 6. React με Απλές Αναλογίες (Mental Models)

- **Component (π.χ. `ScreenCard`)**: Σκέψου το σαν ένα **τουβλάκι LEGO**. Το φτιάχνεις μία φορά και το χρησιμοποιείς όσες φορές θες με διαφορετικό περιεχόμενο.
- **Props**: Οι **οδηγίες** που δίνεις στο τουβλάκι LEGO όταν το τοποθετείς (π.χ. *"εσύ είσαι η οθόνη Reception και είσαι online"*). Είναι αυστηρά **read-only** (το τουβλάκι δεν αλλάζει μόνο του τις οδηγίες του).
- **State (`useState`)**: Η **εσωτερική μνήμη** της εφαρμογής. Αν αλλάξει το state, το React ξαναζωγραφίζει αυτόματα την οθόνη.
- **Virtual DOM**: Το **πρόχειρο σχεδιάγραμμα σε χαρτί**. Πριν το React πάει να σκάψει και να αλλάξει τον πραγματικό browser (που είναι αργό), σχεδιάζει τις αλλαγές στο Virtual DOM και εφαρμόζει μόνο τη διαφορά.

---

## 7. SOS Ερωτήσεις Συνέντευξης (Q&A)

**Ερ. 1: Ποια η διαφορά μεταξύ Props και State;**
- **Props**: Δεδομένα που έρχονται *από έξω* (από τον γονέα). Είναι αμετάβλητα (immutable).
- **State**: Δεδομένα που ζουν *μέσα* στο component και μπορούν να αλλάξουν (mutable) με την πάροδο του χρόνου ή από ενέργειες του χρήστη.

**Ερ. 2: Γιατί βάζουμε `key` όταν κάνουμε `.map()`;**
- Βοηθά το React στον αλγόριθμο **Reconciliation**. Αν έχουμε 100 οθόνες και αλλάξει μόνο η μία, το React ξέρει από το `id` ποια συγκεκριμένη κάρτα να ενημερώσει, χωρίς να ξαναφτιάξει τις υπόλοιπες 99 (καλύτερο performance).

**Ερ. 3: Τι είναι το CORS και γιατί χρειάστηκε ρύθμιση;**
- **Cross-Origin Resource Sharing**. Επειδή το React τρέχει στο port `5173` και το Django στο port `8000`, ο browser θεωρεί ότι είναι διαφορετικά sites και μπλοκάρει τα αιτήματα για λόγους ασφαλείας. Βάλαμε το `django-cors-headers` για να επιτρέψουμε στο frontend να διαβάζει τα δεδομένα.