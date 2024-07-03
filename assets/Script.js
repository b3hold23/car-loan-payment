// Pseudocode

// 1. Collect up to three third-party quotes (optional)
document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("modalBtn");
    var span = document.getElementById("window-close")[0];

    function openModal() {
        modal.style.display = "block";
    }

    function closeModal() {
        modal.style.display = "none"
    }

    if (btn) {
        btn.addEventListener("click", openModal);
    }

    if (span) {
        span.addEventListener("click", openModal);
    }

    if (span) {
        span.addEventListener("click", closeModal);
    }
    

    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            closeModal();
        }
    })
})



// 2. Input MSRP, Down Payment, and Loan Term
const MSRP = document.getElementById("");
// 3. View base monthly cost

// 4. View difference over loan term between base monthly cost and highest quote

// 5. View suggestions for additional costs on button click with tooltip
