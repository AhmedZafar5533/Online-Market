const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const otpRoutes = require("./routes/otpRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const adminRoutes = require("./routes/adminRoutes");
const servicePageRouter = require("./routes/servicesRouter");
const subscriptionRouter = require("./routes/subscriptionRoutes");

dotenv.config();
const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

require("./config/local-auth")(passport);

// Middleware
app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));

// CORS Middleware (Recommended)
// Remove the second CORS middleware and just use cors package
const corsOptions = {
  origin: [process.env.FRONTEND_URL || "https://online-market-sable-xi.vercel.app", "http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));



 app.set('trust proxy', 1);
 
 
 
 // CORS Middleware (Recommended)
 app.use((req, res, next) => {
   const allowedOrigins = [
     process.env.FRONTEND_URL || "https://online-market-sable-xi.vercel.app",
     "http://localhost:5173"
   ];
   
   const origin = req.headers.origin;
   if (allowedOrigins.includes(origin)) {
     res.setHeader("Access-Control-Allow-Origin", origin);
   }
   
   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
   res.setHeader("Access-Control-Allow-Credentials", "true");
   next();
 });
 

// Handle Preflight Requests
app.options("*", (req, res) => {
  res.sendStatus(200);
});

// Session Store
const store = MongoStore.create({
  mongoUrl: process.env.DB_URL,
  ttl: 24 * 60 * 60,
  autoremove: "interval",
  autoRemoveInterval: 10,
});

// Session Expiry Handling
store.on("destroy", async (sessionId) => {
  try {
    console.log(`Session expired: ${sessionId}`);
    const sessionData = await mongoose.connection.db
      .collection("sessions")
      .findOne({ _id: sessionId });

    if (sessionData && sessionData.session) {
      const userId = sessionData.session.userId;
      if (userId) {
        await User.findByIdAndUpdate(userId, { otpVerified: false });
        console.log(`Reset otpVerified for user: ${userId}`);
      }
    }
  } catch (err) {
    console.error("Error resetting otpVerified on session expiry:", err);
  }
});

// Express Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 1000 * 60 * 60,
    },
    proxy: true,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the backend");
});

app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/subscription", subscriptionRouter);
app.use("/api/service-page", servicePageRouter);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
