"use struct";
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
    if (submitBtnMortgage != null) {
        submitBtnMortgage.onclick = submitBtnMortgageClicked;
    } else if (submitBtnFuture != null) {
        submitBtnFuture.onclick = submitBtnFutureClicked;
    } else if (submitBtnPresent != null) {
        submitBtnPresent.onclick = submitBtnPresentClicked;
    }
    resetBtn.onclick = resetBtnClicked;
}


function submitBtnMortgageClicked() {
    //variables used with the equations and text
    let monthlyPayment;
    let totalInterest;
    let equation1;
    let equation2;

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

        equation1 = monthlyInterestRate * (1 + monthlyInterestRate) ** loanLengthMonths;
        equation2 = ((1 + monthlyInterestRate) ** loanLengthMonths) - 1;
        monthlyPayment = principalLoanAmount * (equation1 / equation2);
        totalInterest = (monthlyPayment * loanLengthMonths) - principalLoanAmount
        outputElement.setAttribute("class", "form-control-plaintext")
        outputElement.value = `A $${principalLoanAmount} loan at ${interestRate * 100}% interest for ${loanLengthMonths / 12} years would have a $${monthlyPayment.toFixed(2)}/mo payment with a total interest of $${totalInterest.toFixed(2)} `;
    }

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