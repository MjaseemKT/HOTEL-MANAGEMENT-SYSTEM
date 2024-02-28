// Function to update price and save to local storage
function updatePrice(inputId) {
    // Get the entered value
    var inputValue = document.getElementById(inputId).value;

    // Remove the previous entry for the key
    localStorage.removeItem(inputId);

    // Save the new value to local storage
    localStorage.setItem(inputId, inputValue);

    alert('Price updated!');
}

// Function to update the displayed price from local storage
function updateDisplayedPrice(inputId) {
    // Get the value from local storage
    var storedValue = localStorage.getItem(inputId);

    // Check if the value exists
    if (storedValue !== null) {
        // Set the value to the span element for displaying the price
        document.getElementById('displayPrice' + inputId.charAt(inputId.length - 1)).textContent = storedValue;
    }
}

// Function to print values from local storage to the specified h6 elements
function printLocalStorageValues() {
    // Set default values if not present in local storage
    for (let i = 1; i <= 4; i++) {
        var inputId = 'newPrice' + i;
        var storedValue = localStorage.getItem(inputId);

        if (storedValue === null) {
            // Set default values
            var defaultValue;
            switch (i) {
                case 1:
                    defaultValue = 7999;
                    break;
                case 2:
                    defaultValue = 5999;
                    break;
                case 3:
                    defaultValue = 4999;
                    break;
                case 4:
                    defaultValue = 3999;
                    break;
                default:
                    defaultValue = 0;
            }

            // Save default value to local storage
            localStorage.setItem(inputId, defaultValue);
        }

        // Call the function to update the displayed price
        updateDisplayedPrice(inputId);
    }
}

// Call the function to print values when the page loads
printLocalStorageValues();
