// Javascript client for Objectia API 

const axios = require("axios")
const isNode = require("./utils")

const VERSION = require("../package.json").version
const USER_AGENT = "objectia-js/" + VERSION
const API_BASE_URL = "https://api.objectia.com/rest/v1"
const DEFAULT_TIMEOUT = 30 // seconds
const DEFAULT_RETRY_MAX = 4
const DEFAULT_RETRY_WAIT_MIN = 1 // seconds
const DEFAULT_RETRY_WAIT_MAX = 30 // seconds

class AbstractClient {
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
  }

  /**
   * Executes a HTTP GET.
   * 
   * @param {string} path 
   * @returns {object} JSON object.
   * @throws {object} JSON object with error message.
   */
  httpGet(path) {
    return this._request("get", path, null)
  }

  /**
   * Executes a HTTP PATCH.
   * 
   * @param {string} path 
   * @param {object} data 
   * @returns {object} JSON object.
   * @throws {object} JSON object with error message.
   */
  httpPatch(path, data) {
    return this._request("patch", path, data)
  }

  /**
   * Executes a HTTP POST.
   * 
   * @param {string} path 
   * @param {object} data 
   * @returns {object} JSON object.
   * @throws {object} JSON object with error message.
   */
  httpPost(path, data) {
    return this._request("post", path, data)
  }

  /**
   * Executes a HTTP PUT.
   * 
   * @param {string} path 
   * @param {object} data 
   * @returns {object} JSON object.
   * @throws {object} JSON object with error message.
   */
  httpPut(path, data) {
    return this._request("put", path, data)
  }

  /**
   * Executes a HTTP DELETE.
   * 
   * @param {string} path 
   * @returns {object} JSON object.
   * @throws {object} JSON object with error message.
   */
  httpDelete(path) {
    return this._request("delete", path, null)
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
          throw {
            status: 0,
            success: false,
            code: error.code,
            message: message
          }
          //console.log(error)
          //throw error
        }
      })
  }
}

module.exports = AbstractClient