import { IUser, RoleModel, UserModel } from "../models/userModel.js";

class AuthService {
  async getAll() {
    try {
      const allUsers: IUser[] = await UserModel.find()
        .populate("roles")
        .select("-password");

      console.log(allUsers);

      return allUsers;
    } catch (err) {
      console.log(err);
    }
  }
  async getOne(userId: string) {
    try {
      const user: IUser = await UserModel.findById(userId)
        .populate("roles")
        .select("-password");
      return user;
    } catch (err) {
      console.log(err);
    }
  }

  async register(
    name: string,
    email: string,
    password: string,
    roleIds: string[] = []
  ): Promise<IUser> {
    try {
      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
        throw new Error(`User ${name} already exists`);
      }

      const rolesToAssign =
        roleIds.length > 0 ? roleIds : ["64fd87340d7b594f26bd9594"];

      const newUser: IUser = new UserModel({
        name,
        email,
        password,
        roles: rolesToAssign,
      });

      const savedUser = await newUser.save();

      return savedUser;
    } catch (error) {
      console.error(error);
      throw new Error("Registration failed.");
    }
  }

  async login() {}
}

export default new AuthService();
