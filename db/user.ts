import User from "./models/User";

export async function findUserById(userId: string) {
  try {
    return await User.findOne({ _id: userId });
  } catch (error) {
    throw error;
  }
}

export async function findUserByEmail(email: string) {
  try {
    let item = await User.findOne({ email });
    return item;
  } catch (error) {
    throw error;
  }
}

export async function registerUser({ ...payload }) {
  try {
    let newUser = new User(payload);

    await newUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
}
