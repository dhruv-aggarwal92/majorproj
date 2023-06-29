const nodeMailer = require('../config/nodemailer')
//this is another way of exporting a methord
exports.newPass = (new_pass_link) => {
    let htmlString = nodeMailer.renderTemplate({new_pass_link: new_pass_link},'/new_pass_link/new_password_link.ejs')
    // console.log("inside newcomment mailer",comment)
    nodeMailer.transporter.sendMail({
        from:'aggarwalkrishna289@gmail.com',       //don't know what it is 
        to: new_pass_link.user.email,
        subject: "Click the link below to set new password",
        html:htmlString
    });(err, info)=>{
        if(err){
            console.log("error is sending mail",err);
            return;
        }
        console.log("message sent", info);
        return;
    }
}