const logger = (req, res, next) => {
    const time = new Date().toLocaleString();
    console.log(`[${time}] | ${res.statusCode} - ${req.method} | ${req.originalUrl} | IP- ${req.ip}`);
    next();
};

module.exports = logger;