const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema({
    paragraph_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paragraph',
        required: true
    },
    value: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
}, { timestamps: true });

const Response = mongoose.model("Response", ResponseSchema);

module.exports = Response;