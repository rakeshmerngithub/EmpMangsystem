import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectWithDb = async () => {
  try {
    const DB_URL = process.env.DB_URL;
    await connect(DB_URL);
    console.log("successfully connected with DB");
  } catch (err) {
    console.log("not able to connect with db");
  }
};

export default connectWithDb;
