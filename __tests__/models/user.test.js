/**
 * jest-environment node
 */

import { db } from '../../db/utils'
import Bcrypt from 'bcryptjs'
import User from '../../models/user/User'
import jwt from 'jsonwebtoken'

describe('The User model', () => {
  const invalidUser = {
    name: 'User Name',
    email: 'testom',
    password: 'password',
  }

  const validUser = {
    name: 'validUser',
    email: 'test@user.com',
    password: 'e@3E23@s',
  }

  let createdUser
  let failedUser

  beforeAll(async () => {
    await db.connect()
    createdUser = await User.create(validUser)
  })

  it('should hash the user password before saving to the database.', async () => {
    expect(Bcrypt.compareSync(validUser.password, createdUser.password)).toBe(
      true
    )
  })

  describe('the generateToken method', () => {
    it('should generate a valid jwt for a user', () => {
      const token = createdUser.generateToken
      const { _id } = jwt.verify(token, `${process.env.JWT_SECRET}`)
      expect(createdUser._id.toString()).toMatch(_id)
    })
  })

  afterAll(async () => {
    await db.disconnect()
  })
})
