const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types

const watch_list = new mongoose.Schema({
    mal_id: {
        type: Number,
        required: true
    },
    added_by: {
        type: ObjectId,
        ref: "User"
    }
})

mongoose.model("Watch_List", watch_list);