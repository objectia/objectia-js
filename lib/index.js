// Javascript client for Objectia API 

const RestClient = require('./rest')
const VERSION = require("../package.json").version
const GeoLocation = require('./geoip')
const Mail = require('./mail')
const Usage = require('./usage')

class ObjectiaClient {
  constructor(options) {
    const client = new RestClient(options)
    this.geoip = new GeoLocation(client)
    this.mail = new Mail(client)
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