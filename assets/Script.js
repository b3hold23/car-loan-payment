document
  .getElementById("submit-button")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    if (validateForm(event)) {
      submitInputs();
      updateMonthlyPayment();
      showMonthlyPaymentContainer();
    }
  });

// Validate the form
function validateForm(event) {
  let vehiclePriceInput = document.getElementById("vehicle-price").value.trim();
  let downPaymentInput = document.getElementById("down-payment").value.trim();
  let loanTermInput = document.getElementById("loan-term").value.trim();

  if (vehiclePriceInput === "") {
    alert("Please enter the Vehicle Price or MSRP");
    return false;
  }

  if (isNaN(vehiclePriceInput) || parseFloat(vehiclePriceInput) <= 0) {
    alert(
      "Please enter a positive number without symbols for the Vehicle Price or MSRP"
    );
    return false;
  }

  let formattedVehiclePrice = parseFloat(vehiclePriceInput).toFixed(2);
  document.getElementById("vehicle-price").value = formattedVehiclePrice;

  if (downPaymentInput === "") {
    alert("Please enter the Down Payment or enter 0");
    return false;
  }

  if (isNaN(downPaymentInput) || parseFloat(downPaymentInput) < 0) {
    alert(
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
    alert("Please enter a positive number for the Loan Term");
    return false;
  }

  document.getElementById("loan-term").value = parseFloat(loanTermInput);

  return true;
}

// Set inputs to local storage
function submitInputs() {
  let vehiclePrice = document.getElementById("vehicle-price").value;
  localStorage.setItem("vehicle-price", vehiclePrice);

  let downPayment = document.getElementById("down-payment").value;
  localStorage.setItem("down-payment", downPayment);

  let loanTerm = document.getElementById("loan-term").value;
  localStorage.setItem("loan-term", loanTerm);
}

// Update and display the monthly payment
function updateMonthlyPayment() {
  let savedVehiclePrice = parseFloat(localStorage.getItem("vehicle-price"));
  let savedDownPayment = parseFloat(localStorage.getItem("down-payment"));
  let savedLoanTerm = parseFloat(localStorage.getItem("loan-term"));

  let monthlyPayment = (savedVehiclePrice - savedDownPayment) / savedLoanTerm;
  let displayPayment = document.getElementById("monthly-payment-display");
  displayPayment.innerHTML = `<strong>Monthly Payment:</strong><br><br> $${monthlyPayment.toFixed(
    2
  )}<br><br> at 0% interest.`;

  // Update the difference display
  let quote = 800;
  let displayDifference = document.getElementById("monthly-difference-display");
  let difference = quote - monthlyPayment;
  displayDifference.innerHTML = `You could be overpaying by as much as:<br><br><strong>$${difference.toFixed(
    2
  )} p/m.</strong>`;
}

function showMonthlyPaymentContainer() {
  const monthlyPaymentElement = document.getElementById(
    "monthly-payment-container"
  );
  monthlyPaymentElement.classList.remove("monthly-payment-toggle");
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
  showTips.textContent = `Check the market adjustment, loan charges, add-ons, service charges, and sales tax.`;
  showTipsContainer.appendChild(showTips);
}