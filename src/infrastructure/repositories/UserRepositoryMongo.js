import { UserModel } from "../db/UserModel.js";

class UserRepositoryMongo {

  async create(userData) {
    const user = new UserModel(userData);
    return await user.save();
  }

  async findAll() {
    return await UserModel.find();
  }

  async findById(id) {
   return await UserModel.findById(id);
  }

  async findByUserEmail(email) {
    return await UserModel.findOne({email:email});
  }
  
}

export default UserRepositoryMongo;