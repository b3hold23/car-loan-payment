document.getElementById("submit-button")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    if (validateForm(event)) {
      submitInputs();
      updateMonthlyPayment();
      showMonthlyPaymentContainer();
    }
  });

function validateForm(event) {
  let vehiclePriceInput = document.getElementById("vehicle-price").value.trim();
  let downPaymentInput = document.getElementById("down-payment").value.trim();
  let loanTermInput = document.getElementById("loan-term").value.trim();

  if (vehiclePriceInput === "") {
    displayModal("Please enter the Vehicle Price or MSRP");
    return false;
  }

  if (isNaN(vehiclePriceInput) || parseFloat(vehiclePriceInput) <= 0) {
    displayModal(
      "Please enter a positive number without symbols for the Vehicle Price or MSRP"
    );
    return false;
  }

  let formattedVehiclePrice = parseFloat(vehiclePriceInput).toFixed(2);
  document.getElementById("vehicle-price").value = formattedVehiclePrice;

  if (downPaymentInput === "") {
    displayModal("Please enter the Down Payment or enter 0");
    return false;
  }

  if (isNaN(downPaymentInput) || parseFloat(downPaymentInput) < 0) {
    displayModal(
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
    displayModal("Please enter a positive number for the Loan Term");
    return false;
  }

  document.getElementById("loan-term").value = parseFloat(loanTermInput);

  return true;
}




function displayModal(message) {
  // Set the modal message using jQuery
  $("#validationMessage").text(message);

  // Show the modal using Bootstrap 5
  $("#validationModal").modal("show");
}

// Initial load: get inputs from local storage and update displays
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

// create button to show suggestions with tooltip
window.addEventListener("load", function () {
  let tipButtonContainer = document.getElementById("tooltip-button-container");
  let tipButton = document.createElement("button");
  tipButton.setAttribute("id", "tips-button");
  tipButton.setAttribute("class", "btn btn-background btn-text-color");
  tipButton.textContent = `Tips`;
  tipButtonContainer.appendChild(tipButton);

  tipButton.addEventListener("click", showTips);
});

function showTips() {
  let showTipsContainer = document.getElementById("show-tips-container");

  let existingTips = document.getElementById("show-tips");
  if (existingTips) {
    return;
  }

  let showTips = document.createElement("p");
  showTips.setAttribute("id", "show-tips");
  showTips.textContent = `Check the market adjustment, loan charges, add-ons, dealer fees, service charges, registration fees, and sales tax.`;
  showTipsContainer.appendChild(showTips);
}

document.addEventListener("DOMContentLoaded", function () {
  const loanTermSlider = document.getElementById("loan-term");
  const loanTermValueSpan = document.getElementById("loan-term-value");

  loanTermValueSpan.textContent = loanTermSlider.value;

  loanTermSlider.addEventListener("input", function () {
    loanTermValueSpan.textContent = loanTermSlider.value;
  });
});

document.getElementById("loan-term").addEventListener("input", function () {
  document.getElementById("loan-term-value").textContent = this.value;
});

function showMonthlyPaymentContainer() {
  let container = document.getElementById("monthly-payment-container");
  container.style.display = "block";
}

// save inputs to local storage and update displays
function submitInputs() {
  let vehiclePrice = document.getElementById("vehicle-price").value;
  let downPayment = document.getElementById("down-payment").value;
  let loanTerm = document.getElementById("loan-term").value;

  localStorage.setItem("vehicle-price", vehiclePrice);
  localStorage.setItem("down-payment", downPayment);
  localStorage.setItem("loan-term", loanTerm);
}

function updateMonthlyPayment() {
  let vehiclePrice = parseFloat(localStorage.getItem("vehicle-price")) || 0;
  let downPayment = parseFloat(localStorage.getItem("down-payment")) || 0;
  let loanTerm = parseFloat(localStorage.getItem("loan-term")) || 0;

  if (vehiclePrice === 0 || loanTerm === 0) {
    return;
  }

  let monthlyPayment = (vehiclePrice - downPayment) / loanTerm;
  document.getElementById(
    "monthly-payment-display"
  ).innerHTML = `<b>Monthly Base Payment:</b> <br><br>$${monthlyPayment.toFixed(
    2
  )} <br><br> at 0% p/m`;

  let priceDifference = 48000 - vehiclePrice;
  let differencePerMonth = priceDifference / loanTerm;
  document.getElementById(
    "monthly-difference-display"
  ).innerHTML = `Potential savings: <br><br><b>$${differencePerMonth.toFixed(
    2
  )} p/m </b>`;
}
