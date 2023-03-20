const express = require('express');
const router = express.Router();

const {authCheckUserMiddleware} = require("../middleware/authCheckUser.middleware")
const {
    addBuild,
    getBuildUser,
    destroyBuild
} = require("../controllers/BuildController")

router.post("/" ,addBuild)
router.get("/get-build-user",authCheckUserMiddleware, getBuildUser)
router.put("/destroy-build", destroyBuild)

module.exports = router