const FormData = require('form-data')
const path = require('path')
const fs = require('fs')

const validate = require('./internal/validator')
const schema = require('./internal/mail-schema')

// Mail API
class Mail {
  constructor(client) {
    this.client = client
  }

  /**
   * Send mail message.
   * 
   * @param {string} message object. 
   * @returns {object} JSON object with mail receipt.
   * @throws {object} JSON object with error message.
   */
  send(message) {
    validate(message, schema)

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

module.exports = Mail