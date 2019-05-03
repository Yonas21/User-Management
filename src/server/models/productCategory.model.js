const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    }
},
{
    collection: 'category'
});

module.exports = mongoose.model("Category", categorySchema);
