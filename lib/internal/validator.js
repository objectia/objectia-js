// Quick and Dirty JSON schema validator
function validate(instance, schema) {
  let typ = typeof (instance)
  if (typ === 'object') {
    if (Array.isArray(instance)) {
      typ = 'array'
    } else if (typeof instance.getMonth === 'function') {
      typ = 'date'
    }
  }

  let sName = schema['name']
  let sTyp = schema['type']
  if (sTyp !== typ) {
    throw new Error(`${sName} must be of type ${sTyp}`)
  }

  if (typ === "object") {
    // Check properties
    Object.keys(instance).forEach(function (key) {
      let val = instance[key]
      let typ = typeof (val)

      if (typ === 'object') {
        if (Array.isArray(val)) {
          typ = 'array'
        } else if (typeof val.getMonth === 'function') {
          typ = 'date'
        }
      }
      let s = schema.properties[key]
      if (s) {
        let expTyp = s['type']
        if (expTyp !== typ) {
          throw new Error(`'${key}' must be of type ${expTyp}`)
        } else {
          if (typ === 'array') {
            checkArray(key, val, s)
          } else if (expTyp === 'string') {
            checkString(key, val, s)
          }
        }
      } else {
        // Not found in schema
        throw new Error(`'${key}' is an unexpected property`)
      }
    })
  } else if (typ === "array") {
    // Check items
    checkArray(sName, instance, schema)
  } else {
    // Check value
    if (typ === "string") {
      checkString(sName, instance, schema)
    }
  }

  // Check if all required properties are present
  if (schema['required']) {
    for (let i = 0; i < schema['required'].length; i++) {
      let key = schema['required'][i]
      let val = instance[key]
      if (!val) {
        throw new Error(`'${key}' is a required property`)
      }
    }
  }
}

function checkArray(key, val, schema) {
  if (val.length > 0) {
    let itm = val[0]
    let itmTyp = typeof (itm)
    let expItemTyp = schema['items']['type']
    if (expItemTyp !== itmTyp) {
      throw new Error(`The items of '${key}' must be of type ${expItemTyp}`)
    }
  }
  let expMin = schema['minLength'] || 0
  let expMax = schema['maxLength'] || 10000000
  if (val.length < expMin) {
    throw new Error(`'${key}' must have at least ${expMin} item(s)`)
  }
  if (val.length > expMax) {
    throw new Error(`'${key}' can not have more than ${expMax} items`)
  }
}

function checkString(key, val, schema) {
  let expMin = schema['minLength'] || 0
  let expMax = schema['maxLength'] || 10000000
  if (val.length < expMin) {
    throw new Error(`'${key}' must be at least ${expMin} character(s)`)
  }
  if (val.length > expMax) {
    throw new Error(`'${key}' must be less than ${expMax} characters`)
  }
}

module.exports = validate