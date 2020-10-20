function isDigit(n) { return /^[0-9]$/.test(n); } 

function isNumeric(num){
    return !isNaN(num)
  }

function isLetter(n) {
return /^[a-zA-Z]$/.test(n);
}

var c = 'O';

console.log(isLetter(c));