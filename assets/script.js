//assignment
// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Character arrays
var specialCharacters = ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'];
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var lowerCasedCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var upperCasedCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Write password to the #password input
function writePassword() {
  // Prompt user for password criteria
  var criteria = getPasswordCriteria();

  // Validate user input
  if (!validatePasswordCriteria(criteria)) {
    alert("Please select at least one character type and provide a valid length (8-128 characters).");
    return;
  }

  // Generate password based on criteria and character arrays
  var password = generatePassword(criteria);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Function to prompt user for password criteria
function getPasswordCriteria() {
  var includeLowercase = confirm("Include lowercase letters?");
  var includeUppercase = confirm("Include uppercase letters?");
  var includeNumeric = confirm("Include numeric characters?");
  var includeSpecialChars = confirm("Include special characters?");
  var passwordLength = prompt("Choose a password length (between 8 and 128 characters):");

  return {
    includeLowercase,
    includeUppercase,
    includeNumeric,
    includeSpecialChars,
    passwordLength: parseInt(passwordLength),
  };
}

// Function to validate user input for password criteria
function validatePasswordCriteria(criteria) {
  return (
    (criteria.includeLowercase ||
      criteria.includeUppercase ||
      criteria.includeNumeric ||
      criteria.includeSpecialChars) &&
    !isNaN(criteria.passwordLength) &&
    criteria.passwordLength >= 8 &&
    criteria.passwordLength <= 128
  );
}

// Function to generate a password based on criteria and character arrays
function generatePassword(criteria) {
  var allCharacters = [];
  var finalPassword = '';

  if (criteria.includeLowercase) {
    allCharacters = allCharacters.concat(lowerCasedCharacters);
  }
  if (criteria.includeUppercase) {
    allCharacters = allCharacters.concat(upperCasedCharacters);
  }
  if (criteria.includeNumeric) {
    allCharacters = allCharacters.concat(numericCharacters);
  }
  if (criteria.includeSpecialChars) {
    allCharacters = allCharacters.concat(specialCharacters);
  }

  for (var i = 0; i < criteria.passwordLength; i++) {
    var randomIndex = Math.floor(Math.random() * allCharacters.length);
    finalPassword += allCharacters[randomIndex];
  }

  return finalPassword;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
