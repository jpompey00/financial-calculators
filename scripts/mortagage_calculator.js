"use strict";
window.onload = init;


//input fields
const principalLoanTextBox = document.getElementById("principalLoanTextBox");
const interestRateTextBox = document.getElementById("interestRateTextBox");
const yearTextBox = document.getElementById("yearTextBox");

//buttons
const calculateLoanButton = document.getElementById("calculateLoanButton");
const resetButton = document.getElementById("resetButton");

//output element
const outputElement = document.getElementById("outputTextBox");


function init() {


    calculateLoanButton.onclick = onCalculateLoanButtonClicked;

    resetButton.onclick = onResetButtonClicked;
}


function onCalculateLoanButtonClicked() {
    //variables used with the equations and text
    let monthlyPayment;
    let totalInterest;

    //variables using the values from the document
    let principalLoanAmount = Number(principalLoanTextBox.value);
    let yearlyInterestRate = Number(interestRateTextBox.value) / 100;
    let monthlyInterestRate = yearlyInterestRate / 12;
    let loanLengthMonths = Number(yearTextBox.value) * 12;

    //checks to make sure they inputted a number
    if (Number.isNaN(principalLoanTextBox) || Number.isNaN(interestRateTextBox) || Number.isNaN(yearTextBox)) {

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
        outputElement.value = `A $${principalLoanAmount} loan at ${yearlyInterestRate * 100}% interest for ${loanLengthMonths / 12} years would have a $${monthlyPayment.toFixed(2)}/mo payment with a total interest of $${totalInterest.toFixed(2)} `;
    }

}


//clears all fields
function onResetButtonClicked() {
    principalLoanTextBox.value = "";
    interestRateTextBox.value = "";
    yearTextBox.value = "";
    outputElement.value = "";
}