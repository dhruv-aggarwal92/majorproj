const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth:{
        user:'daggarwal4_be21@thapar.edu',
        //now here gmail does not allow any workspace to use them so we need to generate a app password so 
        pass:'pwmlncwkjydowhrv'
    }
});

let renderTemplate = (data, relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../view/mailers', relativePath),
        data,
        function(err, template){
            if(err){console.log('error in rendring in template'); return}
            mailHTML = template;
        }   
    )
    return mailHTML;
}

module.exports={
    transporter: transporter,
    renderTemplate: renderTemplate
}