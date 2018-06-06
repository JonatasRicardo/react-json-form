import Hashids from 'hashids';

export const lessThenZeroFormat = (_num) => {
  const num = parseInt(_num, 10);
  return num < 10 ? `0${num}` : `${num}`;
};

export const formateDate = (dateString, showTime = false) => {
  const portion = typeof dateString === 'string' ? 1 : 0;
  const data = new Date(dateString);
  if (data.toString() === 'Invalid Date' || !dateString) {
    return '__/__/__';
  }
  const time = showTime ? ` ${lessThenZeroFormat(data.getHours())}:${lessThenZeroFormat(data.getMinutes())}` : '';
  const formatedDate = `${lessThenZeroFormat(data.getDate() + portion)}/${lessThenZeroFormat(data.getMonth() + 1)}/${data.getFullYear()}${time}`;
  return formatedDate;
};

// Padronização ESLINT do módulo https://www.npmjs.com/package/react-key-index
export const keyIndex = (_array, digit) => {
  const hashids = new Hashids();
  let digits = [9, 9, digit];
  let obj = {};
  const array = _array;

  const result = array.map((_arr, index) => {
    let i = 0;
    const arr = _arr;
    const aleatory = (index + 1);
    digits.push(index);
    if (typeof arr === 'object') {
      Object.keys(arr).forEach((key) => {
        let k = '';
        digits.push(i);
        k = `ID_${key}`;
        arr[k] = hashids.encode([...digits, ...[aleatory]]);
        digits = digits.slice(0, 6);
        i += 1;
      });
      return arr;
    }
    obj = {
      value: arr,
      id: hashids.encode(digits),
    };
    digits = digits.slice(0, 5);
    return obj;
  });
  return result;
};

// "aplana" objetos e arrays
export const flatten = (arr) => {
  function dive(currentKey, into, _target) {
    const target = _target;
    Object.keys(into).forEach((i) => {
      let newKey = i;
      const newVal = into[i];

      if (currentKey.length > 0) {
        newKey = `${currentKey}.${i}`;
      }
      if (typeof newVal === 'object' && typeof newVal.getMonth !== 'function') {
        dive(newKey, newVal, target);
      } else {
        target[newKey] = newVal;
      }
    });
  }
  const newObj = {};
  dive('', arr, newObj);
  return newObj;
};

/* eslint-disable */
export const unflatten = (data) => {
  var resultArr = [];
  var resultObj = {};
  var result = resultArr;
  for (var i in data) {
    var keys = i.split('.');
    keys.reduce(function(r, e, j) {
      return r[e] || ( r[e] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 == j ? data[i] : {}) : [] )
    }, result)
  }
  return result
};
