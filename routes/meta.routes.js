const router = require("express").Router();

const{
    userRegistration,
    userSignUp,
    userListById,
    userQuestion,
    emailverify,
    changePassword,
} = require("../controller/meta.controller");


/*  ============================== user ====================================== */

router.post("/userRegistration", userRegistration);
router.post("/userSignUp", userSignUp);
router.get("/userListById/:id", userListById);


/*  ============================== question ====================================== */

router.post("/userQuestion", userQuestion);


/*  ============================== change password ====================================== */

router.post("/emailverify", emailverify);
router.put("/changePassword/:id", changePassword);

module.exports = router;   