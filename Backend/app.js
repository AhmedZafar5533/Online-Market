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

// Database Connection
mongoose
    .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database Connected"))
    .catch((err) => console.error("Database Connection Error:", err));

require("./config/local-auth")(passport);

// Middleware
app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

// Session Store
const store = MongoStore.create({
    mongoUrl: process.env.DB_URL,
    ttl: 24 * 60 * 60, // 24 hours
    autoRemove: "interval",
    autoRemoveInterval: 10, // 10 minutes
});

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

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure only in production
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        },
    })
);

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

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
