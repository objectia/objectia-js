// Javascript client for Objectia API 

const RestClient = require('./rest')
const VERSION = require("../package.json").version
const FormData = require('form-data')
const path = require('path')
const fs = require('fs')

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

// Mail API
class Mail {
  constructor(client) {
    this.client = client
  }

  /**
   * Send message.
   * 
   * @returns {object} JSON object.
   * @throws {object} JSON object with error message.
   */
  send(message) {
    let form = new FormData()
    Object.keys(message).forEach(function (key) {
      if (Array.isArray(message[key])) {
        message[key].forEach(function (item) {
          if (key === 'attachments') {
            form.append(path.basename(item), fs.createReadStream(item))
          } else {
            form.append(key, item)
          }
        })
      } else {
        form.append(key, message[key])
      }
    })
    return this.client.post('/v1/mail/send', form)
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
    return this.client.get('/v1/usage')
  }
}

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