/// <reference path="./types/index.d.ts" />
import "dotenv/config";
import initDatabase from "./config/seed";
import cors from "cors";
import router from "routes/api";
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

// config cors
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// config view engine
// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views')

// config session
// app.use(session({
//   cookie: {
//     maxAge: 7 * 24 * 60 * 60 * 1000 // ms
//   },
//   secret: 'a santa at nasa',
//   resave: true,
//   saveUninitialized: true,
//   store: new PrismaSessionStore(
//     new PrismaClient(),
//     {
//       checkPeriod: 2 * 60 * 1000,  //ms
//       dbRecordIdIsSessionId: true,
//       dbRecordIdFunction: undefined,
//     }
//   )
// }))

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config static file
app.use(express.static("public"));
// // config passport
// app.use(passport.initialize());
// app.use(passport.authenticate('session'))

// configPassportLocal()

// config global
// app.use((req, res, next) => {
//   res.locals.user = req.user || null; // Pass user object to all views
//   next();
// });

// config routes
// webRouters(app)

// Seeding database
initDatabase();

app.use("/api", router);

// app.use((req, res) => {
//   res.render("status/404.ejs")
// })

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).render("status/500.ejs", { error: err });
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log("port: ", process.env.PORT);
});
