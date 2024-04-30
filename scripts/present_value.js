"use strict";
window.onload = init;


//input fields
const paymentPerMonthTextBox = document.getElementById("paymentPerMonthTextBox");
const interestRateTextBox = document.getElementById("interestRateTextBox");
const yearTextBox = document.getElementById("yearTextBox");

//buttons
const calculatePresentValueButton = document.getElementById("calculatePresentValueButton");
const resetButton = document.getElementById("resetButton");

//output element
const outputElement = document.getElementById("outputTextBox");


function init() {

    calculatePresentValueButton.onclick = onCalculatePresentValueButtonClicked;

    resetButton.onclick = onResetButtonClicked;
}


function onCalculatePresentValueButtonClicked() {
    //variables used for equations
    let amountToInvest;

    //variables using the values from the document
    let paymentPerMonth = Number(paymentPerMonthTextBox.value);
    let interestRatePerPeriod = Number(interestRateTextBox.value) / 100;
    let yearNumber = Number(yearTextBox.value);



    //checks to make sure they inputted a number
    if (Number.isNaN(paymentPerMonth) || Number.isNaN(interestRatePerPeriod) || Number.isNaN(yearNumber)) {

        //puts an error message where the output would go in red read-only text
        outputElement.value = "Please make sure you enter numbers in all fields";
        outputElement.setAttribute("class", "form-control-plaintext text-danger");

    } else {


        let equation1 = (1 - (1 + (interestRatePerPeriod / 12)) ** (-1 * (yearNumber * 12)));
        let equation2 = equation1 / (interestRatePerPeriod / 12);

        amountToInvest = paymentPerMonth * equation2;
        outputElement.setAttribute("class", "form-control-plaintext")

        outputElement.value = `To fund an annuity that pays $${paymentPerMonth} monthly for ${yearNumber} years and earns an expected ${interestRatePerPeriod * 100}% interest, you would need to invest $${amountToInvest.toFixed(2)} today`;
    }

}

//clears all fields
function onResetButtonClicked() {
    paymentPerMonthTextBox.value = "";
    interestRateTextBox.value = "";
    yearTextBox.value = "";
    outputElement.value = "";
}