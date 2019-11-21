'use strict'

const chai = require('chai')
const assert = chai.assert
const expect = chai.expect
const should = chai.should()

const objectia = require('../lib/index')

const client = new objectia({
  apiKey: process.env.OBJECTIA_APIKEY,
  //logger: console,
})

describe('Client', function () {

  it('should get client version', async function () {
    let v = client.getVersion()
    should.exist(v)
    v.should.be.a('string')
  })

  it('should get geo location', async function () {
    try {
      let location = await client.geoip.get('8.8.8.8')
      should.exist(location)
      location.should.be.an('object')
      location.country_code.should.be.equal('US')
    } catch (err) {
      should.not.exist(err)
    }
  })

  it('should get geo location using promise', function () {
    client.geoip.get("8.8.8.8").then((location) => {
      should.exist(location)
      location.should.be.an('object')
      location.country_code.should.be.equal('US')
    }).catch((err) => {
      should.not.exist(err)
    })
  })

  it('should get geo location with options', async function () {
    try {
      let location = await client.geoip.get('8.8.8.8', {
        fields: 'country_code'
      })
      should.exist(location)
      location.should.be.an('object')
      location.country_code.should.be.equal('US')
    } catch (err) {
      should.not.exist(err)
    }
  })

  it('should fail get geo location for invalid IP', async function () {
    try {
      let location = await client.geoip.get('x')
      should.not.exist(location)
    } catch (err) {
      should.exist(err)
      err.code.should.be.equal('err-invalid-ip')
    }
  })


  it('should get geo location of current IP', async function () {
    try {
      let location = await client.geoip.getCurrent()
      should.exist(location)
      location.should.be.an('object')
    } catch (err) {
      should.not.exist(err)
    }
  })

  it('should get multiple geo locations', async function () {
    try {
      let locations = await client.geoip.getBulk('8.8.8.8,google.com')
      should.exist(locations)
      locations.should.be.an('array')
      assert.equal(locations.length, 2)
    } catch (err) {
      should.not.exist(err)
    }
  })


  it('should get usage data', async function () {
    try {
      let usage = await client.usage.get()
      should.exist(usage)
      usage.should.be.an('object')
    } catch (err) {
      should.not.exist(err)
    }
  })


  it('should send an email', async function () {
    try {
      let m = {
        from: 'ok@demo2.org',
        to: ['ok@demo2.org'],
        subject: 'Test',
        text: 'This is just a test',
        attachments: ['/Users/otto/me.png']
      }
      let receipt = await client.mail.send(m)
      //console.log(receipt)
      should.exist(receipt)
      receipt.should.be.an('object')
      assert.notEmpty(receipt.id)
      assert.equal(receipt.accepted_recipients, 1)
      assert.equal(receipt.rejected_recipients, 0)
    } catch (err) {
      console.log(err)
      should.not.exist(err)
    }
  })
})