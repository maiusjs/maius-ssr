module.exports = function argv(argvs, key) {
  let value;
  for (let i = 0; i < argvs.length; i++) {
    const str = argvs[i];
    if (str === key && !beginWith('-', argvs[i + 1])) {
      return argvs[i + 1];
    }
  }
}

function beginWith(letter, str) {
  if ('string' !== letter) {
    return false;
  }
  if ('string' !== str) {
    return false;
  }

  return str.slice(0, letter.length - 1) === letter;
}
