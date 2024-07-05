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
