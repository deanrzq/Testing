let isReversed = false;

function validateInput() {
  const inputField = document.getElementById("inputField");
  const outputField = document.getElementById("outputField");
  const calc = document.getElementById("Calculation");
  const errorMsg = document.getElementById("errorMessage");

  function showError(message) {
    errorMsg.textContent = message;
    errorMsg.style.visibility = "visible";
    errorMsg.style.opacity = "1";
  }

  function hideError() {
    errorMsg.textContent = "";
    errorMsg.style.visibility = "hidden";
    errorMsg.style.opacity = "0";
  }

  let inputRaw = inputField.value.trim();

  // reset output & error
  hideError();
  outputField.value = "";
  calc.value = "";

  // Maksimal 10 karakter
  if (inputRaw.length > 10) {
    alert("Maksimal 10 karakter");
    inputField.value = inputRaw.slice(0, 10);
    return;
  }

  // Validasi hanya minus di depan, angka, dan titik
  if (!/^-?\d*\.?\d*$/.test(inputRaw)) {
    showError("Hanya boleh angka, titik, dan minus.");
    return;
  }

  // Minus hanya boleh di depan
  if (inputRaw.includes("-") && inputRaw.indexOf("-") !== 0) {
    showError("Minus hanya boleh di depan.");
    return;
  }

  // Maksimal 1 titik
  if ((inputRaw.match(/\./g) || []).length > 1) {
    showError("Hanya boleh 1 titik desimal.");
    return;
  }

  // Input seperti "-", ".", atau kosong → belum valid
  if (inputRaw === "-" || inputRaw === "." || inputRaw === "") {
    return;
  }
}

function convert() {
  const inputField = document.getElementById("inputField");
  const outputField = document.getElementById("outputField");
  const calc = document.getElementById("Calculation");
  const errorMsg = document.getElementById("errorMessage");

  if (errorMsg.textContent !== "") return; // Jangan convert kalau error

  let inputValue = parseFloat(inputField.value);

  if (isNaN(inputValue)) return;

  if (!isReversed) {
    let fahrenheit = (inputValue * 9 / 5) + 32;
    outputField.value = fahrenheit.toFixed(2);
    calc.value = `${inputValue}°C = (${inputValue} * 9/5) + 32 = ${fahrenheit.toFixed(2)}°F`;
  } else {
    let celcius = (inputValue - 32) * 5 / 9;
    outputField.value = celcius.toFixed(2);
    calc.value = `${inputValue}°F = ((${inputValue} - 32) * 5/9) = ${celcius.toFixed(2)}°C`;
  }
}

function reset() {
  document.getElementById("inputField").value = "";
  document.getElementById("outputField").value = "";
  document.getElementById("Calculation").value = "";
  document.getElementById("errorMessage").style.visibility = "hidden";
}

function reverse() {
  isReversed = !isReversed;

  const inputLabel = document.querySelector('label[for="inputField"]');
  const outputLabel = document.querySelector('label[for="outputField"]');

  const temp = inputLabel.textContent;
  inputLabel.textContent = outputLabel.textContent;
  outputLabel.textContent = temp;

  document.getElementById("outputField").value = "";
  document.getElementById("Calculation").value = "";
  document.getElementById("errorMessage").style.visibility = "hidden";
}
