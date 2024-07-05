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
