const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userData = require("../model/user.model");
const metaData = require("../model/meta.model");


exports.userRegistration = async (req, res, next) => {
    try {

        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if (password == confirmPassword) {

            const userDetails = new userData({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
            });

            console.log("password::", password);
            console.log("confirmPassword::", confirmPassword);


            const saveUserData = await userDetails.save();

            res.status(201).json(
                {
                    message: "User Registered",
                    status: 201,
                    data: saveUserData
                }
            )

        } else {
            res.status(400).json({
                message: "User Not Registered",
                status: 400
            })
        }

    } catch (error) {
        console.log("error:::::::::", error);
        res.status(400).json(
            {
                message: "Something went wrong",
                status: 400
            }
        )
    }
}

exports.userSignUp = async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        console.log("email::", email);
        console.log("password::", password);

        const data = await userData.findOne({ email: email });
        console.log("data:", data);

        const isMatch = await bcrypt.compare(password, data.password)

        if (!data) {
            res.status(404).json(
                {
                    message: "Data Not Exists.",
                    status: 404
                }
            )
        } else {
            if (isMatch) {

                res.status(200).json(
                    {
                        message: "Login Succesfully",
                        status: 200,
                        data: data.id
                    }
                )
            } else {
                res.status(401).json(
                    {
                        message: "Invaid Password Details",
                        status: 401
                    }
                )
            }
        }
    } catch (error) {
        console.log("error:::::::::", error);
        res.status(400).json(
            {
                message: "Something went wrong",
                status: 400
            }
        )
    }
}


exports.userListById = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await userData.find({ _id: id });


        res.status(201).json({
            message: "View User Data By Id",
            status: 201,
            info: {
                username: data[0].username
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500,
        });
    }
};

/*  ============================== question ====================================== */

exports.userQuestion = async (req, res) => {
    try {
        const userDetails = new metaData({
            name: req.body.name,
            email: req.body.email,
            interestedin: req.body.interestedin,
            number: req.body.number,
            message: req.body.message
        });

        console.log("user::", userDetails);

        const savemetaData = await userDetails.save();

        res.status(201).json(
            {
                message: "Your Question Succesfully Send.",
                status: 201,
                data: savemetaData
            }
        )

    } catch (error) {
        console.log("error:", error);
        res.status(400).json(
            {
                message: "Something went wrong",
                status: 400
            }
        )
    }
}



/*  ============================== change password  ==============================  */

exports.emailverify = async (req, res) => {
    try {
        const email = req.body.email;
        const otp = req.body.otp;
        const otp2 = 9999;

        const data = await userData.findOne({ email: email });
        console.log("otp conf::::", data);

        if (!data) {
            res.status(500).json({
                message: "Email Id Not Exist",
                status: 500
            })
        } else {
            if (otp == otp2) {

                res.status(200).json({
                    message: "otp comfirm",
                    status: 200,
                    data: data.id

                })
            } else {
                res.status(400).json({
                    message: "OTP is invalid",
                    status: 400,
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Email Id Not Exist",
            status: 500
        })
    }
}

exports.changePassword = async (req, res) => {
    try {
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        console.log("password::::", password);
        console.log("confirmPassword::::", confirmPassword);



        if (password == confirmPassword) {
            let id = req.params.id;
            console.log("id:::", id);

            const data = await userData.findByIdAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    $set: {
                        password: bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
                    }
                }
            )
                .then(() => {
                    res.status(200).json({
                        message: "Update User Password Successfully",
                        status: 200
                    })
                })
                .catch((err) => {
                    console.log("error:", err);
                    res.status(500).json({
                        message: "Something Wrong",
                        status: 500
                    })
                })

        } else {
            res.status(400).json({
                message: "Password And ConfirmPassword Is Not Match",
                status: 400
            })
        }
    } catch (error) {
        console.log("error:::::", error);
        res.status(500).json({
            message: "Something Went wrong",
            status: 500
        })
    }
}