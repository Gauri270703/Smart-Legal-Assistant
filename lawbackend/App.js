const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')


const userRoute = require("./Route/Userroute");
const caseRoute = require("./Route/Caseroute");
const lawyerRoutes = require("./Route/lawyerRoutes");
const legalCaseRoutes = require("./Route/legalCaseRoute"); // legal case routes
const appointmentRoutes = require("./Route/appointmentRoutes");
const app = express()
app.use("/uploads", express.static("uploads"));
app.use(cors())
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/lawyerdb")
.then(() => {
    console.log("MongoDB Connected")
})
.catch((err) => {
    console.log(err)
})

app.use("/api", userRoute);
app.use("/api", caseRoute);
app.use("/api",lawyerRoutes);
app.use("/api/legalcases", legalCaseRoutes);
app.use("/api", appointmentRoutes);


app.listen(5000, () => {
    console.log("Server Running on Port 5000")
})