// Get the convert button element
const convert = document.getElementById("convert");
// Get the converted amount div element
const convertedamount = document.getElementById("convertedamount");
// Get the result paragraph element
const result = document.getElementById("result");
// Get the from currency select element
const from = document.getElementById("from");
// Get the to currency select element
const to = document.getElementById("to");
// Get the amount input element
const amount = document.getElementById("amount");

// Add a click event listener to the convert button
convert.addEventListener("click", function() {
   // Get the selected from currency value
   let fromCurrency = from.value;
   // Get the selected to currency value
   let toCurrency = to.value;
   // Get the entered amount value
   let amt = amount.value;

   // Check if the amount is less than 300
   if (amt < 300) {
      // Display an error message for minimum transaction amount
      result.innerHTML = "Minimum transaction amount is 300 of the initial currency.";
      convertedamount.classList.remove("hidden");   
   }
   // Check if the amount is greater than 5000
   else if (amt > 5000) {
      // Display an error message for maximum transaction amount
      result.innerHTML = "Maximum transaction amount is 5000 of the initial currency.";
      convertedamount.classList.remove("hidden");   
   }
   else {
      // Calculate the fee based on the transaction amount
      let fee;
      if (amt <= 500) {
         fee = amt * 0.035; // 3.5% fee
      }
      else if (amt <= 1500) {
         fee = amt * 0.027; // 2.7% fee
      }
      else if (amt <= 2500) {
         fee = amt * 0.02; // 2.0% fee
      }
      else {
         fee = amt * 0.015; // 1.5% fee
      }

      // If the amount is within the valid range, perform the currency conversion
      // Fetch the exchange rate data from the API
      fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then(response => {
            return response.json();
      })
      .then(data => {
         // Get the exchange rate for the selected to currency
         let rate = data.rates[toCurrency];
         // Calculate the converted amount
         let total = rate * amt;
         //Converted Fee Charged
         let convertedchargedfee = fee * rate
         // Subtract the fee from the transaction amount
         let amountAfterFee = total - convertedchargedfee;

         // Display the converted amount and currencies
         result.innerHTML = `Converted Amount of ${amt} ${fromCurrency} = ${total.toFixed(2)} ${toCurrency}<br>
         Fee Charged = ${convertedchargedfee.toFixed(2)} ${toCurrency}<br>
         Remaining Amount: ${total.toFixed(2)} ${toCurrency} - ${convertedchargedfee.toFixed(2)} ${toCurrency} (Fee) = ${amountAfterFee.toFixed(2)} ${toCurrency}`;
         // Show the investment quote
         convertedamount.classList.remove("hidden");     
      });
   }
});

// Get the investment form element
const investmentForm = document.getElementById("investmentForm");
// Get the investment quote div element
const investmentQuote = document.getElementById("investmentQuote");
// Get the quote result element
const quoteResult = document.getElementById("quoteResult");

// Event listener for form submission
investmentForm.addEventListener("submit", function(event) {
   event.preventDefault();

   // Get the user inputs
   const initialInvestment = parseFloat(document.getElementById("initialInvestment").value);
   const monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value);
   const investmentType = parseInt(document.getElementById("investmentType").value);

   // Perform calculations based on the investment type
   let minReturns = 0;
   let maxReturns = 0;
   let totalProfit1Year = 0;
   let totalProfit5Years = 0;
   let totalProfit10Years = 0;
   let totalFees1Year = 0;
   let totalFees5Years = 0;
   let totalFees10Years = 0;
   let totalTaxes1Year = 0;
   let totalTaxes5Years = 0;
   let totalTaxes10Years = 0;

   switch (investmentType) {
      case 1: // Basic Savings Plan
         minReturns = initialInvestment * 0.012;
         maxReturns = initialInvestment * 0.024;
         totalProfit1Year = minReturns;
         totalProfit5Years = minReturns * 5;
         totalProfit10Years = minReturns * 10;
         totalFees1Year = (initialInvestment * 0.0025) + (monthlyInvestment * 0.0025 * 12);
         totalFees5Years = totalFees1Year * 5;
         totalFees10Years = totalFees1Year * 10;
         totalTaxes1Year = 0;
         totalTaxes5Years = 0;
         totalTaxes10Years = 0;
         break;

      case 2: // Savings Plan Plus
         minReturns = initialInvestment * 0.03;
         maxReturns = initialInvestment * 0.055;
         totalProfit1Year = minReturns;
         totalProfit5Years = minReturns * 5;
         totalProfit10Years = minReturns * 10;
         totalFees1Year = (initialInvestment * 0.003) + (monthlyInvestment * 0.003 * 12);
         totalFees5Years = totalFees1Year * 5;
         totalFees10Years = totalFees1Year * 10;
         totalTaxes1Year = (totalProfit1Year > 12000) ? (totalProfit1Year - 12000) * 0.1 : 0;
         totalTaxes5Years = (totalProfit5Years > 12000) ? (totalProfit5Years - 12000) * 0.1 : 0;
         totalTaxes10Years = (totalProfit10Years > 12000) ? (totalProfit10Years - 12000) * 0.1 : 0;
         break;

      case 3: // Managed Stock Investments
         minReturns = initialInvestment * 0.04;
         maxReturns = initialInvestment * 0.23;
         totalProfit1Year = minReturns;
         totalProfit5Years = minReturns * 5;
         totalProfit10Years = minReturns * 10;
         totalFees1Year = (initialInvestment * 0.013) + (monthlyInvestment * 0.013 * 12);
         totalFees5Years = totalFees1Year * 5;
         totalFees10Years = totalFees1Year * 10;
         totalTaxes1Year = (totalProfit1Year > 12000) ? (totalProfit1Year - 12000) * 0.1 : 0;
         totalTaxes5Years = (totalProfit5Years > 12000) ? (totalProfit5Years - 12000) * 0.1 : 0;
         totalTaxes10Years = (totalProfit10Years > 12000) ? (totalProfit10Years - 12000) * 0.1 + (totalProfit10Years - 40000) * 0.2 : 0;
         break;

      default:
         // Handle invalid investment type
         quoteResult.innerHTML = "Invalid investment type selected.";
         return;
   }

   // Display the investment quote
   quoteResult.innerHTML = `<strong>1 Year:</strong><br>
                            Minimum Returns: £${minReturns.toFixed(2)}<br>
                            Maximum Returns: £${maxReturns.toFixed(2)}<br>
                            Total Profit: £${totalProfit1Year.toFixed(2)}<br>
                            Total Fees: £${totalFees1Year.toFixed(2)}<br>
                            Total Taxes: £${totalTaxes1Year.toFixed(2)}<br><br>
                            <strong>5 Years:</strong><br>
                            Minimum Returns: £${(minReturns * 5).toFixed(2)}<br>
                            Maximum Returns: £${(maxReturns * 5).toFixed(2)}<br>
                            Total Profit: £${totalProfit5Years.toFixed(2)}<br>
                            Total Fees: £${totalFees5Years.toFixed(2)}<br>
                            Total Taxes: £${totalTaxes5Years.toFixed(2)}<br><br>
                            <strong>10 Years:</strong><br>
                            Minimum Returns: £${(minReturns * 10).toFixed(2)}<br>
                            Maximum Returns: £${(maxReturns * 10).toFixed(2)}<br>
                            Total Profit: £${totalProfit10Years.toFixed(2)}<br>
                            Total Fees: £${totalFees10Years.toFixed(2)}<br>
                            Total Taxes: £${totalTaxes10Years.toFixed(2)}`;

   // Show the investment quote
   investmentQuote.classList.remove("hidden");
});

// Get a reference to the "Submit" button
const submitBtn = document.getElementById('submitBtn');

// Add a click event listener to the button
submitBtn.addEventListener('click', function() {
  // Hide the button
  submitBtn.style.display = 'none';

  // Get the entire HTML content
  const htmlContent = document.documentElement;

  // Remove buttons from the HTML content
  const buttons = htmlContent.querySelectorAll('button');
  buttons.forEach(function(button) {
    button.remove();
  });

  // Use html2pdf library to generate the PDF
   html2pdf()
    .from(htmlContent)
    .save()
    .then(function() {
        // Show the button again after PDF is saved
        submitBtn.style.display = 'block';

        // Refresh the HTML page after a delay of 3 seconds
        setTimeout(function() {
            location.reload();
        }, 1000);
    });
});



