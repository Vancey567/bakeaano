const router = require('express').Router();

const workshopController = require('./controller/workshop-controller');
const userController = require('./controller/user-controller');

// Middlewares
const verifyTokenMiddleware = require('./middlewares/token-middleware');


router.post('/login', userController().login);
router.post('/register', userController().register);
router.get('/workshop', workshopController().showWorkshop);
router.post('/workshop', verifyTokenMiddleware, workshopController().createWorkshop);
router.post('/workshop/register', workshopController().register);
router.get('/attendees', workshopController().attendees);


module.exports = router;


