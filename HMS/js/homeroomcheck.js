function setDefaultDates(type) {
    var currentDate = new Date();

    // Set default check-in date to the current date
    document.getElementById("CheckInDate").valueAsDate = currentDate;
    document.getElementById("CheckOutDate").valueAsDate = currentDate;
}

function mapRoomType(type) {
    switch (type) {
        case "suite":
            return "AC suite";
        case "deluxe":
            return "AC deluxe";
        case "nonacsuite":
            return "Non-AC suite";
        case "nonacdeluxe":
            return "Non-AC deluxe";
        default:
            return type; 
    }
}

function bookNow() {
    // Get values from the form
    var roomType = document.getElementById("type").value;
    var checkInDate = document.getElementById("CheckInDate").value;
    var checkOutDate = document.getElementById("CheckOutDate").value;
    var numberOfPersons = document.getElementById("numberOfPerson").value;

    // Validate the input if needed
    if (!roomType || !checkInDate || !checkOutDate || !numberOfPersons) {
        alert("Please fill in all the details.");
        return;
    }

    var todayDate = new Date();
    var inputCheckInDate = new Date(checkInDate);
    var inputCheckOutDate = new Date(checkOutDate);
    todayDate.setHours(0, 0, 0, 0);

    // Check if the check-in date is today or later
    if (inputCheckInDate < todayDate) {
        alert("Check-in date must be today or later.");
        return;
    }

    // Check if the check-out date is today or later
    if (inputCheckOutDate < todayDate) {
        alert("Check-out date must be today or later.");
        return;
    }

    // Check if the check-in date is greater than the check-out date
    if (inputCheckInDate > inputCheckOutDate) {
        alert("Check-out date must be greater than or equal to the check-in date.");
        return;
    }

 

    // Check for existing bookings
    var existingBookings = JSON.parse(localStorage.getItem("bookingsNew")) || [];

    // Checking conditions and assigning status
    var status = "";

    var todayDate = new Date();

    if (inputCheckInDate.toDateString() === todayDate.toDateString()) {
        status = "Check In";
    } else if (inputCheckOutDate < todayDate) {
        status = "Check out";
    } else if (inputCheckInDate > todayDate) {
        status = "Reserved";
    } else {
        status = "Reserved";
    }

    // Map room type to desired values
    var mappedType = mapRoomType(roomType);

    // Check if the room is available for the selected dates
    var isRoomAvailable = existingBookings.every(function (booking) {
        return (
            booking.roomType !== mappedType ||
            inputCheckOutDate < new Date(booking.checkInDate) ||
            inputCheckInDate > new Date(booking.checkOutDate)
        );
    });

    if (!isRoomAvailable) {
        alert("Room is not available for the selected dates.");
        return;
    }
   

    // Calculate the number of days
    var startDate = inputCheckInDate;
    var endDate = inputCheckOutDate;
    var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    var numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  

    // Create an object with the values
    var bookingDetails = {
        roomType: mappedType,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        numberOfPersons: numberOfPersons,
        numberOfDays: numberOfDays,
        status: status,
    };

    // Save details in the 'bookingsNew' array
    var bookingsNew = JSON.parse(localStorage.getItem("bookingsNew")) || [];
    bookingsNew.push(bookingDetails);
    localStorage.setItem("bookingsNew", JSON.stringify(bookingsNew));

    // Display the number of days in the alert message
    alert("Booking successful!\nNumber of Days: " + numberOfDays);

    // Clear input fields
    document.getElementById("type").value = "";
    document.getElementById("CheckInDate").value = "";
    document.getElementById("CheckOutDate").value = "";
    document.getElementById("numberOfPerson").value = "";

    // Redirect to roombooking.html
    window.location.href = "roombooking.html";
}

// Set default dates when the page loads
setDefaultDates("suite");
setDefaultDates("deluxe");
setDefaultDates("nonacsuite");
setDefaultDates("nonacdeluxe");
