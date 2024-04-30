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

    submitBtnMortgage.onclick = submitBtnMortgageClicked;

    resetBtn.onclick = resetBtnClicked;
}


function submitBtnMortgageClicked() {
    //variables used with the equations and text
    let monthlyPayment;
    let totalInterest;

    //variables using the values from the document
    let principalLoanAmount = Number(number1.value);
    let interestRate = Number(interest.value) / 100;
    let monthlyInterestRate = interestRate / 12;
    let loanLengthMonths = Number(loanLength.value) * 12;

    //checks to make sure they inputted a number
    if (Number.isNaN(principalLoanAmount) || Number.isNaN(interestRate) || Number.isNaN(loanLength)) {

        //puts an error message where the output would go in red read-only text
        outputElement.value = "Please make sure you enter numbers in all fields";
        outputElement.setAttribute("class", "form-control-plaintext text-danger");

    }
    else {

        let equation1 = monthlyInterestRate * (1 + monthlyInterestRate) ** loanLengthMonths;
        let equation2 = ((1 + monthlyInterestRate) ** loanLengthMonths) - 1;
        monthlyPayment = principalLoanAmount * (equation1 / equation2);
        totalInterest = (monthlyPayment * loanLengthMonths) - principalLoanAmount
        outputElement.setAttribute("class", "form-control-plaintext")
        outputElement.value = `A $${principalLoanAmount} loan at ${interestRate * 100}% interest for ${loanLengthMonths / 12} years would have a $${monthlyPayment.toFixed(2)}/mo payment with a total interest of $${totalInterest.toFixed(2)} `;
    }

}


//clears all fields
function resetBtnClicked() {
    number1.value = "";
    interest.value = "";
    loanLength.value = "";
    outputElement.value = "";
}