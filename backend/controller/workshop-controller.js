function workshop() {
    return {
        async register(req, res) {
            res.json({message: 'registered for workshop'});
        },

        async showWorkshop(req, res) {
            res.send("Hello");
        },

        async createWorkshop(req, res) {
            res.send("createWorkshop");
        },

        async attendees(req, res) {
            res.send("attendese");
        },


    }
}

module.exports = workshop;