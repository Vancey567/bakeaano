const Workshop = require('../model/workshop-model');
const Attendees = require('../model/attendees-model');

function workshop() {
    return {
        async register(req, res) {
            // Check who is loggedIn from cookie, then click on the workshop and link the user, store in attendees
            const userId = localStorage.getItem("userId");
            const workshopId = localStorage.getItem("workshopId");
            res.json({ message: 'registered for workshop' });
        },

        async showWorkshop(req, res) {
            const allWorkshops = await Workshop.find();
            if(allWorkshops !== null) {
                // res.send(allWorkshops);
                res.json({ workshops: allWorkshops });
            } else {
                res.json({ message: "No workshop available" });
            }
        },

        async createWorkshop(req, res) {
            const { title, description, mode, address, date, duration,  learnings } = req.body;

            if(!title || !description || !date || !duration || !learnings) {
                res.json({ message: 'All fields are mandatory' });
                return;
            }

            let workshopObj = new Workshop({
                title: title,
                description: description,
                mode: mode,
                address: address,
                date: date,
                duration: duration,
                learnings: learnings,
            });
            
            workshopObj.save()
            .then(() => {
                res.send({message: "Workshop Created"});
            }).catch((err) => {
                console.log(err);
                res.send({message: "Problem creating the workshop!!"});
            })
        },

        async attendees(req, res) {
            const allAttendees = await Attendees.find();
            if(allAttendees !== null) {
                res.json({ attendees: allAttendees });
            } else {
                res.json({ message: "No attendese available"});
            }
        },
    }
}

module.exports = workshop;