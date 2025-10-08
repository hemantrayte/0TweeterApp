import dotenv from "dotenv";
dotenv.config();

import { app } from "./app.js";
import connectDB from "./db/connect.js";

const PORT = process.env.PORT || 4500;

console.log("Loaded MONGODB_URI =", process.env.MONGODB_URI);

console.log(process.env.PORT, "Port");

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log("Connection Error:", error));
