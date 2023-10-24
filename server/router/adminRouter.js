
const express = require('express')

const router = express.Router();

console.log(router)

const {getAdmin,adminRegister, adminLogin} = require('../controller/adminController')

router.get('/example',getAdmin)

router.post('/adminRegister',adminRegister)

router.post('/adminLogin',adminLogin)

module.exports = router;