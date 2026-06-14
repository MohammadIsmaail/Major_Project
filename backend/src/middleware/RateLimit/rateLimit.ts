import rateLimit from "express-rate-limit";

export const UserRegRatelimit = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10,                  // sirf 5 requests
    message: {
        success: false,
        message: "Too Many Requests! Please try again after 1 minute.",
        code:429
    }
});

export const UserLoginRatelimit = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10,                  // sirf 5 requests
    message: {
        success: false,
        message: "Too Many Requests! Please try again after 1 minute.",
        code:429
    }
});


export const AdminRegRatelimit = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10,                  // sirf 5 requests
    message: {
        success: false,
        message: "Too Many Requests! Please try again after 1 minute.",
        code:429
    }
});

export const AdminLogRatelimit = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10,                  // sirf 5 requests
    message: {
        success: false,
        message: "Too Many Requests! Please try again after 1 minute.",
        code:429
    }
});


