const nodemailer = require("nodemailer")
const Build = require("../models/BuildModel")
const { formEmail } = require("../until/formEmail")


async function addBuild(req, res, next) {
    try {
        const { ...rest } = req.body
        let isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(rest.emailUserPay)
        const idUser = "64041308e85d676276ca3a51"

        let testAccount = await nodemailer.createTestAccount();

        console.log(testAccount);
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: testAccount.user,
            to: 'thien29032020@gmail.com',
            subject: 'Test Nodemailer',
            text: 'You recieved message from ' + rest.emailUserPay,
            html: `<p>Cám ơn bạn đã mua hàng </p>
                <p>Xin chào <strong>${rest.nameClient} </strong>, bên mình đã nhận được đơn đặt hàng của bạn.</p>
            `
        }


        if (rest.phoneClient.length == 10 && isEmail) {

            // await Build.create({
            //     idUser,
            //     ...rest
            // })

            console.log("thien")
            transporter.sendMail(mainOptions, function (err, info) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("send email to success")
                    console.log('Message sent: ' + info.response);
                }
            });

            return res.status(200).json({
                message: `Products add to cart and send email to ${rest.emailUserPay} success.`,
            })
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// get build user 
async function getBuildUser(req, res, next) {
    try {
        const idUser = req.body.id
        const getBuildU = await Build.find({ idUser })

        return res.status(200).json({
            message: "Get bulid user login success.",
            data: {
                "data": getBuildU
            }
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// destroy build user
async function destroyBuild(req, res, next) {
    try {
        const { id } = req.body
        const idUser = "64041308e85d676276ca3a51"
        await Build.updateOne({ _id: id, idUser }, { deleteOder: true }, { runValidators: true })

        const getAllBuildDes = await Build.find({ deleteOder: true }).sort({ createdAt: 1 })
        console.log(getAllBuildDes)
        return res.status(200).json({
            message: "Get bulid user login success.",
            data: {
                "data": getAllBuildDes
            }
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

module.exports = {
    addBuild,
    getBuildUser,
    destroyBuild
}