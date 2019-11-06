//
// Detect if we're running in Browser or Node.JS
//
var isNode = function () {
  var windowTest
  try {
    //if window is declared thorugh JS DOM then window will be defined but will not be equal to this
    windowTest = this === window
  } catch (e) {
    return true
  }
  try {
    return this === global && !windowTest
  } catch (e) {
    return false
  }
}

module.exports = isNode