const passwordBox = document.getElementById("password");
const lengthInput = document.getElementById("length");
const tooltip = document.getElementById("tooltip");
const generateButton = document.getElementById("generateButton");
const strengthText = document.getElementById("strengthText");

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const symbol = "!@#$%^&*()_+[]{}|;:,.<>?";

const allChars = upperCase + lowerCase + number + symbol;

function getRandomChar(str) {
  return str[Math.floor(Math.random() * str.length)];
}

function shuffleString(str) {
  return str
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

function checkPasswordStrength(password) {
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*()_+\[\]{}|;:,.<>?]/.test(password);
  const length = password.length;

  let strength = 0;
  if (hasUpper) strength++;
  if (hasLower) strength++;
  if (hasNumber) strength++;
  if (hasSymbol) strength++;
  if (length >= 12) strength++;

  if (strength >= 5) return "Strong";
  if (strength >= 3) return "Medium";
  return "Weak";
}

function createPassword() {
  let length = parseInt(lengthInput.value);
  if (isNaN(length) || length < 6 || length > 30) {
    alert("Password length must be between 6 and 30 characters.");
    generateButton.disabled = true;
    return;
  }

  generateButton.disabled = false;

  let password = [
    getRandomChar(upperCase),
    getRandomChar(lowerCase),
    getRandomChar(number),
    getRandomChar(symbol),
  ];

  while (password.length < length) {
    password.push(getRandomChar(allChars));
  }

  password = shuffleString(password.join(""));

  passwordBox.value = password;
  strengthText.textContent = checkPasswordStrength(password);
}

function copyPassword() {
  if (!passwordBox.value) return;

  navigator.clipboard
    .writeText(passwordBox.value)
    .then(() => {
      tooltip.style.display = "block";
      setTimeout(() => {
        tooltip.style.display = "none";
      }, 1500);
    })
    .catch((err) => console.error("Failed to copy:", err));
}

lengthInput.addEventListener("input", () => {
  const length = parseInt(lengthInput.value);
  if (isNaN(length) || length < 6 || length > 30) {
    generateButton.disabled = true;
  } else {
    generateButton.disabled = false;
  }
});
