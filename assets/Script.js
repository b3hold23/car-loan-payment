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

  // Submit quote on quote modal save
  document
    .getElementById("submit-quote")
    .addEventListener("click", submitQuote);

  // Save quote on enter press
  document
    .getElementById("quote-input")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        submitQuote();
      }
    });

  function validateForm(event) {
    let vehiclePriceInput = document
      .getElementById("vehicle-price")
      .value.trim()
      .replace(/[$,]/g, ""); // Remove $ and commas
    let downPaymentInput = document
      .getElementById("down-payment")
      .value.trim()
      .replace(/[$,]/g, ""); // Remove $ and commas
    let loanTermInput = document.getElementById("loan-term").value.trim();

    // Check for empty vehicle price input
    if (vehiclePriceInput === "") {
      displayValidationModal("Please enter the Vehicle Price or MSRP.");
      return false;
    }

    // Check for non-positive numeric vehicle price
    if (
      isNaN(parseFloat(vehiclePriceInput)) ||
      parseFloat(vehiclePriceInput) <= 0
    ) {
      displayValidationModal(
        "Please enter a positive number without symbols for the Vehicle Price or MSRP."
      );
      return false;
    }

    // Format and display vehicle price input
    let formattedVehiclePrice = parseFloat(vehiclePriceInput).toLocaleString(
      "en-US",
      {
        style: "currency",
        currency: "USD",
      }
    );
    document.getElementById("vehicle-price").value = formattedVehiclePrice;

    // Check for empty down payment input
    if (downPaymentInput === "") {
      displayValidationModal("Please enter the Down Payment or enter 0.");
      return false;
    }

    // Check for non-positive numeric down payment
    if (
      isNaN(parseFloat(downPaymentInput)) ||
      parseFloat(downPaymentInput) < 0
    ) {
      displayValidationModal(
        "Please enter a positive number without symbols for the Down Payment."
      );
      return false;
    }

    // Format and display down payment input
    let formattedDownPayment = parseFloat(downPaymentInput).toLocaleString(
      "en-US",
      {
        style: "currency",
        currency: "USD",
      }
    );
    document.getElementById("down-payment").value = formattedDownPayment;

    // Check for empty or non-positive numeric loan term
    if (
      loanTermInput === "" ||
      isNaN(parseFloat(loanTermInput)) ||
      parseFloat(loanTermInput) <= 0
    ) {
      displayValidationModal(
        "Please enter a positive number for the Loan Term."
      );
      return false;
    }

    // Display loan term input without formatting
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
      // Display formatted vehicle price
      document.getElementById("vehicle-price").value = parseFloat(
        savedVehiclePrice
      ).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }

    if (savedDownPayment) {
      // Display formatted down payment
      document.getElementById("down-payment").value = parseFloat(
        savedDownPayment
      ).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }

    if (savedLoanTerm) {
      // Display loan term without formatting
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
    tipsElement.textContent = `Check the market adjustment, loan charges, add-ons, dealer fees, service charges, registration fees, and sales tax before purchasing the vehicle.`;
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
    // Update monthly payment and potential savings
    updateMonthlyPayment();
  });

  // Update loan term value when the input field changes
  document.getElementById("loan-term").addEventListener("input", function () {
    loanTermValueSpan.textContent = this.value;
    // Update local storage with the current input field value
    localStorage.setItem("loan-term", this.value);
    // Update monthly payment and potential savings
    updateMonthlyPayment();
  });
});

// Show the payment container on submit.
function showMonthlyPaymentContainer() {
  let container = document.getElementById("monthly-payment-container");
  container.style.display = "block";
}

function showQuoteModal() {
  const quoteModal = new bootstrap.Modal(document.getElementById("quoteModal"));
  let storedQuoteInput = localStorage.getItem("quote-input");
  if (storedQuoteInput) {
    document.getElementById("quote-input").value = storedQuoteInput;
  }
  quoteModal.show();

  document
    .getElementById("submit-quote")
    .addEventListener("click", function () {
      let quoteInput = document.getElementById("quote-input").value.trim();

      // Check if the input is a valid integer
      if (!isValidInteger(quoteInput)) {
        displayValidationModal(
          "Please enter a valid integer for the Quote amount."
        );
        return;
      }

      // Save valid quote input to local storage
      localStorage.setItem("quote-input", quoteInput);
      updateMonthlyPayment();
      $("#quoteModal").modal("hide");
    });
}

// Helper function to check if a value is a valid integer
function isValidInteger(value) {
  // Check if the value is not empty and is a valid integer
  return value !== "" && /^\d+$/.test(value);
}

// Helper function to check if a value is numeric
function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

// Save inputs to local storage.
function submitInputs() {
  let vehiclePriceInput = document.getElementById("vehicle-price").value.trim();
  let downPaymentInput = document.getElementById("down-payment").value.trim();
  let loanTermInput = document.getElementById("loan-term").value.trim();

  // Remove currency symbols and commas for storing raw numbers
  let vehiclePrice = parseFloat(vehiclePriceInput.replace(/[$,]/g, "")) || 0;
  let downPayment = parseFloat(downPaymentInput.replace(/[$,]/g, "")) || 0;
  let loanTerm = parseFloat(loanTermInput) || 0;

  localStorage.setItem("vehicle-price", vehiclePrice);
  localStorage.setItem("down-payment", downPayment);
  localStorage.setItem("loan-term", loanTerm);

  showQuoteModal();
}

function submitQuote() {
  let quoteInput = document.getElementById("quote-input").value;
  localStorage.setItem("quote-input", quoteInput);
  updateMonthlyPayment();
  $("#quoteModal").modal("hide");
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
  ).innerHTML = `<b>Monthly Base Payment:</b> <br><br>${monthlyPayment.toLocaleString(
    "en-US",
    {
      style: "currency",
      currency: "USD",
    }
  )} <br><br> at 0% p/m <br> (and no markup).`;

  // Calculate potential savings.
  let quote = parseFloat(localStorage.getItem("quote-input")) || 0;
  let priceDifference = 0;

  if (!isNaN(quote) && quote > 0) {
    priceDifference = quote - monthlyPayment;
  }

  document.getElementById(
    "monthly-difference-display"
  ).innerHTML = `You could save up to: <br><br><b>${priceDifference.toLocaleString(
    "en-US",
    {
      style: "currency",
      currency: "USD",
    }
  )} p/m. </b>`;
}
