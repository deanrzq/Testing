function Celcius_Fahrenheit() {
    var celcius = parseFloat(document.getElementById("inputField").value);
    if (!isNaN(celcius)) {
      var fahrenheit = (celcius * 9 / 5) + 32;
      var calculationText = celcius + "°C = (" + celcius + " * 9/5) + 32 = " + fahrenheit.toFixed(2) + "°F";
      document.getElementById("outputField").value = fahrenheit.toFixed(2);
      document.getElementById("Calculation").value = calculationText;
    }
  }
  
  function reset() {
    document.getElementById("inputField").value = "";
    document.getElementById("outputField").value = "";
    document.getElementById("Calculation").value = "";
  }
  
  function reverse() {
    var inputLabel = document.querySelector('label[for="inputField"]');
    var outputLabel = document.querySelector('label[for="outputField"]');
    var inputField = document.getElementById("inputField");
    var outputField = document.getElementById("outputField");
    var calculationField = document.getElementById("Calculation");
  
    var tempValue = inputField.value;
    inputField.value = outputField.value;
    outputField.value = tempValue;
  
    if (inputField.value !== "") {
      var celcius = (parseFloat(inputField.value) - 32) * 5 / 9;
      var calculationText = inputField.value + "°F = ((" + inputField.value + " - 32) * 5/9) = " + celcius.toFixed(2) + "°C";
      calculationField.value = calculationText;
    } else {
      calculationField.value = "";
    }
  
    var tempText = inputLabel.textContent;
    inputLabel.textContent = outputLabel.textContent;
    outputLabel.textContent = tempText;
  }
  