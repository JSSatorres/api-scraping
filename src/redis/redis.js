const redis = require("redis");

async function redisFun(req, res, next) {
  try {
    const client = await  redis.createClient().open("redis://localhost:6379")
    res.status(200).send({
      data: "info",
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { redisFun };
