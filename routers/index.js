const {Router} = require('express');

const router = Router();

router.use('/',movieRouter)

module.exports = router