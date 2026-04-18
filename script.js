async function loadStudents() {
    try {
        const res = await fetch("/students");
        const data = await res.json();

        let html = "";

        if (data.length === 0) {
            html = "<p>No students found</p>";
        } else {
            data.forEach(student => {
                html += `
                <div class="card">
                    <p><b>${student.name}</b></p>
                    <p>${student.email}</p>
                    <p>${student.course}</p>
                    <button onclick="deleteStudent(${student.id})">Delete</button>
                </div>`;
            });
        }

        document.getElementById("students").innerHTML = html;

    } catch (error) {
        console.error("Error loading students:", error);
    }
}

async function addStudent() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const course = document.getElementById("course").value;

    if (!name || !email || !course) {
        alert("Please fill all fields");
        return;
    }

    const student = { name, email, course };

    await fetch("/students", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    });

    // clear inputs
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("course").value = "";

    loadStudents();
}

async function deleteStudent(id) {
    await fetch(`/students/${id}`, {
        method: "DELETE"
    });

    loadStudents();
}

// Load data when page opens
loadStudents();

function goToLogin(role) {
    window.location.href = role + ".html";
}

function openModule(moduleName) {
    if (moduleName === "attendance") {
        window.location.href = "attendance.html";
    } 
    else if (moduleName === "fees") {
        window.location.href = "fees.html";
    } 
    else if (moduleName === "reports") {
        window.location.href = "reports.html";
    }
}