# 📡 Signage Hub

> 🚧 **Status:** Under Active Development (Work in Progress)

Το **Signage Hub** είναι μια σύγχρονη Full-Stack εφαρμογή για την κεντρική διαχείριση, ενημέρωση και παρακολούθηση ψηφιακών οθονών (Digital Signage displays) σε πραγματικό χρόνο.

---

## 🏛️ Αρχιτεκτονική (Architecture)

Η εφαρμογή ακολουθεί **Decoupled (Headless)** αρχιτεκτονική:
- **Backend (API Provider):** Django REST Framework (`http://localhost:8000`)
- **Frontend (Client SPA):** React με Vite (`http://localhost:5173`)
- **Database:** SQLite (Relational ORM)

```
[ React SPA (Vite) ] ──(HTTP / JSON REST)──> [ Django REST Framework ] ──(ORM)──> [ SQLite DB ]
```

---

## 🛠️ Τεχνολογίες (Tech Stack)

- **Backend:** Python 3, Django, Django REST Framework, django-cors-headers
- **Frontend:** React, Vite, Modern JavaScript (ES Modules), CSS
- **Database:** SQLite3
- **Version Control:** Git & GitHub

---

## 🔌 API Endpoints (Screens)

Το backend εκθέτει τα παρακάτω REST endpoints μέσω του Django REST Framework:

| Μέθοδος | Endpoint | Περιγραφή |
| :--- | :--- | :--- |
| `GET` | `/api/screens/` | Ανάκτηση λίστας όλων των οθονών |
| `POST` | `/api/screens/` | Καταχώριση νέας οθόνης |
| `GET` | `/api/screens/<id>/` | Λεπτομέρειες συγκεκριμένης οθόνης |
| `PUT` / `PATCH` | `/api/screens/<id>/` | Ενημέρωση στοιχείων / κατάστασης οθόνης |
| `DELETE` | `/api/screens/<id>/` | Διαγραφή οθόνης |
| `GET` | `/admin/` | Περιβάλλον διαχείρισης Django Admin |

---

## 🚀 Οδηγός Τοπικής Εκτέλεσης (Local Setup)

### Προαπαιτούμενα
- Python 3.10+
- Node.js 18+ & npm
- Git

---

### 1. Ρύθμιση Backend (Django)

```bash
# Μετάβαση στον φάκελο backend
cd backend

# Δημιουργία virtual environment
python -m venv venv

# Ενεργοποίηση virtual environment:
# Windows (CMD):
venv\Scripts\activate.bat
# Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# macOS / Linux:
source venv/bin/activate

# Εγκατάσταση εξαρτήσεων
pip install -r requirements.txt

# Εφαρμογή migrations στη βάση δεδομένων
python manage.py migrate

# (Προαιρετικά) Δημιουργία διαχειριστή για το /admin
python manage.py createsuperuser

# Εκκίνηση του server
python manage.py runserver
```
📍 Ο Django server θα τρέχει στο: `http://127.0.0.1:8000/`

---

### 2. Ρύθμιση Frontend (React + Vite)

Σε ξεχωριστό παράθυρο τερματικού:

```bash
# Μετάβαση στον φάκελο frontend
cd frontend

# Εγκατάσταση πακέτων Node
npm install

# Εκκίνηση development server
npm run dev
```
📍 Η εφαρμογή React θα τρέχει στο: `http://localhost:5173/`

---

## 📁 Δομή Έργου (Project Structure)

```text
signage-hub/
├── backend/               # Django REST Framework backend
│   ├── core/              # Ρυθμίσεις project (settings, root urls)
│   ├── screens/           # Django app (models, views, serializers)
│   ├── manage.py          # Django CLI
│   └── requirements.txt   # Python dependencies
├── frontend/              # React frontend (Vite)
│   ├── src/               # React components, styles & logic
│   ├── public/            # Static assets
│   ├── index.html         # Single Page Application entry point
│   └── package.json       # Node.js dependencies & scripts
├── NOTES.md               # Οδηγός μελέτης & σημειώσεις αρχιτεκτονικής
└── README.md              # Τεκμηρίωση έργου
```

---

## 📋 Κατάσταση & Roadmap

- [x] Σχεδιασμός βάσης & μοντέλου `Screen`
- [x] Υλοποίηση REST API με CRUD λειτουργίες (`/api/screens/`)
- [x] Αρχικοποίηση React SPA μέσω Vite
- [x] Σύνδεση Frontend με το REST API (Data Fetching)
- [x] Dashboard προβολής οθονών (ScreenCard)
- [x] Προσθήκη νέας οθόνης από το Frontend (POST Form)
- [ ] Διαγραφή οθόνης / Toggle κατάστασης (DELETE / PATCH)
