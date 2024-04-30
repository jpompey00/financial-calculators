"use strict";
window.onload = init;


//input fields
const depositTextBox = document.getElementById("depositTextBox");
const interestRateTextBox = document.getElementById("interestRateTextBox");
const yearTextBox = document.getElementById("yearTextBox");

//buttons
const calculateInterestButton = document.getElementById("calculateInterestButton");
const resetButton = document.getElementById("resetButton");

//output element
const outputElement = document.getElementById("outputTextBox");


function init() {


    calculateInterestButton.onclick = onCalculateInterestButtonClicked;

    resetButton.onclick = onResetButtonClicked;
}




function onCalculateInterestButtonClicked() {
    //variables used with equations
    let futureValue;
    let earnedInterest;

    //variables using the values from the document
    let principalInvestment = Number(depositTextBox.value);
    let annualInterest = Number(interestRateTextBox.value) / 100;
    let dailyCompound = 365;
    let yearsInvested = Number(yearTextBox.value);

    //checks to make sure they inputted a number
    if (Number.isNaN(principalInvestment) || Number.isNaN(annualInterest) || Number.isNaN(yearsInvested)) {

        //puts an error message where the output would go in red read-only text
        outputElement.value = "Please make sure you enter numbers in all fields";
        outputElement.setAttribute("class", "form-control-plaintext text-danger");

    } else {
        let equation1 = (1 + annualInterest / dailyCompound) ** (dailyCompound * yearsInvested);
        futureValue = principalInvestment * equation1;
        earnedInterest = (futureValue) - principalInvestment;

        outputElement.setAttribute("class", "form-control-plaintext")

        //output is a bit different
        outputElement.value = `If you deposit $${principalInvestment.toFixed(2)} earning ${(annualInterest * 100).toFixed(2)}% interest that matures over ${yearsInvested} years, your ending balance will be $${futureValue.toFixed(2)} and you would have earned $${earnedInterest.toFixed(2)} in interest`;
    }



}


//clears all fields
function onResetButtonClicked() {
    depositTextBox.value = "";
    interestRateTextBox.value = "";
    yearTextBox.value = "";
    outputElement.value = "";
}