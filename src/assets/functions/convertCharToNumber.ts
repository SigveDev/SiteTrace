const ConvertCharToNumber = (char: string): string => {
  if (/\d/.test(char)) {
    return char;
  } else if (/[a-zA-Z]/.test(char)) {
    const lowerChar = char.toLowerCase();
    const number = lowerChar.charCodeAt(0) - "a".charCodeAt(0) + 1;
    return number.toString();
  } else {
    return "";
  }
};

export default ConvertCharToNumber;
