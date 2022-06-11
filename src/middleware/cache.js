const getExpeditiousCache = require("express-expeditious");


const cacheInit = getExpeditiousCache({
  // Namespace used to prevent cache conflicts, must be alphanumeric
  namespace: "scrapedcache",

  // Store cache entries for 1 minute (can also pass milliseconds e.g 60000)
  defaultTtl: "5 minute",
});



// the initial call to this will take 2 seconds, but any subsequent calls
// will receive a response instantly from cache for the next hour
// app.get("/ping", cache.withTtl("1 hour"), (req, res) => {
//   setTimeout(() => {
//     res.end("pong");
//   }, 2000);
// });

// Cache everything below this line for 1 minute (defaultTtl)
// app.use(cache);
