const express=require("express");
const notes = require("./data/notes");
const dotenv=require("dotenv");
const connectDB = require("./config/db");
const app=express();
const userRoutes=require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const notesRoutes =require("./routes/noteRoutes")


dotenv.config();
connectDB();
app.use(express.json());

// app.get("/",(req,res)=>{
//     res.send("api is running");
// })

// app.get("/api/notes",(req,res)=>{
//     res.json(notes);
// })



app.use('/api/users',userRoutes)
app.use('/api/notes',notesRoutes)


app.use(notFound);
app.use(errorHandler);
const PORT=process.env.PORT || 5000;


app.listen(PORT,console.log(`server started on port ${PORT}`));