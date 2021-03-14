const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant_List = require('./restaurants.json')
const SEED_USER = require('./user.json')
const Restaurant = require('../restaurant')
const User = require('../user')

const db = require('../../config/mongoose')

db.once('open', () => {
  SEED_USER.forEach((seedUser, index) => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash => User.create({
        name: seedUser.name,
        email: seedUser.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        return Promise.all(Array.from(
          { length: 3 }, // 產生3個空值的arr
          (_, i) =>
            Restaurant.create({
              // 展開，並將餐廳json的 第 0+0、1+0、2+0，連同第1組userId建立到餐廳清單
              // 再將 第0+3、0+4、0+5，與第2組userId建立到餐廳清單
              ...Restaurant_List.results[(i + (index * 3))], userId
            })))
      })
      .then(() => {
        console.log('done.')
        process.exit()
      })
      .catch((err) => {
        console.log(err)
        process.exit()
      })
  })
})