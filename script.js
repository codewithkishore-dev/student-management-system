// ===== STUDENT STORAGE =====
function getStudents() {
    return JSON.parse(localStorage.getItem("students")) || [];
}

function saveStudents(students) {
    localStorage.setItem("students", JSON.stringify(students));
}

// ===== ADD STUDENT =====
function addStudent() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let course = document.getElementById("course").value.trim();

    if (!name || !email || !course) {
        alert("Please fill all fields");
        return;
    }

    let students = getStudents();

    students.push({
        id: Date.now(),
        name,
        email,
        course,
        present: 0,
        absent: 0,
        feePaid: false
    });

    saveStudents(students);
    loadStudents();

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("course").value = "";
}

// ===== LOAD STUDENTS =====
function loadStudents() {
    let students = getStudents();
    let html = "";

    students.forEach(s => {
        html += `
        <div class="card">
            <h3>${s.name}</h3>
            <p>${s.email}</p>
            <p>${s.course}</p>
            <button onclick="deleteStudent(${s.id})">Delete</button>
        </div>`;
    });

    document.getElementById("students").innerHTML = html;
}

// ===== DELETE =====
function deleteStudent(id) {
    let students = getStudents().filter(s => s.id !== id);
    saveStudents(students);
    loadStudents();
}

// ===== NAVIGATION =====
function goToLogin(role) {
    window.location.href = role + ".html";
}

function openModule(module) {
    window.location.href = module + ".html";
}

// Load on start
if (document.getElementById("students")) {
    loadStudents();
}

