import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    name: String,
    age: Number,
    designation: String
})

const AdminModel = mongoose.model("AdminModel", AdminSchema);