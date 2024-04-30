"use struct";
window.onload = init;

//TODO get the formatting consistent and clean up and style it a bit.
//TODO add NaN checks

//placeholder
const placeholder = 0;

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
const outputElement = document.getElementById("output")

function init() {

    if(submitBtnMortgage != null){
        submitBtnMortgage.onclick = submitBtnMortgageClicked;
    } else if(submitBtnFuture != null){
        submitBtnFuture.onclick = submitBtnFutureClicked;
    } else if(submitBtnPresent != null){
        submitBtnPresent.onclick = submitBtnPresentClicked;
    }
    resetBtn.onclick = resetBtnClicked;
}

function submitBtnMortgageClicked() {
    //clean this up
    let monthlyPayment;
    let totalInterest;
    let equation1;
    let equation2;
    let principalLoanAmount = Number(number1.value);
    let interestRate = Number(interest.value) / 100;
    let monthlyInterestRate = interestRate / 12;
    let loanLengthMonths = Number(loanLength.value) * 12;


     equation1 = monthlyInterestRate * (1 + monthlyInterestRate) ** loanLengthMonths;
     equation2 = ((1 + monthlyInterestRate) ** loanLengthMonths) - 1;
    monthlyPayment = principalLoanAmount * (equation1 / equation2);

    totalInterest = (monthlyPayment * loanLengthMonths) - principalLoanAmount



  

    outputElement.value = `A $${principalLoanAmount} loan at ${interestRate * 100}% interest for ${loanLengthMonths/12} years would have a $${monthlyPayment.toFixed(2)}/mo payment with a total interest of $${totalInterest.toFixed(2)} `;
}

function submitBtnFutureClicked(){
    let futureValue;
    let earnedInterest;
    let principalInvestment = Number(number1.value);
    let annualInterest = Number(interest.value) / 100;
    let dailyCompound = 365;
    let timeInvested = Number(loanLength.value);

    let equation1 = (1 + annualInterest/dailyCompound) ** (dailyCompound * timeInvested);
    futureValue = principalInvestment * equation1;
    earnedInterest = (futureValue) - principalInvestment;

    //output is a bit different
    outputElement.value = `If you deposit $${principalInvestment.toFixed(2)} earning ${Number(interest.value).toFixed(2)}% interest that matures over ${timeInvested} years, your ending balance will be $${futureValue.toFixed(2)} and you would have earned $${earnedInterest.toFixed(2)} in interest`;
}

function submitBtnPresentClicked(){
    let paymentPerMonth = Number(number1.value);
    let interestRatePerPeriod = Number(interest.value)/100;
    let periods = Number(loanLength.value);
    
    
    let equation1;
    let equation2;
    let output;

    //periods were not lined up
    equation1 = (1 - (1+(interestRatePerPeriod/12))**(-1*(periods*12)));
    equation2 = equation1/(interestRatePerPeriod/12);


    output = paymentPerMonth * equation2;
    outputElement.value = `To fund an annuity that pays $${paymentPerMonth} monthly for ${periods} years and earns an expected ${interestRatePerPeriod*100}% interest, you would need to invest $${output.toFixed(2)} today` ;
}

function resetBtnClicked(){
     number1.value = "";
 interest.value = "";
 loanLength.value = "";
 outputElement.value = "";
}