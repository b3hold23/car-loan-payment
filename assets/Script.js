// Pseudocode

// 1. Collect up to three third-party quotes (optional)

// 2. Input MSRP, Down Payment, and Loan Term
const MSRP = document.getElementById("");
// 3. View base monthly cost

// 4. View difference over loan term between base monthly cost and highest quote

// 5. View suggestions for additional costs on button click with tooltip
const slider = document.getElementById('loanTermRange');
const output = document.getElementById('loanTermValue');
const sliderLabels = document.getElementById('sliderLabels');

slider.addEventListener('input', function() {
  output.textContent = slider.value;
  updateSliderLabels();
});

