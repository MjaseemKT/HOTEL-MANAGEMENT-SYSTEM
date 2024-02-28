function displayLastBookingDetails1() {
    // Retrieve existing bookings from local storage
    var existingBookings = JSON.parse(localStorage.getItem('bookingsNew')) || [];

    // Check if there are any bookings
    if (existingBookings.length > 0) {
        // Get the last booking details
        var lastBooking = existingBookings[existingBookings.length - 1];

        // Update HTML elements with the last booking details
        document.getElementById('typeDisplay1').innerText = 'Room Type: ' + lastBooking.roomType;
        document.getElementById('checkInDateDisplay1').innerText = 'Check In Date: ' + lastBooking.checkInDate;
        document.getElementById('checkOutDateDisplay1').innerText = 'Check Out Date: ' + lastBooking.checkOutDate;
        document.getElementById('numberOfDaysDisplay1').innerText = 'Number Of Days: ' + lastBooking.numberOfDays;
        document.getElementById('numberOfPersonDisplay1').innerText = 'Number Of Extra Person: ' + lastBooking.numberOfPersons;
    } else {
        // If there are no bookings, you can display a message or perform any other action
        console.log('No bookings found.');
    }
}

// Call the function to display the last booking details when the page loads
window.onload = function () {
    displayLastBookingDetails1();
};



//old

function displayLastBookingDetails() {
    // Retrieve existing bookings from local storage
    var existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];

    // Check if there are any bookings
    if (existingBookings.length > 0) {
        // Get the last booking details
        var lastBooking = existingBookings[existingBookings.length - 1];

        // Update HTML elements with the last booking details
        document.getElementById('typeDisplay').innerText = 'Room Type: ' + lastBooking.type;
        document.getElementById('checkInDateDisplay').innerText = 'Check In Date: ' + lastBooking.checkInDate;
        document.getElementById('checkOutDateDisplay').innerText = 'Check Out Date: ' + lastBooking.checkOutDate;
        document.getElementById('numberOfDaysDisplay').innerText = 'Number Of Days: ' + lastBooking.numberOfDays;
        document.getElementById('numberOfPersonDisplay').innerText = 'Number Of Extra Person: ' + lastBooking.numberOfPerson;
    } else {
        // If there are no bookings, you can display a message or perform any other action
        console.log('No bookings found.');
    }
}

// Call the function to display the last booking details when the page loads
window.onload = function () {
    displayLastBookingDetails();
};













$(document).ready(function() {
    const addRowBtn = $("#addRowBtn");
    const saveBtn = $("#saveBtn");
    const tableBody = $("#tableBody");
    let bikesDetails = [];

    // Load existing data from local storage if any
    const storedBikes = localStorage.getItem("bikesDetails");
    if (storedBikes) {
        bikesDetails = JSON.parse(storedBikes);
        renderRows();
    }

    addRowBtn.on("click", function() {
        const newRow = createEmptyRow(); // Create a new empty row
        tableBody.append(newRow); // Append the new row
        attachEventListenersForNewRow(newRow); // Attach event listeners for the new row
    });

    saveBtn.on("click", function() {
        saveData();
    });

    function createEmptyRow() {
        const newRow = $("<tr>");
        newRow.html(`
            <td>${tableBody.children().length + 1}</td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td><input type="file" accept="image/*"></td>
            <td><button class="normalbikeEditBtn"><i class="fas fa-edit" style="color: green;"></i></button></td>
            <td><button class="normalbikeDeleteBtn"><i class="fas fa-trash-alt" style="color: red;"></i></button></td>
        `);
        return newRow;
    }

    function saveData() {
        let allDataFilled = true; // Flag to track if all row data is filled
        bikesDetails = [];
        tableBody.children().each(function() {
            const cells = $(this).find("td");
            const bike = {
                name: cells.eq(1).text().trim(),
                price: cells.eq(2).text().trim(),
                model: cells.eq(3).text().trim(),
                mileage: cells.eq(4).text().trim(),
                image: ""
            };

            const imageFile = cells.eq(5).find("input[type=file]").prop("files")[0];
            if (!bike.name || !bike.price || !bike.model || !bike.mileage || !imageFile) {
                allDataFilled = false;
                return false; // Exit loop if any field is empty
            }

            const reader = new FileReader();
            reader.onload = function(event) {
                bike.image = event.target.result; // Save image data as a data URL
                saveBikeDetails(bike);
            };
            reader.readAsDataURL(imageFile);
        });

        if (allDataFilled) {
            alert("Data saved successfully!");
        } else {
            alert("Please fill in all details for each row before saving.");
        }
    }

    function saveBikeDetails(bike) {
        bikesDetails.push(bike);
        localStorage.setItem("bikesDetails", JSON.stringify(bikesDetails));
    }

    function renderRows() {
        $.each(bikesDetails, function(index, bike) {
            const newRow = createEmptyRow();
            newRow.find("td").eq(1).text(bike.name);
            newRow.find("td").eq(2).text(bike.price);
            newRow.find("td").eq(3).text(bike.model);
            newRow.find("td").eq(4).text(bike.mileage);
            // Set the image if available
            if (bike.image) {
                const img = $("<img>");
                img.attr("src", bike.image);
                img.attr("alt", "Bike Image");
                img.css("max-width", "100px");
                newRow.find("td").eq(5).append(img);
            }
            tableBody.append(newRow);
            attachEventListenersForNewRow(newRow);
        });
    }

    function attachEventListenersForNewRow(row) {
        const editBtn = row.find(".normalbikeEditBtn");
        const deleteBtn = row.find(".normalbikeDeleteBtn");

        editBtn.on("click", function() {
            // Enable content editing for all cells except the first and last
            const cells = row.find("td");
            for (let i = 1; i < cells.length - 1; i++) {
                cells.eq(i).attr("contenteditable", true);
            }
            editBtn.html('<i class="fas fa-save" style="color: blue;"></i>');
            editBtn.removeClass("normalbikeEditBtn").addClass("normalbikeSaveBtn");
        });

        deleteBtn.on("click", function() {
            const index = row.index();
            row.remove();
            bikesDetails.splice(index, 1); // Remove the corresponding bike details from the array
            localStorage.setItem("bikesDetails", JSON.stringify(bikesDetails)); // Update local storage
            alert("Row deleted successfully!");
        });
    }
});


