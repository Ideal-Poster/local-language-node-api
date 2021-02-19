let mongoose = require('mongoose')
let Bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')

let Schema = mongoose.Schema

let validatePassword = (password) => {
  return /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
    password
  )
}

let validateEmail = (email) => {
  return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
    email
  )
}

let hashPassword = (password) => {
  if (validatePassword(password)) {
    return Bcrypt.hashSync(password, 10)
  } else {
    return password
  }
}

let UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100,
    // unique: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validateEmail,
      message: (props) => `${props.value} is not a valid email.`,
    },
  },
  password: {
    type: String,
    required: true,
    set: hashPassword,
    validator: {
      validator: validatePassword,
      message: (props) => `${props.value} is not a valid password.`,
    },
  },
})

UserSchema.virtual('generateToken').get(function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.JWT_SECRET
  )
})

module.exports = mongoose.model('User', UserSchema)
