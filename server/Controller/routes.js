const router = require('express').Router()
const Data = require('../Model/dataModel')

router.get('/all', async (req, res) => {
    try {
        const data = await Data.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong' })
    }
})
router.get('/:id', async (req, res) => {
    try {
        const data = await Data.findById(req.params.id)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ msg: 'No data found' })
    }
})

router.post('/add', async (req, res) => {
    try {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!req.body.email.match(pattern)) {
            return res.status(500).json({ msg: 'Email not valid' })
        }
        const newData = new Data(req.body)
        await newData.save()
        res.status(200).json({ msg: 'Added' })
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong' })
    }
})

router.put('/edit/:id', async (req, res) => {
    try {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!req.body.email.match(pattern)) {
            return res.status(500).json({ msg: 'Email not valid' })
        }
        await Data.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json({ msg: 'Updated' })
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong' })
    }
})

module.exports = router