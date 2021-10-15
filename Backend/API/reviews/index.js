// Libraries
import express from "express";
import passport from "passport";

// Databse Modal
import { ReviewModel } from "../../database/allModels";

const Router = express.Router();

/*
Route   /
Desc    Get all reviews
Params  resid
BODY    none
Access  Public
Method  GET
*/
Router.get("/:resid", async (req, res) => {
  try {
    const reviews = await ReviewModel.find({ restaurant: req.params.resid });

    return res.json({ reviews });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route   /new
Desc    Add new food review/rating
Params  none
BODY    review object
Access  Public
Method  POST
*/
Router.post("/new", passport.authenticate("jwt"), async (req, res) => {
  try {
    const { _id } = req.session.passport.user._doc;
    const { reviewData } = req.body;

    await ReviewModel.create({ ...reviewData, user: _id });

    return res.json({ review: "Sucessfully Created Review." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route   /delete
Desc    Add new food review/rating
Params  _id
BODY    none
Access  Public
Method  DELETE
*/
Router.delete("/delete/:id", async (req, res) => {
  try {
    const { _id } = req.params;

    await ReviewModel.findByIdAndDelete(_id);

    return res.json({ review: "Sucessfully Deleted the Review." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;