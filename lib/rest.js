const axios = require("axios")
const isNode = require("./utils")

const VERSION = require("../package.json").version
const USER_AGENT = "objectia-js/" + VERSION
const API_BASE_URL = "https://api.objectia.com/rest/v1"
const DEFAULT_TIMEOUT = 30 // seconds
const DEFAULT_RETRY_MAX = 4
const DEFAULT_RETRY_WAIT_MIN = 1 // seconds
const DEFAULT_RETRY_WAIT_MAX = 30 // seconds

class RestClient {
  /**
   * Creates a new REST client.
   * 
   * @constructor
   * @param {object} options 
   */
  constructor(options) {
    const opts = options || {}
    this.apiKey = opts.apiKey
    this.apiBaseURL = opts.apiBaseURL || API_BASE_URL
    this.timeout = opts.timeout || DEFAULT_TIMEOUT
    this.logger = opts.logger
  }

  /**
   * Executes a HTTP GET.
   * 
   * @param {string} path 
   * @returns {object} JSON object.
   * @throws {object} JSON object with error message.
   */
  get(path) {
    return this._request("GET", path, null)
  }

  /**
   * Executes a HTTP PATCH.
   * 
   * @param {string} path 
   * @param {object} data 
   * @returns {object} JSON object.
   * @throws {object} JSON object with error message.
   */
  patch(path, data) {
    return this._request("PATCH", path, data)
  }

  /**
   * Executes a HTTP POST.
   * 
   * @param {string} path 
   * @param {object} data 
   * @returns {object} JSON object.
   * @throws {object} JSON object with error message.
   */
  post(path, data) {
    return this._request("POST", path, data)
  }

  /**
   * Executes a HTTP PUT.
   * 
   * @param {string} path 
   * @param {object} data 
   * @returns {object} JSON object.
   * @throws {object} JSON object with error message.
   */
  put(path, data) {
    return this._request("PUT", path, data)
  }

  /**
   * Executes a HTTP DELETE.
   * 
   * @param {string} path 
   * @returns {object} JSON object.
   * @throws {object} JSON object with error message.
   */
  delete(path) {
    return this._request("DELETE", path, null)
  }

  // Serialize object of properties to url query.
  makeQuery(obj) {
    let str = []
    for (let p in obj) {
      if (obj.hasOwnProperty(p)) {
        if (obj[p]) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
        }
      }
    }
    let result = str.join("&")
    if (result.length > 0) {
      result = "?" + result
    }
    return result
  }


  /**
   * Sends a HTTP request.
   * 
   * @param {string} method 
   * @param {string} path 
   * @param {object} data 
   * @returns {object} JSON object.
   * @throws {object} JSON object with error message.
   */
  _request(method, path, data) {

    if (this.logger) {
      let now = new Date().toISOString()
      this.logger.log(`${now} [DEBUG] ${method} ${path}`)
    }

    let headers = {
      "Accept": "application/json"
    }

    if (data) {
      headers["Content-Type"] = "application/json charset=utf-8"
    }

    if (this.apiKey) {
      headers["Authorization"] = "Bearer " + this.apiKey
    }

    if (isNode()) {
      headers["User-Agent"] = USER_AGENT
    }

    return axios({
        method: method,
        url: path,
        baseURL: this.apiBaseURL,
        timeout: this.timeout * 1000,
        headers: headers,
        data: data
      })
      .then(response => {
        return response.data
      })
      .catch(error => {
        if (error.response) {
          if (this.logger) {
            let now = new Date().toISOString()
            this.logger.error(`${now} [ERROR] ${error.response.data.message} (${error.response.data.code})`)
          }
          throw error.response.data
        } else {
          let message = ""
          if (error.code === "ESOCKETTIMEDOUT") {
            message = "Connection timed out"
          } else if (error.code === "ENOTFOUND") {
            message = "Host not found"
          } else if (error.code === "ECONNREFUSED") {
            message = "Connection refused"
          } else {
            message = error.message
          }

          if (this.logger) {
            let now = new Date().toISOString()
            this.logger.error(`${now} [ERROR] ${message} (${error.code})`)
          }

          throw {
            status: 0,
            success: false,
            code: error.code,
            message: message
          }
        }
      })
  }
}

module.exports = RestClient