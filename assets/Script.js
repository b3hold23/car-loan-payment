document.addEventListener("DOMContentLoaded", function () {
  // Run validation, inputs, and monthly payment on form submit.
  document
    .getElementById("submit-button")
    .addEventListener("click", function (event) {
      event.preventDefault();
      if (validateForm(event)) {
        submitInputs();
        updateMonthlyPayment();
        showMonthlyPaymentContainer();
      }
    });

  // Validate the inputs with validation modal.
  function validateForm(event) {
    let vehiclePriceInput = document
      .getElementById("vehicle-price")
      .value.trim();
    let downPaymentInput = document.getElementById("down-payment").value.trim();
    let loanTermInput = document.getElementById("loan-term").value.trim();

    if (vehiclePriceInput === "") {
      displayValidationModal("Please enter the Vehicle Price or MSRP");
      return false;
    }

    if (isNaN(vehiclePriceInput) || parseFloat(vehiclePriceInput) <= 0) {
      displayValidationModal(
        "Please enter a positive number without symbols for the Vehicle Price or MSRP"
      );
      return false;
    }

    let formattedVehiclePrice = parseFloat(vehiclePriceInput).toFixed(2);
    document.getElementById("vehicle-price").value = formattedVehiclePrice;

    if (downPaymentInput === "") {
      displayValidationModal("Please enter the Down Payment or enter 0");
      return false;
    }

    if (isNaN(downPaymentInput) || parseFloat(downPaymentInput) < 0) {
      displayValidationModal(
        "Please enter a positive number without symbols for the Down Payment"
      );
      return false;
    }

    let formattedDownPayment = parseFloat(downPaymentInput).toFixed(2);
    document.getElementById("down-payment").value = formattedDownPayment;

    if (
      loanTermInput === "" ||
      isNaN(loanTermInput) ||
      parseFloat(loanTermInput) <= 0
    ) {
      displayValidationModal(
        "Please enter a positive number for the Loan Term"
      );
      return false;
    }

    document.getElementById("loan-term").value = parseFloat(loanTermInput);

    return true;
  }

  // Run the validation modal based on data validation.
  function displayValidationModal(message) {
    // Set the validation modal message using jQuery.
    $("#validationMessage").text(message);

    // Show the validation modal using Bootstrap 5.
    $("#validationModal").modal("show");
  }

  // Initial load: get inputs from local storage and update displays.
  window.addEventListener("load", function () {
    let savedVehiclePrice = localStorage.getItem("vehicle-price");
    let savedDownPayment = localStorage.getItem("down-payment");
    let savedLoanTerm = localStorage.getItem("loan-term");

    if (savedVehiclePrice) {
      document.getElementById("vehicle-price").value = savedVehiclePrice;
    }

    if (savedDownPayment) {
      document.getElementById("down-payment").value = savedDownPayment;
    }

    if (savedLoanTerm) {
      document.getElementById("loan-term").value = savedLoanTerm;
    }

    updateMonthlyPayment();
  });

  // Create button for displaying saving tips.
  window.addEventListener("load", function () {
    let tipButtonContainer = document.getElementById("tips-button-container");
    let tipButton = document.createElement("button");
    tipButton.setAttribute("id", "tips-button");
    tipButton.setAttribute("class", "btn btn-background btn-text-color");
    tipButton.textContent = `Tips`;
    tipButtonContainer.appendChild(tipButton);

    tipButton.addEventListener("click", showTips);
  });

  // Display saving tips on button click.
  function showTips() {
    let tipsContainer = document.getElementById("show-tips-container");

    let existingTips = document.getElementById("show-tips");
    if (existingTips) {
      return;
    }

    let tipsElement = document.createElement("p");
    tipsElement.setAttribute("id", "show-tips");
    tipsElement.textContent = `Check the market adjustment, loan charges, add-ons, dealer fees, service charges, registration fees, and sales tax.`;
    tipsContainer.appendChild(tipsElement);
  }

  // Integrate slider with local storage.
  const loanTermSlider = document.getElementById("loan-term");
  const loanTermValueSpan = document.getElementById("loan-term-value");

  // Update loan term value span on input change
  function updateLoanTermValue() {
    loanTermValueSpan.textContent = loanTermSlider.value;
  }

  // Initial update from local storage
  let savedLoanTerm = localStorage.getItem("loan-term");
  if (savedLoanTerm) {
    loanTermSlider.value = savedLoanTerm;
    updateLoanTermValue(); // Update the displayed value initially
  }

  // Listen for input changes on loan term slider
  loanTermSlider.addEventListener("input", function () {
    updateLoanTermValue();
    // Update local storage with the current slider value
    localStorage.setItem("loan-term", loanTermSlider.value);
  });

  // Update loan term value when the input field changes
  document.getElementById("loan-term").addEventListener("input", function () {
    loanTermValueSpan.textContent = this.value;
    // Update local storage with the current input field value
    localStorage.setItem("loan-term", this.value);
  });
});

// Show the payment container on submit.
function showMonthlyPaymentContainer() {
  let container = document.getElementById("monthly-payment-container");
  container.style.display = "block";
}

// Function to show quote modal
function showQuoteModal() {
  const quoteModal = new bootstrap.Modal(document.getElementById("quoteModal"));
  quoteModal.show();

  document
    .getElementById("submit-quote")
    .addEventListener("click", submitQuote);
}

// Save inputs to local storage.
function submitInputs() {
  let vehiclePrice = document.getElementById("vehicle-price").value;
  let downPayment = document.getElementById("down-payment").value;
  let loanTerm = document.getElementById("loan-term").value;

  localStorage.setItem("vehicle-price", vehiclePrice);
  localStorage.setItem("down-payment", downPayment);
  localStorage.setItem("loan-term", loanTerm);

  showQuoteModal();
}

function submitQuote() {
  let quoteInput = document.getElementById("quote-input").value;
  localStorage.setItem("quote-input", quoteInput);
  updateMonthlyPayment();
}

// Get data from local storage.
function updateMonthlyPayment(quoteInput) {
  let vehiclePrice = parseFloat(localStorage.getItem("vehicle-price")) || 0;
  let downPayment = parseFloat(localStorage.getItem("down-payment")) || 0;
  let loanTerm = parseFloat(localStorage.getItem("loan-term")) || 0;

  if (vehiclePrice === 0 || loanTerm === 0) {
    return;
  }

  // Calculate monthly base payment.
  let monthlyPayment = (vehiclePrice - downPayment) / loanTerm;
  document.getElementById(
    "monthly-payment-display"
  ).innerHTML = `<b>Monthly Base Payment:</b> <br><br>$${monthlyPayment.toFixed(
    2
  )} <br><br> at 0% p/m`;

  // Calculate potential savings.
  let quote = parseFloat(localStorage.getItem("quote-input")) || 0;
  let priceDifference = quote - monthlyPayment;
  document.getElementById(
    "monthly-difference-display"
  ).innerHTML = `Potential savings: <br><br><b>$${priceDifference.toFixed(
    2
  )} p/m </b>`;
}
