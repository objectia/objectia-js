'use strict'

const chai = require('chai')
const assert = chai.assert
const expect = chai.expect
const should = chai.should()

const validate = require("../lib/validator")

let schema = {
  "name": "Message",
  "type": "object",
  "properties": {
    "from": {
      "type": "string",
      //"min": 1,
      //"max": 5,
    },
    "to": {
      "type": "array",
      "min": 1,
      "max": 50,
      "items": {
        "type": "string",
        "min": 1,
        "max": 100,
      }
    },
    "subject": {
      "type": "string",
    },
    "text": {
      "type": "string",
    },
    "limit": {
      "type": "number",
    },
    "price": {
      "type": "number",
    },
    "active": {
      "type": "boolean",
    },
    "today": {
      "type": "date",
    }
  },
  "required": ["from", "to", "subject", "text"]
}



describe('Validator', function () {
  it('should validate json object', function () {

    let obj = {
      from: "joey@example.com",
      to: ["john@example.com", "steve@example.com"],
      subject: "Test",
      text: "This is a test",
      limit: 89,
      price: 9.99,
      active: true,
      today: new Date(),
    }

    try {
      validate(obj, schema)
    } catch (err) {
      console.log(err)
      should.not.exist(err)
    }
  })

  it('should validate string', function () {
    let schema = {
      "name": "Parameter",
      "type": "string",
      "min": 1,
      "max": 10,
    }

    // Good
    try {
      validate("test", schema)
    } catch (err) {
      should.not.exist(err)
    }

    // Bad - too short
    try {
      validate("", schema)
    } catch (err) {
      should.exist(err)
    }

    // Bad - too long
    try {
      validate("testtesttest", schema)
    } catch (err) {
      should.exist(err)
    }

    // Bad - wrong type
    try {
      validate(1, schema)
    } catch (err) {
      should.exist(err)
    }

    // Bad - wrong type
    try {
      validate(null, schema)
    } catch (err) {
      should.exist(err)
    }
  })


  it('should validate string', function () {
    let schema = {
      "name": "Parameter",
      "type": "array",
      "items": {
        "type": "string",
        "min": 1,
        "max": 3,
      },
      "min": 1,
      "max": 3,
    }

    // Good
    try {
      validate(["test"], schema)
    } catch (err) {
      should.not.exist(err)
    }

    // Bad - too short
    try {
      validate([], schema)
    } catch (err) {
      should.exist(err)
    }

    // Bad - too long
    try {
      validate(["1", "2", "3", "4"], schema)
    } catch (err) {
      should.exist(err)
    }

    // Bad - items too long
    try {
      validate(["1234"], schema)
    } catch (err) {
      should.exist(err)
    }

    // Bad - wrong item type
    try {
      validate([1, 2, 3], schema)
    } catch (err) {
      should.exist(err)
    }


    // Bad - wrong type
    try {
      validate(1, schema)
    } catch (err) {
      should.exist(err)
    }

    // Bad - wrong type
    try {
      validate(null, schema)
    } catch (err) {
      should.exist(err)
    }
  })

})