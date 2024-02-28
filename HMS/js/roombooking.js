function submitForm() {
    // Get form values
    var name = document.getElementById('name').value;
    var phNo = document.getElementById('phNo').value;
    var address = document.getElementById('address').value;
    var email = document.getElementById('email').value;

    // Check if all fields are filled
    if (!name || !phNo || !address || !email) {
        alert('Please fill in all the details.');
        return;
    }

    // Validate phone number
    var phNoInput = document.getElementById('phNo');
    validatePhoneNumber(phNoInput);

    // Check if phone number is valid
    var phNoError = document.getElementById('phNoError');
    if (phNoError.textContent !== '') {
        alert('Please fix the phone number error before submitting.');
        return;
    }

    // Create an array to store user details
    var userDetails = {
        name: name,
        phNo: phNo,
        address: address,
        email: email
    };



    // Get existing user details from local storage or create an empty array
    var existingDetails = JSON.parse(localStorage.getItem('userDetails')) || [];

    // Add new user details to the array
    existingDetails.push(userDetails);

    // Save the updated array back to local storage
    localStorage.setItem('userDetails', JSON.stringify(existingDetails));

    // Show success message
    alert('Submitted successfully.');

    // Clear input fields
    document.getElementById('name').value = '';
    document.getElementById('phNo').value = '';
    document.getElementById('address').value = '';
    document.getElementById('email').value = '';

    window.location.href = 'hms.html';
}

function validatePhoneNumber(input) {
    var phoneNumber = input.value;
    var regex = /^\d{10}$/;
    var phNoError = document.getElementById('phNoError');

    if (!regex.test(phoneNumber)) {
        phNoError.textContent = 'Please enter a valid 10-digit phone number.';
    } else {
        phNoError.textContent = '';
    }
}




function convertToUpperCase(input) {
    input.value = input.value.toUpperCase();
}
















function displayLastBookingDetails() {
    // Retrieve existing bookings from local storage
    var existingBookings = JSON.parse(localStorage.getItem('bookingsNew')) || [];

    // Check if there are any bookings
    if (existingBookings.length > 0) {
        // Get the last booking details
        var lastBooking = existingBookings[existingBookings.length - 1];

        // Update HTML elements with the last booking details
        document.getElementById('typeDisplay').innerText = 'Room Type: ' + lastBooking.roomType;
        document.getElementById('checkInDateDisplay').innerText = 'Check In Date: ' + lastBooking.checkInDate;
        document.getElementById('checkOutDateDisplay').innerText = 'Check Out Date: ' + lastBooking.checkOutDate;
        document.getElementById('numberOfDaysDisplay').innerText = 'Number Of Days: ' + lastBooking.numberOfDays;
        document.getElementById('numberOfPersonDisplay').innerText = 'Number Of Extra Person: ' + lastBooking.numberOfPersons;

        // Retrieve prices from local storage
        var newPrice1 = localStorage.getItem('newPrice1') || 'N/A';
        var newPrice2 = localStorage.getItem('newPrice2') || 'N/A';
        var newPrice3 = localStorage.getItem('newPrice3') || 'N/A';
        var newPrice4 = localStorage.getItem('newPrice4') || 'N/A';

        console.log('Room Type:', lastBooking.roomType);
        console.log('Prices:', newPrice1, newPrice2, newPrice3, newPrice4);
        
        switch (lastBooking.roomType) {
            case 'AC suite':
                priceDisplay.innerText = 'Price: ' + newPrice1;
                break;
            case 'AC deluxe':
                priceDisplay.innerText = 'Price: ' + newPrice2;
                break;
            case 'Non-AC suite':
                priceDisplay.innerText = 'Price: ' + newPrice3;
                break;
            case 'Non-AC deluxe':
                priceDisplay.innerText = 'Price: ' + newPrice4;
                break;
            default:
                priceDisplay.innerText = 'Price: N/A';
        }
        
        console.log('Updated Price:', priceDisplay.innerText);
        
    } 
}

// Call the function to display the last booking details when the page loads
window.onload = function () {
    displayLastBookingDetails();
};










