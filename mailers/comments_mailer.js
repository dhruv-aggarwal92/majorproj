const nodeMailer = require('../config/nodemailer')
//this is another way of exporting a methord
exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment: comment},'/comments/new_comment.ejs')
    // console.log("inside newcomment mailer",comment)
    nodeMailer.transporter.sendMail({
        from:'aggarwalkrishna289@gmail.com',       //don't know what it is 
        to: comment.user.email,
        subject: "New Comment Published",
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