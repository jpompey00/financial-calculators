"use strict";
window.onload = init;


//input fields
const number1 = document.getElementById("number1");
const interest = document.getElementById("interestRate");
const loanLength = document.getElementById("time");

//buttons
const submitBtnMortgage = document.getElementById("submitBtnMortgage");
const submitBtnFuture = document.getElementById("submitBtnFuture");
const submitBtnPresent = document.getElementById("submitBtnPresent");
const resetBtn = document.getElementById("resetBtn");

//output element
const outputElement = document.getElementById("output");


function init() {

    //It checks which page it is on with these if blocks

    submitBtnPresent.onclick = submitBtnPresentClicked;

    resetBtn.onclick = resetBtnClicked;
}


function submitBtnPresentClicked() {
    //variables used for equations and output
    let equation1;
    let equation2;
    let output;

    //variables using the values from the document
    let paymentPerMonth = Number(number1.value);
    let interestRatePerPeriod = Number(interest.value) / 100;
    let periods = Number(loanLength.value);



    //checks to make sure they inputted a number
    if (Number.isNaN(paymentPerMonth) || Number.isNaN(interestRatePerPeriod) || Number.isNaN(periods)) {

        //puts an error message where the output would go in red read-only text
        outputElement.value = "Please make sure you enter numbers in all fields";
        outputElement.setAttribute("class", "form-control-plaintext text-danger");

    } else {


        equation1 = (1 - (1 + (interestRatePerPeriod / 12)) ** (-1 * (periods * 12)));
        equation2 = equation1 / (interestRatePerPeriod / 12);

        output = paymentPerMonth * equation2;
        outputElement.setAttribute("class", "form-control-plaintext")

        outputElement.value = `To fund an annuity that pays $${paymentPerMonth} monthly for ${periods} years and earns an expected ${interestRatePerPeriod * 100}% interest, you would need to invest $${output.toFixed(2)} today`;
    }

}

//clears all fields
function resetBtnClicked() {
    number1.value = "";
    interest.value = "";
    loanLength.value = "";
    outputElement.value = "";
}