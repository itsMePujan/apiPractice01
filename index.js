const app = require("./src/config/express.config");
//config from .env
const PORT = Number(process.env.PORT);

//app listing
app.listen(PORT, () => {
  console.log(`App Is Running On ${PORT}`);
});
