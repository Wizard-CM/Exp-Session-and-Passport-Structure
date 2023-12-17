import mongoose from "mongoose";

async function connect() {
  await mongoose.connect("mongodb://127.0.0.1/27017", {
    dbName: "passport",
  });
  console.log("db connected");
}

const user_schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
});

export const user_Model = mongoose.model("user_Model", user_schema);

export default connect;
