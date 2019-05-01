// Javascript client for Objectia API 

const RestClient = require('./rest')
const VERSION = require("../package.json").version

// GeoLocation API
class GeoLocation {
  constructor(client) {
    this.client = client
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
    return this.client.get('/geoip/' + ip + query)
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
    return this.client.get('/geoip/' + ipList + query)
  }
}

// Usage API
class Usage {
  constructor(client) {
    this.client = client
  }

  /**
   * Get API usage for current month.
   * 
   * @returns {object} JSON object.
   * @throws {object} JSON object with error message.
   */
  get() {
    return this.client.get('/usage')
  }
}

class ObjectiaClient {
  constructor(options) {
    const client = new RestClient(options)
    this.geoLocation = new GeoLocation(client)
    this.usage = new Usage(client)
  }

  /**
   * Get client version
   * 
   * @returns {string} Version number.
   */
  getVersion() {
    return VERSION
  }
}

module.exports = ObjectiaClient