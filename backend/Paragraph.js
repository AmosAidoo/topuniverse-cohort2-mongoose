const mongoose = require("mongoose");

const ParagraphSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
    },
});

const Paragraph = mongoose.model("Paragraph", ParagraphSchema);

module.exports = Paragraph