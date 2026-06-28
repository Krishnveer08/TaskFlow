const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://krishnveer08_db_user:Harsh12345@cluster0.ubvclnt.mongodb.net/taskflow?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => {
  console.log("Connected");
  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});