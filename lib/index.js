// Javascript client for Objectia API 

const AbstractClient = require('./base')
const VERSION = require("../package.json").version

// GeoLocation API
class GeoLocation extends AbstractClient {
  constructor(options) {
    super(options)
  }

  /**
   * Get geolocation for IP address.
   * 
   * @param {string} ip 
   * @param {object} options
   * @returns {object} JSON object.
   * @throws {object} JSON object with error message.
   */
  get(ip, options) {
    const opts = options || {
      fields: '',
      hostname: false,
      security: false,
    }
    let query = '?fields=' + opts.fields
    if (opts.hostname) {
      query += '&hostname=true'
    }
    if (opts.security) {
      query += '&security=true'
    }
    return this.httpGet('/geoip/' + ip + query)
  }

  /**
   * Get geolocation for caller's IP address.
   * 
   * @param {object} options
   * @returns {object} JSON object.
   * @throws {object} JSON object with error message.
   */
  getCurrent(options) {
    return this.get('myip', options)
  }

  /**
   * Get geolocation for multiple IP addresses.
   * 
   * @param {string} ipList 
   * @param {object} options
   * @returns {object} JSON object.
   * @throws {object} JSON object with error message.
   */
  getBulk(ipList, options) {
    const opts = options || {
      fields: '',
      hostname: false,
      security: false,
    }
    let query = '?fields=' + opts.fields
    if (opts.hostname) {
      query += '&hostname=true'
    }
    if (opts.security) {
      query += '&security=true'
    }
    return this.httpGet('/geoip/' + ipList + query)
  }
}

// Usage API
class Usage extends AbstractClient {
  constructor(options) {
    super(options)
  }

  /**
   * Get API usage for current month.
   * 
   * @returns {object} JSON object.
   * @throws {object} JSON object with error message.
   */
  get() {
    return this.httpGet('/usage')
  }
}


class ObjectiaClient {
  constructor(options) {
    this.geoLocation = new GeoLocation(options)
    this.usage = new Usage(options)
  }

  /**
   * Get client version
   * 
   * @returns {string} Version number.
   */
  getVersion = function () {
    return VERSION
  }
}

module.exports = ObjectiaClient