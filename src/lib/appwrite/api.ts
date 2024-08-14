import { INewUser } from "@/types";
import { ID } from "appwrite";
import { account } from "../config";

const CreateUserAccount = async (user: INewUser) => {
  try {
    console.log(user);
    const newAccount = await account.create(ID.unique(), user.email, user.password, user.name);
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default CreateUserAccount;
