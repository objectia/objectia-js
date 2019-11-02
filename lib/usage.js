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

module.exports = Usage