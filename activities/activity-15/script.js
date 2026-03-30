const form = document.getElementById("appointmentForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        password: document.getElementById("password").value,
        gender: document.querySelector("input[name='gender']:checked")?.value || "",
        date: document.getElementById("date").value,
        age: document.getElementById("age").value,
        treatment: document.getElementById("treatment").value,
        comments: document.getElementById("comments").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        terms: document.querySelector("input[name='terms']").checked
    };

    console.log(formData);

    if (!validateForm(formData)) {
        return;
    }

    sendData(formData);
});

function validateForm(data) {
    let filledCount = 0;

    for (let key in data) {
        if (data[key] !== "" && data[key] !== false) {
            filledCount++;
        }
    }

    if (filledCount < 3) {
        alert("Please fill at least 3 fields.");
        return false;
    }

    if (data.age && (data.age < 0 || data.age > 120)) {
        alert("Please enter a valid age (0-120).");
        return false;
    }

    if (data.name.length > 0 && data.name.length < 2) {
        alert("Name must be at least 2 characters.");
        return false;
    }

    return true;
}

function sendData(data) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "response.json", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            const message = document.createElement("p");
            message.textContent = response.message;

            document.body.appendChild(message);

            form.reset();
        } else {
            alert("Error submitting form.");
        }
    };

    xhr.send();
}