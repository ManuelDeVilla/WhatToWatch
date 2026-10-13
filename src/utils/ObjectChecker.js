/**
 * Checks if the argument or the passed value is an object
 * @param {*} val - The value to check
 * @returns {boolean} e.g True if the arguement is an object, False if not
 */
export default function isObject(val) {
  return Object.prototype.toString.call(val) === '[object Object]'
}