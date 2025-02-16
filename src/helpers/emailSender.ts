import nodemailer from 'nodemailer'

const emailSender=async(email:string,html:string)=>{
    const transporter = nodemailer.createTransport({
      host: "mail.teamrabbil.com",
      port: 25,
      secure: false,
      auth: {
        user: "info@teamrabbil.com",
        pass: "~sR4[bhaC[Qs",
      },
      tls:{rejectUnauthorized:false}
      });
      
      const info = await transporter.sendMail({
        from: 'Health Care "<info@teamrabbil.com>', // sender address
        to:email, 
        subject: "Reset Password Link", 
        //text: "Hello world?", 
        html:html,
      });  
    return info    
}

export default emailSender