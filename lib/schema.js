const messageSchema = {
  'id': '/Message',
  'type': 'object',
  'properties': {
    'from': {
      'type': 'string'
    },
    'to': {
      'type': 'array',
      'min': 1,
      'max': 50,
      'items': {
        'type': 'string',
      }
    },
    'cc': {
      'type': 'array',
      'min': 1,
      'max': 50,
      'items': {
        'type': 'string'
      }
    },
    'bcc': {
      'type': 'array',
      'min': 1,
      'max': 50,
      'items': {
        'type': 'string'
      }
    },
    'subject': {
      'type': 'string'
    },
    'text': {
      'type': 'string'
    },
    'attachments': {
      'type': 'array',
      'max': 10,
      'items': {
        'type': 'string'
      }
    },
  },
  'required': ['from', 'to', 'subject', 'text']
}

module.exports = messageSchema