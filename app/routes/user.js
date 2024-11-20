const {Router} = require('express');
const {UserController} = require("@controllers/user");
const {AuthMiddleware} = require("@middlewares/auth");
const {RoleMiddleware} = require("@middlewares/role");
const {ROLE} = require("@utils/consts");
const router = Router();

router.get('/', AuthMiddleware, RoleMiddleware([ROLE.ADMIN]), UserController.get);
router.get('/getMe', AuthMiddleware, UserController.getMe);
router.get('/:id', AuthMiddleware, RoleMiddleware([ROLE.ADMIN]), UserController.getOne);
router.post('/', AuthMiddleware, RoleMiddleware([ROLE.ADMIN]), UserController.create);
router.put('/:id', AuthMiddleware, RoleMiddleware([ROLE.ADMIN]), UserController.update);
router.delete('/:id', AuthMiddleware, RoleMiddleware([ROLE.ADMIN]), UserController.delete);

module.exports = router;