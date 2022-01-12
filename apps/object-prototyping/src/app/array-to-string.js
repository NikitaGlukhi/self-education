String.prototype.replaceAll = function(searchValue, replaceValue) {
  return this.split(searchValue).join(replaceValue);
};

Array.prototype.toString = function() {
  return JSONStringify(this.valueOf()).replaceAll(`"`, `'`);
};

console.log([].toString());
console.log([[[[[[]]],[]]]].toString());
console.log([1.545,[2,4,[23532],55,2.3,[15.22,0.3,[],[[72,3],5]]]].toString());
console.log(["foobar",[["hello"]]].toString());

function JSONStringify(obj) {
  const isArray = (value) => {
    return Array.isArray(value) && typeof value === 'object';
  };

  const isObject = (value) => {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  };

  const isString = (value) => {
    return typeof value === 'string';
  };

  const isBoolean = (value) => {
    return typeof value === 'boolean';
  };

  const isNumber = (value) => {
    return typeof value === 'number';
  };

  // Common check for number, string and boolean value
  const restOfDataTypes = (value) => {
    return isNumber(value) || isString(value) || isBoolean(value);
  };

  // Boolean and Number behave in a same way and String we need to add extra qoutes
  if (restOfDataTypes(obj)) {
    const passQuotes = isString(obj) ? `"` : '';
    return `${passQuotes}${obj}${passQuotes}`;
  }

  // This function will be used to remove extra comma from the arrays and object
  const removeComma = (str) => {
    const tempArr = str.split('');
    tempArr.pop();
    return tempArr.join('');
  };

  // Recursive function call for Arrays to handle nested arrays
  if (isArray(obj)) {
    let arrStr = '';
    obj.forEach((eachValue) => {
      arrStr += JSONStringify(eachValue);
      arrStr += ','
    });

    return  `[` + removeComma(arrStr) + `]`;
  }

  // Recursive function call for Object to handle nested Object
  if (isObject(obj)) {

    let objStr = '';

    const objKeys = Object.keys(obj);

    objKeys.forEach((eachKey) => {
      const eachValue = obj[eachKey];
      objStr += `"${eachKey}":${JSONStringify(eachValue)},`;
    });
    return `{` + removeComma(objStr) + `}`;
  }
}
