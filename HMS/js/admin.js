document.addEventListener("DOMContentLoaded", function () {
    displayBookingDetails();
});

function displayBookingDetails() {
    var detailsTable = document.getElementById('detailsTable');
    var existingBookings = JSON.parse(localStorage.getItem('bookingsNew')) || [];

    detailsTable.innerHTML = '<thead><tr><th>SL.No</th><th>Room type</th><th>Check In Date</th><th>Check Out Date</th><th>No.Of Days</th><th>No.Of Extra Persons</th><th>Status</th><th>Edit</th><th>Delete</th></tr></thead><tbody></tbody>';

    existingBookings.forEach(function (booking, index) {
        var row = detailsTable.insertRow(-1);
        for (var i = 0; i <= 6; i++) {
            var cell = row.insertCell(i);
            cell.innerHTML = (i === 0) ? index + 1 : booking[getPropertyName(i)];
        }

        var editButton = createIconButton('fas fa-edit', 'w3-button w3-round w3-blue', function () {
            enableBookingEditMode(row, index);
        });
        var deleteButton = createIconButton('fas fa-trash', 'w3-button w3-round w3-red', function () {
            deleteBooking(index);
        });

        row.insertCell(7).appendChild(editButton);
        row.insertCell(8).appendChild(deleteButton);
    });
}

function addBookingDetails() {
    var roomType = getValue('roomType');
    var checkInDate = getValue('checkInDate');
    var checkOutDate = getValue('checkOutDate');
    var numberOfDays = getValue('numberOfDays');
    var numberOfPersons = getValue('numberOfPersons');
    var status = getValue('status');


    
    
    
     var newBookingDetails = {
        roomType: roomType,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        numberOfDays: numberOfDays,
        numberOfPersons: numberOfPersons,
        status: status,
    };

    var existingBookings = JSON.parse(localStorage.getItem('bookingsNew')) || [];
    existingBookings.push(newBookingDetails);
    localStorage.setItem('bookingsNew', JSON.stringify(existingBookings));

    displayBookingDetails();
}

function enableBookingEditMode(row, index) {
    var cells = row.cells;

    for (var i = 1; i <= 6; i++) {
        var input = createInput(cells[i].innerText);
        cells[i].innerHTML = '';
        cells[i].appendChild(input);
    }

    var saveButton = createIconButton('fas fa-save', 'w3-button w3-round w3-green', function () {
        saveEditedBookingData(row, index);
    });
    row.cells[7].querySelector('.edit-button').style.display = "none";
    row.cells[7].appendChild(saveButton);
}

function saveEditedBookingData(row, index) {
    var cells = row.cells;
    var editedBookingData = {
        roomType: cells[1].querySelector('input').value,
        checkInDate: cells[2].querySelector('input').value,
        checkOutDate: cells[3].querySelector('input').value,
        numberOfDays: cells[4].querySelector('input').value,
        numberOfPersons: cells[5].querySelector('input').value,
        status: cells[6].querySelector('input').value
    };

    var existingBookings = JSON.parse(localStorage.getItem('bookingsNew')) || [];
    existingBookings[index] = editedBookingData;
    localStorage.setItem('bookingsNew', JSON.stringify(existingBookings));

    displayBookingDetails();
    alert("saved successfuly!");
}

function deleteBooking(index) {
    var existingBookings = JSON.parse(localStorage.getItem('bookingsNew')) || [];
    existingBookings.splice(index, 1);
    localStorage.setItem('bookingsNew', JSON.stringify(existingBookings));

    displayBookingDetails();
    alert("Deleted successfully!");
}

function createInput(value) {
    var input = document.createElement('input');
    input.value = value;
    return input;
}

function createIconButton(iconClass, buttonClass, onClick) {
    var button = document.createElement('button');
    button.innerHTML = '<i class="' + iconClass + '"></i>';
    button.className = buttonClass + ' edit-button';
    button.onclick = onClick;
    return button;
}

function getValue(elementId) {
    return document.getElementById(elementId).value;
}

function getPropertyName(index) {
    var propertyNames = ['SL.No', 'roomType', 'checkInDate', 'checkOutDate', 'numberOfDays', 'numberOfPersons', 'status'];
    return propertyNames[index];
}


















document.addEventListener("DOMContentLoaded", function () {
    loadContactDetails();
});

function loadContactDetails() {
    var existingContactDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
    var contactTableBody = document.querySelector("#contactdetailsTable tbody");
    contactTableBody.innerHTML = '';

    existingContactDetails.forEach(function (contact, index) {
        var row = contactTableBody.insertRow(index);
        row.insertCell(0).innerText = index + 1;
        row.insertCell(1).innerText = contact.name;
        row.insertCell(2).innerText = contact.phNo;
        row.insertCell(3).innerText = contact.address;
        row.insertCell(4).innerText = contact.email;

        var editSaveCell = row.insertCell(5);

        var editButton = document.createElement("button");
        editButton.innerHTML = '<i class="fas fa-edit"></i>'; // FontAwesome edit icon
        editButton.className = "edit-button";
        editButton.onclick = function () {
            enableContactEditMode(row, index);
        };
        editSaveCell.appendChild(editButton);



        var saveButton = document.createElement("button");
        saveButton.innerHTML = '<i class="fas fa-save"></i>'; // FontAwesome save icon
        saveButton.className = "save-button";
        saveButton.style.display = "none"; // Initially hidden
        saveButton.onclick = function () {
            saveEditedContactData(row, index);
        };
        editSaveCell.appendChild(saveButton);

        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; // FontAwesome trash icon
        deleteButton.className = "delete-button";
        deleteButton.onclick = function () {
            existingContactDetails.splice(index, 1);
            localStorage.setItem("userDetails", JSON.stringify(existingContactDetails));
            loadContactDetails();
            alert("Deleted successfully!");
        };
        row.insertCell(6).appendChild(deleteButton);
    });
}

function addContactDetails() {
    var contactName = document.getElementById('contactName').value;
    var contactPhNo = document.getElementById('contactPhNo').value;
    var contactAddress = document.getElementById('contactAddress').value;
    var contactEmail = document.getElementById('contactEmail').value;

    var newContactDetails = {
        name: contactName,
        phNo: contactPhNo,
        address: contactAddress,
        email: contactEmail
    };


    var existingContactDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
    existingContactDetails.push(newContactDetails);
    localStorage.setItem("userDetails", JSON.stringify(existingContactDetails));

    loadContactDetails();
}

function enableContactEditMode(row, index) {
    var cells = row.getElementsByTagName("td");

    for (var i = 1; i <= 4; i++) { // Assuming columns 1 to 4 are editable
        var input = document.createElement("input");
        input.value = cells[i].innerText;
        cells[i].innerHTML = '';
        cells[i].appendChild(input);
    }
    row.cells[5].querySelector(".edit-button").style.display = "none";
    row.cells[5].querySelector(".save-button").style.display = "inline-block";
}



function saveEditedContactData(row, index) {
    var cells = row.getElementsByTagName("td");

    var editedContactData = {
        name: cells[1].querySelector("input").value,
        phNo: cells[2].querySelector("input").value,
        address: cells[3].querySelector("input").value,
        email: cells[4].querySelector("input").value
    };
    alert("saved successfuly!");

    var existingContactDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
    existingContactDetails[index] = editedContactData;
    localStorage.setItem("userDetails", JSON.stringify(existingContactDetails));

    loadContactDetails();
}





function exportToExcel1() {
    const $table = $("#detailsTable");

  
        const $tableCopy = $table.clone();

        // Remove "Edit" and "Delete" columns
        $tableCopy.find("thead th:contains('Edit'), thead th:contains('Delete')").remove();
        $tableCopy.find("tbody tr").each(function () {
            $(this).find("td:eq(" + $(this).find("td").index($(this).find("td:contains('Edit'), td:contains('Delete')")) + ")").remove();
        });

        // Convert the modified table to Excel sheet
        const ws = XLSX.utils.table_to_sheet($tableCopy[0]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Room Booking Details");

        // Generate XLSX file and download
        XLSX.writeFile(wb, "exported_room_booking_data.xlsx");
        alert("Generated XLSX file for Room Booking Details.");
    }
function exportToExcel2() {
    const $table = $("#contactdetailsTable");

    if ($table.find("tbody tr").length) {
        const $tableCopy = $table.clone();

        // Remove "Edit" and "Delete" columns
        $tableCopy.find("thead th:contains('Edit'), thead th:contains('Delete')").remove();
        $tableCopy.find("tbody tr").each(function () {
            $(this).find("td:eq(" + $(this).find("td").index($(this).find("td:contains('Edit'), td:contains('Delete')")) + ")").remove();
        });

        // Convert the modified table to Excel sheet
        const ws = XLSX.utils.table_to_sheet($tableCopy[0]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Customer Details");

        // Generate XLSX file and download
        XLSX.writeFile(wb, "exported_customer_data.xlsx");
        alert("Generated XLSX file for Customer Details.");
    } else {
        alert("Customer Details table is empty");
    }
}
