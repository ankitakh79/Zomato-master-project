//  importing Env Variables
require("dotenv").config();

//  Libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

//  configs
import googleAuthConfig from "./config/google.config";
import routeConfig from "./config/route.config";

// microservice routes
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";
import Image from "./API/Image";
import Order from "./API/orders";
import Reviews from "./API/reviews";
import User from "./API/User";
import Menu from "./API/menu";
import MailService from "./API/Mail";
import Payments from "./API/Payments";



//  Database connection
import ConnectDB from "./database/connection";

const zomato = express();

//  application middlewares
zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());


//  passport
googleAuthConfig(passport);
routeConfig(passport);

// Aplication Routes
zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food", Food);
zomato.use("/image", Image);
zomato.use("/order", Order);
zomato.use("/reviews", Reviews);
zomato.use("/user", User);
zomato.use("/menu", Menu);
zomato.use("/mail", MailService);
zomato.use("/payments", Payments);

zomato.get("/", (req, res) => res.json({ message: "setup sucess" }));

zomato.listen(5000, () =>
    ConnectDB().then(() =>  console.log("Server is running🚀"))
    .catch(() => 
        console.log("server is running, but databse connection failed"))
);