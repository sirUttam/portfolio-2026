import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import contactRoute from "./routes/contact.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:4173",
    "http://localhost:4174",
    "http://localhost:4175",
    "http://localhost:4176",
    "http://localhost:4177",
    "http://localhost:4178",
    "http://localhost:4179",
    "https://portfolio-2026-bccb.onrender.com",
  ],
  methods: ["GET", "POST"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/contact", contactRoute);

app.get("/", (req, res) => {
  res.send("Server running");
});

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});