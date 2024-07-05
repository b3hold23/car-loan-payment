// Add event listener to submit button
document
  .getElementById("submit-button")
  .addEventListener("click", function (event) {
    if (!validateForm(event)) {
      return;
    }
    submitInputs();
  });

// validate the form

// note: all alerts to be changed to modals
function validateForm(event) {
  let vehiclePriceInput = document.getElementById("vehicle-price").value.trim();
  let downPaymentInput = document.getElementById("down-payment").value.trim();
  let loanTermInput = document.getElementById("loan-term").value.trim();

  if (vehiclePriceInput === "") {
    alert("Please enter the Vehicle Price or MSRP");
    event.preventDefault();
    return false;
  }

  if (isNaN(vehiclePriceInput)) {
    alert("Please enter the Vehicle Price or MSRP as a number");
    event.preventDefault();
    return false;
  }

  let parsedVehiclePriceInput = parseFloat(vehiclePriceInput);
  if (parsedVehiclePriceInput <= 0) {
    alert("Please enter a positive number for the Vehicle Price or MSRP");
    event.preventDefault();
    return false;
  }

  let formattedVehiclePrice = parsedVehiclePriceInput.toFixed(2);
  document.getElementById("vehicle-price").value = formattedVehiclePrice;

  if (downPaymentInput === "") {
    alert("Please enter the Down Payment or enter 0");
    event.preventDefault();
    return false;
  }

  if (isNaN(downPaymentInput)) {
    alert("Please enter the Down Payment as a number");
    event.preventDefault();
    return false;
  }

  let parsedDownPaymentInput = parseFloat(downPaymentInput);
  if (parsedDownPaymentInput <= 0) {
    alert("Please enter a positive number for the Down Payment");
    event.preventDefault();
    return false;
  }

  let formattedDownPayment = parsedDownPaymentInput.toFixed(2);
  document.getElementById("down-payment").value = formattedDownPayment;

  if (loanTermInput === "") {
    alert("Please enter the Loan Term");
    event.preventDefault();
    return false;
  }

  if (isNaN(loanTermInput)) {
    alert("Please enter the Loan Term as a number");
    event.preventDefault();
    return false;
  }

  let parsedLoanTermInput = parseFloat(loanTermInput);
  if (parsedLoanTermInput <= 0) {
    alert("Please enter a positive number for the Loan Term");
    event.preventDefault();
    return false;
  }

  document.getElementById("loan-term").value = parsedLoanTermInput;

  return true;
}

// set inputs to local storage
function submitInputs() {
  let vehiclePrice = document.getElementById("vehicle-price").value;
  localStorage.setItem("vehicle-price", vehiclePrice);

  let downPayment = document.getElementById("down-payment").value;
  localStorage.setItem("down-payment", downPayment);

  let loanTerm = document.getElementById("loan-term").value;
  localStorage.setItem("loan-term", loanTerm);
}

// get inputs from local storage
let savedVehiclePrice = this.localStorage.getItem("vehicle-price");
let savedDownPayment = this.localStorage.getItem("down-payment");
let savedLoanTerm = this.localStorage.getItem("loan-term");
let monthlyPayment = (savedVehiclePrice - savedDownPayment) / savedLoanTerm;

// display the figures in the form boxes
window.addEventListener("load", function () {
  if (savedVehiclePrice) {
    document.getElementById("vehicle-price").value = savedVehiclePrice;
  }

  if (savedDownPayment) {
    document.getElementById("down-payment").value = savedDownPayment;
  }

  if (savedLoanTerm) {
    document.getElementById("loan-term").value = savedLoanTerm;
  }
});

// Calculate and display monthly payment
window.addEventListener("load", function () {
  if (monthlyPayment) {
    let displayPayment = document.getElementById("monthly-payment-display");
    displayPayment.textContent = `Monthly Payment: $${monthlyPayment.toFixed(
      2
    )} at 0% interest.`;
  }
});

// calculate and display difference between monthly payment and quote
// note: "quote" variale to accept to modal input(s)
window.addEventListener("load", function () {
  let quote = 800;
  if (monthlyPayment) {
    let displayDifference = document.getElementById(
      "monthly-difference-display"
    );
    let savedPaymentValue = parseFloat(monthlyPayment);
    let difference = quote - savedPaymentValue;
    displayDifference.textContent = `You could be overpaying by as much as: $${difference.toFixed(
      2
    )} p/m.`;
  }
});

// create button to show suggestions with tooltip
window.addEventListener("load", function () {
  if (monthlyPayment) {
    let tipButtonContainer = document.getElementById(
      "tooltip-button-container"
    );
    let tipButton = this.document.createElement("button");
    tipButton.setAttribute("id", "tips-button");
    tipButton.textContent = `Tips`;
    tipButtonContainer.appendChild(tipButton);

    tipButton.addEventListener("click", showTips);
  }
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
