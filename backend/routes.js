const router = require('express').Router();

const workshopController = require('./controller/workshop-controller');
const userController = require('./controller/user-controller');
const homeController = require('./controller/home-controller');

// Middlewares
const verifyTokenMiddleware = require('./middlewares/token-middleware');
const admin = require('./middlewares/admin-middleware');

router.get('/', homeController().home);
router.get('/login', userController().getloginPage);
router.post('/login', userController().login);
router.get('/register', userController().getregisterPage);
router.post('/register', userController().register);
router.get('/workshop', verifyTokenMiddleware, workshopController().showWorkshop);
router.post('/workshop', verifyTokenMiddleware, workshopController().createWorkshop);
router.post('/workshop/register', verifyTokenMiddleware, workshopController().register);
router.get('/attendees', verifyTokenMiddleware, workshopController().attendees);
// router.post('/workshop', verifyTokenMiddleware, admin, workshopController().createWorkshop);
// router.post('/workshop/register', verifyTokenMiddleware, admin, workshopController().register);
// router.get('/attendees', verifyTokenMiddleware, admin, workshopController().attendees);

module.exports = router;


