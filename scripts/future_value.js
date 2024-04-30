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

    submitBtnFuture.onclick = submitBtnFutureClicked;

    resetBtn.onclick = resetBtnClicked;
}




function submitBtnFutureClicked() {
    //variables used with equations
    let futureValue;
    let earnedInterest;
    let equation1;

    //variables using the values from the document
    let principalInvestment = Number(number1.value);
    let annualInterest = Number(interest.value) / 100;
    let dailyCompound = 365;
    let timeInvested = Number(loanLength.value);

    //checks to make sure they inputted a number
    if (Number.isNaN(principalInvestment) || Number.isNaN(annualInterest) || Number.isNaN(timeInvested)) {

        //puts an error message where the output would go in red read-only text
        outputElement.value = "Please make sure you enter numbers in all fields";
        outputElement.setAttribute("class", "form-control-plaintext text-danger");

    } else {
        equation1 = (1 + annualInterest / dailyCompound) ** (dailyCompound * timeInvested);
        futureValue = principalInvestment * equation1;
        earnedInterest = (futureValue) - principalInvestment;

        outputElement.setAttribute("class", "form-control-plaintext")
        //output is a bit different
        outputElement.value = `If you deposit $${principalInvestment.toFixed(2)} earning ${Number(interest.value).toFixed(2)}% interest that matures over ${timeInvested} years, your ending balance will be $${futureValue.toFixed(2)} and you would have earned $${earnedInterest.toFixed(2)} in interest`;
    }



}


//clears all fields
function resetBtnClicked() {
    number1.value = "";
    interest.value = "";
    loanLength.value = "";
    outputElement.value = "";
}