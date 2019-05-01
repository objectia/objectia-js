'use strict'

const chai = require('chai')
const assert = chai.assert
const expect = chai.expect
const should = chai.should()

const ObjectiaClient = require('../lib/index')

const client = new ObjectiaClient({
  apiKey: 'test',
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
      let resp = await client.geoLocation.get('8.8.8.8')
      should.exist(resp)
      resp.should.be.an('object')
      let location = resp.data
      location.country_code.should.be.equal('US')
    } catch (err) {
      should.not.exist(err)
    }
  })

  it('should get geo location with options', async function () {
    try {
      let resp = await client.geoLocation.get('8.8.8.8', {
        fields: 'country_code'
      })
      should.exist(resp)
      resp.should.be.an('object')
      let location = resp.data
      location.country_code.should.be.equal('US')
    } catch (err) {
      should.not.exist(err)
    }
  })

  it('should fail get geo location for invalid IP', async function () {
    try {
      let resp = await client.geoLocation.get('288.8.8.8')
      should.not.exist(resp)
    } catch (err) {
      should.exist(err)
      err.code.should.be.equal('err-invalid-ip')
    }
  })


  it('should get geo location of current IP', async function () {
    try {
      let resp = await client.geoLocation.getCurrent()
      should.exist(resp)
      resp.should.be.an('object')
    } catch (err) {
      should.not.exist(err)
    }
  })

  it('should get multiple geo locations', async function () {
    try {
      let resp = await client.geoLocation.getBulk('8.8.8.8,google.com')
      should.exist(resp)
      resp.should.be.an('object')
      let locations = resp.data
      locations.should.be.an('array')
      assert.equal(locations.length, 2)
    } catch (err) {
      should.not.exist(err)
    }
  })

  it('should get usage data', async function () {
    try {
      let resp = await client.usage.get()
      should.exist(resp)
      resp.should.be.an('object')
    } catch (err) {
      should.not.exist(err)
    }
  })

})