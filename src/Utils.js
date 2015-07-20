export default class Utils {
  extend(array) {
    let _arr = [];
    let length = array.length;
    for (let i = 0; i < length; i++) {
      _arr[i] = array[i];
    }
    return _arr;
  }
}
