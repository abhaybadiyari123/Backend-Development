# Lecture 03 Backend Lab

This repository contains Tasks 1 to 8 from the provided Lecture 03 PDF.

The code inside `task1-express` through `task7-flask` follows the examples in
the PDF. Task 8 contains the DevTools instructions.

The `lab-modifications` folder contains the two changes required by the lab:

1. Express route `/students/branch/:branch`
2. Flask route `POST /students`

## Install Express and EJS

Run this command once from the main project folder:

```bash
npm install
```

To run an Express task, for example Task 3:

```bash
node task3-express/server.js
```

## Install Flask

```bash
python -m venv venv
```

Windows:

```bash
venv\Scripts\activate
pip install -r requirements.txt
python task7-flask/app.py
```

macOS/Linux:

```bash
source venv/bin/activate
pip install -r requirements.txt
python task7-flask/app.py
```

Only run one server at a time. Press `Ctrl+C` before running another task.
