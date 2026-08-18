const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

let students = [
    { id: 1, name: "Alice", age: 20, course: "Computer Science" },
    { id: 2, name: "Bob", age: 21, course: "Information Technology" },
    { id: 3, name: "Charlie", age: 19, course: "Electronics" }
];

app.get("/", (req, res) => {
    res.send("Welcome to Experiment 12");
});

app.get("/api/students", (req, res) => {
    res.json(students);
});

app.get("/api/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});

app.post("/api/students", (req, res) => {
    const { name, age, course } = req.body;

    if (!name || !age || !course) {
        return res.status(400).json({
            message: "Name, age and course are required"
        });
    }

    const newStudent = {
        id: students.length + 1,
        name,
        age: parseInt(age),
        course
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});

app.put("/api/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, age, course } = req.body;

    if (name) student.name = name;
    if (age) student.age = parseInt(age);
    if (course) student.course = course;

    res.json({
        message: "Student updated successfully",
        student
    });
});

app.delete("/api/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(index, 1);

    res.json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});

app.get("/students", (req, res) => {
    res.render("index", {
        title: "Student Management System",
        students
    });
});

app.post("/student", (req, res) => {
    const { name, age, course } = req.body;

    res.send(`
        <h1>Student Data Received</h1>
        <p>Name: ${name}</p>
        <p>Age: ${age}</p>
        <p>Course: ${course}</p>
        <a href="/students">Back to Students</a>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});