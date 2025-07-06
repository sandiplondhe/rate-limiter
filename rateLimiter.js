const rateLimitWindowMs = 1 * 60 * 1000;
const maxRequests = 5;
const ipRequestLogs = {};

function rateLimiter(req, res, next) {
  const ip = req.ip;
  const currentTime = Date.now();
  if (!ipRequestLogs[ip]) {
    ipRequestLogs[ip] = [];
  }

  ipRequestLogs[ip] = ipRequestLogs[ip].filter(
    (log) => log.timestamp > currentTime - rateLimitWindowMs
  );
  if (ipRequestLogs[ip].length >= maxRequests) {
    res.status(429).send("Too many requests, please try again later");
  } else {
    ipRequestLogs[ip].push({ timestamp: currentTime });
    next();
  }
}

module.exports = rateLimiter;
