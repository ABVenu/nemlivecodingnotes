"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post('/signup', auth_controller_1.signup);
router.post('/login', auth_controller_1.login);
router.get('/protected', auth_middleware_1.authenticate, (req, res) => {
    res.json({ message: 'Protected route access granted!' });
});
exports.default = router;
