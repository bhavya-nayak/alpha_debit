// Import Config
import config from '../../../config/constant'

// Import Library
import bcrypt from 'bcrypt'

// Tmport Thirdparty
import { sign } from 'jsonwebtoken'

class AuthHelper {
  /*
   * 😎 @author : Bhavya Nayak
   * 🚩 @uses : to comapre hash-passwords
   * 🗓 Created : 02/02/2023
   */
  async comparePassword(password: string, userPassword: string) {
    try {
      return bcrypt.compare(password, userPassword).then((response: any) => {
        if (response !== true) {
          return false
        }

        return true
      })
    } catch (error) {
      throw error
    }
  }

  /*
   * 😎 @author : Bhavya Nayak
   * 🚩 @uses : to generate hash-passwords
   * 🗓 Created : 02/02/2023
   */
  async generateHashPassword(password: string) {
    try {
      return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function(err: any, hash:string) {
          if (err) {
            reject(err)
          }

          resolve(hash)
        })
      })
    } catch (error) {
      throw error
    }
  }

  async generateAccessToken(container:any) {
    try {
      //
      // generate accessToken
      //
      const payload:any = {
        email: container.derived.user.email,
        id: container.derived.user.id,
      }

      const secretKey:any = config.app.JWT_SECRET_KEY
      const accessToken = sign(payload, secretKey, { expiresIn: '24h' })
      return accessToken
    } catch (error) {
      throw error
    }
  }
}

export default new AuthHelper()
