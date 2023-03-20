const nodemailer = require("nodemailer")
const { formEmail } = require("../until/formEmail")

async function sendEmail(email, callback) {
    let testAccount = await nodemailer.createTestAccount();

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
        console.log('aksdfkdl')


        
        console.log("thien")
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log("send email to success")
                console.log('Message sent: ' + info.response);
            }
        });

}