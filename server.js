const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const app = express();
const port = 8000;

dotenv.config();
app.use(express.json());
connectDb();

app.use("/book", require("./routes/book.routes"));
app.use("/admin", require("./routes/admin.routes"));
app.use("/member", require("./routes/member.routes"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});