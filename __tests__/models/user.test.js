/**
 * jest-environment node
 */

// import { connect, disconnect } from '../utils';
import Bcrypt from 'bcryptjs'

describe('The User model', () => {
  const user = {
    name: 'Test User',
    email: 'test@email.com',
    password: 'password'
  }

  beforeAll(async () => {
    await connect();
    createdUser = await user.create(user)
  })

  it('should hash the user password before saving the database', async () => {
    expect(Bcrypt.compareSync(user.password, createdUser.password)).toBe(true);
  });


  // describe('the generateToken method', () => {
  //   it('should generate a valid jwt for a user', () => {
  //     const token = createdUser.generateToken()
  //     const { id } = jwt.verify(token, `${process.env.JWT_SECRET}`)
  //   });
  // });
  
  


  afterAll(async () => {
    await disconnect()
  })
});
