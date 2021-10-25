Number.prototype.toString = function() {
  return JSON.stringify(this);
};

Array.prototype.toString = function() {
  return JSON.stringify(this);
};

Boolean.prototype.toString = function() {
  return JSON.stringify(this);
};

Object.prototype.toString = function() {
  return JSON.stringify(this);
};

console.log((12).toString());
console.log([12].toString());
console.log({a: 12}.toString());
