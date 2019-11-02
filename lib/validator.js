// Validate JSON object using a schema
function validate(instance, schema) {
  // Check types and values

  let typ = typeof (instance)
  if (typ === 'object') {
    if (Array.isArray(instance)) {
      typ = 'array'
    } else if (typeof instance.getMonth === 'function') {
      typ = 'date'
    }
  }

  let sTyp = schema['type']
  if (sTyp !== typ) {
    throw new Error(`expected ${sTyp}`)
  }

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
          if (val.length > 0) {
            let itm = val[0]
            let itmTyp = typeof (itm)
            let expItemTyp = s['items']['type']
            if (expItemTyp !== itmTyp) {
              throw new Error(`The array items of '${key}' must be of type ${expItemTyp}`)
            }
          }
          let expMin = s['min'] || 0
          let expMax = s['max'] || 10000000
          if (val.length < expMin) {
            throw new Error(`'${key}' must have at least ${expMin} item(s)`)
          }
          if (val.length > expMax) {
            throw new Error(`'${key}' must not have more than ${expMax} items`)
          }
        } else if (expTyp === 'string') {
          let expMin = s['min'] || 0
          let expMax = s['max'] || 10000000
          if (val.length < expMin) {
            throw new Error(`The property '${key}' must be at least ${expMin} character(s)`)
          }
          if (val.length > expMax) {
            throw new Error(`The property '${key}' must be less than ${expMax} characters`)
          }
        }
      }
    } else {
      // Not found in schema
      throw new Error(`'${key}' is an unexpected property`)
    }
  })

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

  return true
}

module.exports = validate