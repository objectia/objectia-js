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
    let query = this.client.makeQuery(opts)
    return this.client.get('/v1/geoip/' + ip + query)
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
    let query = this.client.makeQuery(opts)
    return this.client.get('/v1/geoip/' + ipList + query)
  }
}

module.exports = GeoLocation