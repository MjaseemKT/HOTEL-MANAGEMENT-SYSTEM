function submitFeedback() {
   
    var nameValue = document.getElementById("nameInput").value;
    var feedbackValue = document.getElementById("feedbackInput").value;

    // Check if both fields are filled
    if (nameValue.trim() === "" || feedbackValue.trim() === "") {
        alert("Please enter both Name and Feedback before submitting.");
        return;
    }

    // Get existing feedback data from local storage
    var existingFeedback = JSON.parse(localStorage.getItem("feedbackData")) || [];

    // Add new feedback to the array
    existingFeedback.push({ name: nameValue, feedback: feedbackValue });

    // Save the updated array back to local storage
    localStorage.setItem("feedbackData", JSON.stringify(existingFeedback));

    
    alert("Feedback submitted successfully!");

    // Clear input fields
    document.getElementById("nameInput").value = "";
    document.getElementById("feedbackInput").value = "";
}






document.addEventListener("DOMContentLoaded", function () {
    loadFeedbackData();
});

function loadFeedbackData() {
    // Get feedback data from local storage
    var feedbackData = JSON.parse(localStorage.getItem("feedbackData")) || [];

    // Get the table body
    var tableBody = document.getElementById("feedbackTable").getElementsByTagName('tbody')[0];

    
    tableBody.innerHTML = '';

    // Populate the table with feedback data
    for (var i = 0; i < feedbackData.length; i++) {
        var rowData = feedbackData[i];
        appendRowToTable(tableBody, rowData);
    }
}

function appendRowToTable(tableBody, data) {
    var row = tableBody.insertRow(-1);

    // Add cells to the row
    row.insertCell(0).textContent = data.name;
    row.insertCell(1).textContent = data.feedback;

    // Add Delete button
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.addEventListener("click", function () {
        deleteRow(row, data);
    });
    row.insertCell(2).appendChild(deleteButton);
}

function deleteRow(row, data) {
    // Remove the row from the table
    row.parentNode.removeChild(row);

    // Get feedback data from local storage
    var feedbackData = JSON.parse(localStorage.getItem("feedbackData")) || [];

    // Find and remove the corresponding data from the array
    var index = feedbackData.findIndex(function (item) {
        return item.name === data.name && item.feedback === data.feedback;
    });

    if (index !== -1) {
        feedbackData.splice(index, 1);

        // Save the updated data to local storage
        localStorage.setItem("feedbackData", JSON.stringify(feedbackData));
    }
}