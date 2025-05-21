# MicroIT Projects

Welcome to the **MicroIT_Projects** repository! This repo contains small but useful projects built with Python Flask and simple frontend technologies.

---

## Projects Included

### Project 11: Password Generator

A backend-powered secure password generator that allows users to create strong, random passwords with customizable criteria.

- **Features:**
  - Select password length (4 to 64 characters)
  - Choose to include uppercase, lowercase, digits, and special characters
  - Real-time password generation with error handling
- **Tech stack:** Flask backend, HTML/CSS/JavaScript frontend
- **Run locally:**
  1. Navigate to the `password` folder.
  2. Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
  3. Run the app:
     ```bash
     python app.py
     ```
  4. Open your browser at `http://127.0.0.1:5000`.

---

### Project 12: Stopwatch / Clock

A simple stopwatch and clock app that runs fully in the browser, with Flask serving the frontend HTML.

- **Features:**
  - Stopwatch with start, stop, and reset functionality
  - Real-time digital clock display
  - Responsive and user-friendly UI
- **Tech stack:** Flask backend (serves HTML), JavaScript frontend logic
- **Run locally:**
  1. Navigate to the `stopwatch` folder.
  2. Run the app:
     ```bash
     python app.py
     ```
  3. Open your browser at `http://127.0.0.1:5000`.

---

## Requirements

- Python 3.6+
- Flask (install via `pip install flask` or `requirements.txt` in the `password` folder)

---

## Repository Structure

MicroIT_Projects/
│
├── password/              # Project 11: Password Generator
│   ├── app.py             # Flask backend app
│   ├── index.html         # Frontend HTML page
│   └── requirements.txt   # Python dependencies for this project
│
├── stopwatch/             # Project 12: Stopwatch / Clock
│   ├── app.py             # Flask backend app
│   └── index.html         # Frontend HTML page
│
└── README.md              # Combined project documentation


---

## About

Developed by **Nallamothu Ayyappa Venkata Surya**.  
These projects serve as practical examples of using Flask to build lightweight web apps with Python and simple frontends.

---

## Contact

Feel free to reach out via GitHub: [https://github.com/nallamothusurya](https://github.com/nallamothusurya)
