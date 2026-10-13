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
