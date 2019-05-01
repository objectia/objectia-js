// Javascript client for Objectia API 

const AbstractClient = require('./base')

// GeoLocation API
class GeoLocation extends AbstractClient {
  constructor(options) {
    super(options)
  }

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

  getCurrent(options) {
    return this.get('myip', options)
  }

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

  get() {
    return this.httpGet('/usage')
  }
}


class ObjectiaClient {
  constructor(options) {
    this.geoLocation = new GeoLocation(options)
    this.usage = new Usage(options)
  }
}

module.exports = ObjectiaClient