// Validate Car Registration Number
function validateCarRegistrationNumber(input) {
  // Regular expression pattern for KL-01-AA-1234 format
  var pattern = /^[A-Z]{2}-\d{2}-[A-Z]{2}-\d{4}$/;

  if (!input.value.match(pattern)) {
    if (!input.dataset.errorShown) {
      alert('Car registration number should be in KL-01-AA-1234 format.');
      input.dataset.errorShown = true; // Set a flag to indicate that the error has been shown
    }
    input.value = ''; // Clear the input field
    input.focus(); // Set focus back to the input field
    return false
  } else {
    // Reset the error flag if the input is valid
    input.dataset.errorShown = false;
    return true
  }
}


// Initialize the fuel type dropdown
function initializeFuelTypeDropdown() {
  var fuelTypeDropdown = document.getElementById('fuelTypeDropdown');

  // Add options to the dropdown
  var options = ['Petrol', 'Diesel', 'EV'];
  for (var i = 0; i < options.length; i++) {
    var option = document.createElement('option');
    option.text = options[i];
    fuelTypeDropdown.add(option);
  }
}

// Call the initialize function when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeFuelTypeDropdown();
});
