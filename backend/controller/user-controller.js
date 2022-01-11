function userController() {
    return {
        async login(req, res) {
            res.json({message: 'LoggedIn'});
        },

        async register(req, res) {
            res.json({message: 'registered'});
        }
    }
}

module.exports = userController;