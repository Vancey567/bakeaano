const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workshopSchema = new Schema({
    title: { type: String, required: true },
    mode: { type: String, enums: ['online', 'offline'], default: 'online', required: true },
    address: { type: String, required: true, default: 'zoom' },
    learnings: [{ type: String, required: true }]
}, {timestamps: true})

const workshopModel = mongoose.model('Workshop', workshopSchema);
module.exports = userModel;