"use strict";
// get calculate-button
const calculateBtn = document.getElementById("calculate");
// function for calculating the numbers when pressing the button
calculateBtn === null || calculateBtn === void 0
  ? void 0
  : calculateBtn.addEventListener("click", calculate);
function calculate() {
  // get the result div and clear it
  const result = document.getElementById("result");
  result.innerHTML = "";
  // get input elements
  const totalLoan = document.getElementById("total-loan");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  // convert the value to number so it can be compared
  const maxYears = parseFloat(years.value);
  // if the user doesn't put something in all fields
  if (totalLoan.value == "" || interest.value == "" || years.value == "") {
    const errorMessage = document.createElement("p");
    errorMessage.innerHTML = "Fyll i alla fält!";
    result.appendChild(errorMessage);
    // if the user enters too many years
  } else if (maxYears > 65) {
    const errorMessage = document.createElement("p");
    errorMessage.innerHTML = "Längsta avbetalningstid är 65 år.";
    result.appendChild(errorMessage);
    // otherwise do the calculation
  } else {
    const L = parseFloat(totalLoan.value);
    const I = parseFloat(interest.value) / 100; // convert percentage to decimal
    const Y = parseFloat(years.value) * 12; // convert years to months
    const monthlyInterestRate = I / 12;
    const denominator = Math.pow(1 + monthlyInterestRate, Y) - 1;
    const monthlyCost =
      (L * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, Y))) /
      denominator;
    const totalInterestCost = monthlyCost * Y - L;
    const totalCost = monthlyCost * Y;
    // display result and append to result div
    const displayMonthly = document.createElement("p");
    displayMonthly.innerHTML = `Månadskostnad: ${monthlyCost.toFixed(2)}kr`;
    result.appendChild(displayMonthly);
    const displayInterest = document.createElement("p");
    displayInterest.innerHTML = `Total räntekostnad: ${totalInterestCost.toFixed(
      2
    )}kr`;
    result.appendChild(displayInterest);
    const displayTotal = document.createElement("p");
    displayTotal.innerHTML = `Total kostnad: ${totalCost.toFixed(2)}kr`;
    result.appendChild(displayTotal);
    // amortization plan in a list
    let remainingBalance = L;
    const amortizationList = document.createElement("ul");
    // for every month show interest cost, amortization and remaining balance
    for (let month = 1; month <= Y; month++) {
      const interestCost = remainingBalance * monthlyInterestRate;
      const amortizationCost = monthlyCost - interestCost;
      remainingBalance -= amortizationCost;
      const listItem = document.createElement("li");
      listItem.innerHTML = `<strong>Månad ${month}:</strong> Räntekostnad: ${interestCost.toFixed(
        2
      )}kr | Amortering: ${amortizationCost.toFixed(
        2
      )}kr | Återstående skuld: ${remainingBalance.toFixed(2)}kr`;
      // append to result div
      amortizationList.appendChild(listItem);
      result.appendChild(amortizationList);
    }
  }
}
