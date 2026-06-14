import rateLimit from "express-rate-limit";

const ratelimit = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5,                  // sirf 5 requests
    message: {
        success: false,
        message: "Too Many Requests! Please try again after 1 minute."
    }
});

export default ratelimit