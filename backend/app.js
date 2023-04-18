const express = require("express")
const mongoose = require("mongoose")
const app = express()
var cors = require('cors')
const port = 3001
const Paragraph = require("./Paragraph")
const Response = require("./Response")

app.use(express.json())
app.use(cors())

mongoose.connect(
    "mongodb://localhost:27017/crowdsource",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
mongoose.connection.on('connected', () => console.log('Connected'))

// Get a random paragraph
app.get('/paragraph', async (req, res) => {
    try {
        const count = await Paragraph.countDocuments().exec()

        const randomParagraph = await Paragraph.findOne().skip(Math.floor(Math.random() * count)).exec()

        res.json({ message: "success", data: randomParagraph })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "An error occured" })
    }
})


// Get all
app.get("/response", async (req, res) => {
    const { paragraph_id } = req.query
    const responses = await Response.find({ paragraph_id: paragraph_id }).exec()

    res.json({ message: "success", data: responses })
})

// Create new response
app.post("/response", async (req, res) => {
    try {
        const { paragraph_id } = req.query
        const { value } = req.body

        if (!paragraph_id || !value) {
            res.status(400).json({ message: "success" })
        }

        await Response.create({
            value: value,
            paragraph_id: paragraph_id
        })

        res.json({ message: "success" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "An error occured" })
    }
})

// Update
app.patch("/response/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { value } = req.body

        await Response.findByIdAndUpdate(id, {
            value: value
        })

        await Response.bulkSave()

        res.json({ message: "success" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "An error occured" })
    }

})

// Delete
app.delete("/response/:id", async (req, res) => {
    try {
        const { id } = req.params

        await Response.findByIdAndDelete(id)

        await Response.bulkSave()

        res.json({ message: "success" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "An error occured" })
    }

})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})