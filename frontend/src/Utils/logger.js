const isDevelopment = process.env.NODE_ENV === "development"; // ✅ Enable logs only in development

const Logger = {
  log: (...args) => {
    if (isDevelopment) console.log("📘 [LOG]:", ...args);
  },

  warn: (...args) => {
    if (isDevelopment) console.warn("⚠️ [WARNING]:", ...args);
  },

  error: (...args) => {
    console.error("❌ [ERROR]:", ...args);
  },

  info: (...args) => {
    if (isDevelopment) console.info("ℹ️ [INFO]:", ...args);
  },
};

export default Logger;
