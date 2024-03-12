// import Config
import { db } from '../../../config/firebase'

// Import Libraries

// import interface
import { UserBasicInterface } from '../../../interface/UserInterface'

// Import Thirdparty


class UserRepo {
  /*
  * 😎 @author : Bhavya Nayak
  * 🚩 @uses : to save user data
  * 🗓 Created : 14/02/2024
  */
  async saveUserData(data: UserBasicInterface) {
    try {
      const userData = await db.collection('users').add(data)

      const doc = await userData.get()

      return {
        id: doc.id,
        ...doc.data(),
      }
    } catch (error) {
      throw error
    }
  }

  /*
  * 😎 @author : Bhavya Nayak
  * 🚩 @uses : to update user data
  * 🗓 Created : 14/02/2024
  */
  async updateUserData(data: any, docId:string) {
    try {
      await db.collection('users').doc(docId).update(data)

      const [userData] = await this.getUserData(data.email)

      return userData
    } catch (error) {
      throw error
    }
  }

  /*
    * 😎 @author : Bhavya Nayak
    * 🚩 @uses : to get user data
    * 🗓 Created : 14/02/2024
    */
  async getUserData(email: string) {
    try {
      const user = await db.collection('users').where('email', '==', email).get()

      return user.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      throw error
    }
  }

}
export default new UserRepo()
