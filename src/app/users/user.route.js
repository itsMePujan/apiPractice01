const router = require("express").Router();

//get route for users
router.get("/", (req, res) => {
  res.json({ mssg: "hello from userRoute {{Get Method}}" });
});
//Post route for users
router.post("/", (req, res) => {
  console.log(req.body);
  res.json({ mssg: "hello from userRoute {{Post Method}}" });
});
//put route for users
router.put("/", (req, res) => {
  res.json({ mssg: "hello from userRoute {{Put Method}}" });
});
//patch route for users
router.patch("/", (req, res) => {
  res.json({ mssg: "hello from userRoute {{Patch Method}}" });
});
//delete route for Users
router.delete("/", (req, res) => {
  res.json({ mssg: "hello from userRoute {{Delete Method}}" });
});

module.exports = router;
