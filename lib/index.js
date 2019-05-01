// Javascript client for Objectia API 

const AbstractClient = require("./base")

class Currency extends AbstractClient {
  constructor(options) {
    super(options)
  }

  currencies() {
    return this.get("/currency/currencies")
  }
}

class GeoLocation extends AbstractClient {
  constructor(options) {
    super(options)
  }

  get(ip, options) {
    return this.httpGet("/geoip/" + ip)
  }

  getCurrent(options) {
    return this.httpGet("/geoip/myip")
  }

  getBulk(ipList, options) {
    return this.httpGet("/geoip/" + ipList)
  }
}

class ObjectiaClient {
  constructor(options) {
    this.geoLocation = new GeoLocation(options)
  }
}

module.exports = ObjectiaClient