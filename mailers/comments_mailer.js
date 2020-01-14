const nodeMailer=require('../config/nodemailer');

//this is another way pf exporting a method
exports.newComment=(comment) =>{
    
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')

    nodeMailer.transporter.sendMail({
        from:'jachintya0@gmail.com',
        to:comment.user.email,
        subject:"New comment published!",
        html:htmlString
    }, (err,info)=>{
        if(err){
            console.log('errror in sending mail');
            return;
        }
        console.log('message sent',info);
        return;

    })
}