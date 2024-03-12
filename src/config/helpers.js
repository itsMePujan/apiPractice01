const generateRandomString = (len = 100) => {
  let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let lengths = chars.length;
  let random = "";
  for (let i = 1; i <= len; i++) {
    let pos = Math.ceil(Math.random() * lengths);
    random += chars[pos];
  }
  //console.log(random);
  return random;
};

module.exports = { generateRandomString };
