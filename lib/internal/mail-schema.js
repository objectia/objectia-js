const messageSchema = {
  "id": "/Message",
  "type": "object",
  "properties": {
    "date": {
      "type": "date"
    },
    "from": {
      "type": "string",
      "max": 50,
    },
    "from_name": {
      "type": "string",
      "max": 50,
    },
    "to": {
      "type": "array",
      "min": 1,
      "max": 50,
      "items": {
        "type": "string",
      }
    },
    "cc": {
      "type": "array",
      "min": 1,
      "max": 50,
      "items": {
        "type": "string"
      }
    },
    "bcc": {
      "type": "array",
      "min": 1,
      "max": 50,
      "items": {
        "type": "string"
      }
    },
    "reply_to": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "text": {
      "type": "string"
    },
    "html": {
      "type": "string"
    },
    "attachments": {
      "type": "array",
      "max": 10,
      "items": {
        "type": "string"
      }
    },
    "tags": {
      "type": "array",
      "max": 3,
      "items": {
        "type": "string"
      }
    },
    "charset": {
      "type": "string"
    },
    "encoding": {
      "type": "string"
    },
    "require_tls": {
      "type": "boolean"
    },
    "verify_cert": {
      "type": "boolean"
    },
    "open_tracking": {
      "type": "boolean"
    },
    "click_tracking": {
      "type": "boolean"
    },
    "html_click_tracking": {
      "type": "boolean"
    },
    "unsubscribe_tracking": {
      "type": "boolean"
    },
    "test_mode": {
      "type": "boolean"
    },
  },
  "required": ["from", "to", "subject", "text"]
}

module.exports = messageSchema