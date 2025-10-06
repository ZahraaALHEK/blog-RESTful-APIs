const nodemail = require("nodemailer");
const {Email,password_email} = require("./../config/Keys")
const sendEmail = async ({emailTo, subject , code , content}) =>{
   
    const transporter = nodemail.createTransport({
        host:"smtp-relay.brevo.com",
        secure:false,
        port:587,
        auth:{
            user : Email,
            pass:password_email
        }
    });
    const message = {
        from: `"light zone" <lightzone923@gmail.com>` ,
        to:emailTo,
        subject,
        html: `
      <h1>${subject}</h1>
      <p> use this below code to 
      ${content}</p>
       <p><b> Code:</b> ${code}</p>
    `
    };
    const info = await transporter.sendMail(message);
    console.log(info.messageId);
    return info;

}
module.exports = sendEmail;