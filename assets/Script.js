// Pseudocode

// 1. Collect up to three third-party quotes (optional)

// 2. Input MSRP, Down Payment, and Loan Term
let MSRP;
let downPayment;
let loanTerm;
let baseCost;

document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector("button[type='submit'");

  button.addEventListener("click", function (event) {
    event.preventDefault();

    MSRP = parseFloat(document.getElementById("car-price").value);
    downPayment = parseFloat(document.getElementById("down-payment").value);
    loanTerm = parseFloat(document.getElementById("loan-term").value);

    console.log(`MSRP: $${MSRP}`);
    console.log(`Down Payment: $${downPayment}`);
    console.log(`Loan Term: ${loanTerm}`);

    // 3. View base monthly cost
    baseCost = (MSRP - downPayment) / loanTerm;
    console.log(`Base Monthly Cost: $${baseCost.toFixed(2)}`);

    let monthlyPayment = document.getElementById("monthly-payment");
    monthlyPayment.textContent = `$${baseCost.toFixed(2)}`;
  });
});

// 4. View difference over loan term between base monthly cost and highest quote

// 5. View suggestions for additional costs on button click with tooltip
