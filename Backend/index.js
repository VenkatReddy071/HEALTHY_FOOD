const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const mongoose=require("mongoose")
const MongoStore = require("connect-mongo");
dotenv.config();
const app = express();

// Middleware
app.use(cookieParser());
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());


// Database Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    })
  );
// Port
const PORT = process.env.PORT || 3000;


app.get("/",(req,res)=>{
    res.send("server is running..")
})

const userRouter=require("./routes/userLogin")
const productRoute=require("./routes/ProductRoutes")
const EmailRoute=require("./routes/SendForget")
const reviewRoutes = require('./routes/Review');
const Cart=require("./routes/Cart");
const filter=require("./routes/Filter")
const orderRoute=require("./routes/OrderRoute")
app.use('/api/reviews', reviewRoutes);
app.use("/api/cart",Cart)
app.use("/api",userRouter)
app.use("/api",productRoute)
app.use("/api",EmailRoute)
app.use("/api/filter",filter)

app.use("/api/orders",orderRoute)
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
