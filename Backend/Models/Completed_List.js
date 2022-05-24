const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types

const completed_list = new mongoose.Schema({
    mal_id: {
        type: Number,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    added_by: {
        type: ObjectId,
        ref: "User"
    }

})

mongoose.model("Completed_List", completed_list);