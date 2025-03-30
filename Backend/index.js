// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const session = require("express-session");
// const cookieParser = require("cookie-parser");
// const mongoose=require("mongoose")
// const MongoStore = require("connect-mongo");
// dotenv.config();
// const app = express();

// // Middleware
// app.use(cookieParser());
// app.use(cors({
//   origin:"https://healthy-food-1-6jd9.onrender.com",
//   credentials: true,
// }));
// app.use(express.json());


// // Database Connection
// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('MongoDB Connected'))
//   .catch((err) => console.error('MongoDB Connection Error:', err));

//   app.use(
//     session({
//       secret: process.env.SESSION_SECRET,
//       resave: false,
//       saveUninitialized: false,
//       store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
//       cookie: {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         maxAge: 1000 * 60 * 60 * 24, // 1 day
//       },
//     })
//   );
// // Port
// const PORT = process.env.PORT || 3000;


// app.get("/",(req,res)=>{
//     res.send("server is running..")
// })

// const userRouter=require("./routes/userLogin")
// const productRoute=require("./routes/ProductRoutes")
// const EmailRoute=require("./routes/SendForget")
// const reviewRoutes = require('./routes/Review');
// const Cart=require("./routes/Cart");
// const filter=require("./routes/Filter")
// const orderRoute=require("./routes/OrderRoute")
// app.use('/api/reviews', reviewRoutes);
// app.use("/api/cart",Cart)
// app.use("/api",userRouter)
// app.use("/api",productRoute)
// app.use("/api",EmailRoute)
// app.use("/api/filter",filter)

// app.use("/api/orders",orderRoute)
// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

dotenv.config();
const app = express();

// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: "https://healthy-food-1-6jd9.onrender.com", // Update with your frontend URL
    credentials: true, // Allows cookies to be sent
  })
);
app.use(express.json());

// Trust Proxy (Required for cookies to work behind a proxy like Render)
app.set("trust proxy", 1);

// Database Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Ensure you have this variable in .env
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL, // MongoDB for session storage
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "None", // Required for cross-origin cookies
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Port
const PORT = process.env.PORT || 3000;

// Test Route to Debug Sessions
app.get("/", (req, res) => {
  if (!req.session.views) {
    req.session.views = 1;
  } else {
    req.session.views++;
  }
  res.send(`Session views: ${req.session.views}`);
});

// Import and Use Routes
const userRouter = require("./routes/userLogin");
const productRoute = require("./routes/ProductRoutes");
const emailRoute = require("./routes/SendForget");
const reviewRoutes = require("./routes/Review");
const cartRoutes = require("./routes/Cart");
const filterRoutes = require("./routes/Filter");
const orderRoutes = require("./routes/OrderRoute");

app.use("/api/reviews", reviewRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api", userRouter);
app.use("/api", productRoute);
app.use("/api", emailRoute);
app.use("/api/filter", filterRoutes);
app.use("/api/orders", orderRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

