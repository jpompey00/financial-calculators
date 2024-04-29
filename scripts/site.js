"use struct";
window.onload = init;

//TODO get the formatting consistent and clean up and style it a bit.

//placeholder
const placeholder = 0;

//input fields
const principal = document.getElementById("principal");
const interest = document.getElementById("interestRate");
const loanLength = document.getElementById("loanLength");

//buttons
const submitBtn = document.getElementById("submitBtn");
const submitBtnFuture = document.getElementById("submitBtnFuture");
const submitBtnPresent = document.getElementById("submitBtnPresent");

//output element
const outputElement = document.getElementById("output")

function init() {

    if(submitBtn != null){
        submitBtn.onclick = submitBtnClicked;
    } else if(submitBtnFuture != null){
        submitBtnFuture.onclick = submitBtnFutureClicked;
    } else if(submitBtnPresent != null){
        submitBtnPresent.onclick = submitBtnPresentClicked;
    }

}

function submitBtnClicked() {
    //clean this up
    let monthlyPayment;
    let totalInterest;
    let equation1;
    let equation2;
    let principalLoanAmount = Number(principal.value);
    let interestRate = Number(interest.value) / 100;
    let monthlyInterestRate = interestRate / 12;
    let loanLengthMonths = Number(loanLength.value);


     equation1 = monthlyInterestRate * (1 + monthlyInterestRate) ** loanLengthMonths;
     equation2 = ((1 + monthlyInterestRate) ** loanLengthMonths) - 1;
    monthlyPayment = principalLoanAmount * (equation1 / equation2);

    totalInterest = (monthlyPayment * loanLengthMonths) - principalLoanAmount



  

    outputElement.innerHTML = `A $${principalLoanAmount} loan at ${interestRate * 100}% interest for ${loanLengthMonths/12} years 
    would have a $${monthlyPayment.toFixed(2)}/mo payment with a total interest of $${totalInterest.toFixed(2)} `;
}

function submitBtnFutureClicked(){
    let futureValue;
    let earnedInterest;
    let principalInvestment = Number(principal.value);
    let annualInterest = Number(interest.value) / 100;
    let dailyCompound = 365;
    let timeInvested = Number(loanLength.value)/12;

    let equation1 = (1 + annualInterest/dailyCompound) ** (dailyCompound * timeInvested);
    futureValue = principalInvestment * equation1;
    earnedInterest = (futureValue) - principalInvestment;

    outputElement.innerHTML = `If you deposit $${principalInvestment.toFixed(2)} earning ${Number(interest.value).toFixed(2)}% interest that matures over ${timeInvested} 
    years, your ending balance will be $${futureValue.toFixed(2)} and you would have earned $${earnedInterest.toFixed(2)} in interest`;
}

function submitBtnPresentClicked(){
    let annuityPayment = Number(principal.value);
    let interestRatePerPeriod = Number(interest.value)/100;
    let periods = Number(loanLength.value);
    
    let equation1;
    let equation2;
    let output;

    equation1 = (1 - (1/(1+interestRatePerPeriod/12)**periods))


    equation2 = equation1 * (1 / (interestRatePerPeriod/12))

    output = annuityPayment * equation2

    outputElement.innerHTML = `To fund an annuity that pays $${annuityPayment.toFixed(2)} monthly for ${periods/12} years 
    and earns an expected ${interestRatePerPeriod*100}% interest, you would need to invest $${output.toFixed(2)} today` ;
}