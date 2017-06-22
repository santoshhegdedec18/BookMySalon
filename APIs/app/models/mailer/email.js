
var nodemailer = require('nodemailer');

function createEmailBody(emailOptions, req)
{
	var url = req.headers['referer'];
	console.log(url);
	 var mailBody = "<label> Dear User,</label><br/>" +
                    "<p>You are receiving this email because you have requested the reset of the password of your parlour account.Please click on the following link to complete the process</p>" +
                    "<button style='background: #4863A0; min-height: 40px; min-width: 200px; color: white; margin: 0 5%;border-radius: 5px;font-size: 14px'><a href= '" + url + "js/modules/login/views/resetPassword.html?email="+emailOptions.to+"'>Reset Password</a></button>" +
                    "<p>If you did not request this, please ignore this email and your password will remain unchanged.<br/><br/>Thanks,<br/>Parlours Team</p>";
                    return mailBody;
}


module.exports = {
	sendEmail : function(emailOptions, req){
		
		var transporter = nodemailer.createTransport({
		 	host: 'smtp.gmail.com',
		    port: 465,
		    secure: true, // use SSL
		    debug: true,
		  auth: {
		     user: 'ask@starlly.in',
        	 pass: '4StarLLy#1'
		  }
		});

		var mailOptions = {
		  from: 'santoshhegdedec18@gmail.com',
		  to: emailOptions.to,
		  subject: emailOptions.subject,
		  text: emailOptions.body,
		  html: createEmailBody(emailOptions, req)
		};

		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
		    console.log(error);
		  } else {
		    console.log('Email sent: ' + info.response);
		  }
		});

	}
}



