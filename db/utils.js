require('dotenv').config()
let mongoose = require('mongoose')

exports.db = {
  connect: () =>
    mongoose.connect(
      `mongodb+srv://site_user:${process.env.DB_PASSWORD}@cluster0.5y7ad.mongodb.net/${process.env.DB_USERNAME}?retryWrites=true&w=majority`,
      { useNewUrlParser: true }
    ),
  disconnect: () => mongoose.connection.close(),
}
