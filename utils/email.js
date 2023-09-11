const helper = require('sendgrid').email;
const asynce = require('async');
const config = require('../config/config');
const sg = require('sendgrid')(config.sendgrid.api_key);
const Logger = require('./logger.js');

const Logger1 = new Logger();

module.exports = {

	sendemail(
		parentCallback,
		formEmail,
		toEmails,
		subject,
		textContent,
		htmlContent,
	){
		const errorEmails = [];
		const successfulEmails = [];
		async.parallel([
			function one(callback){
				// add to emails
				for(let i = 0; i < toEmails.length; i ++){
					// add from email
					const senderEmail = new helper.Email(formEmail);
					// Add to email
					const toEmail = new helper.Email(toEmails[i]);
					// HTML content
					const content = new helper.Content('text/html', htmlContent);
					const mail = new helper.Mail(senderEmail, subject, toEmail, content);
					const request = sg.emptyRequest({
						method: 'POST',
						path: 'v3/mail/send',
						body: mail.toJSON(),
					});
					sg.API(request, (error, response) =>{
						if(error) {
							logger.log(`error ,Error during processing request at : ${new Date()} details message: ${error.message}`, 'error');
						}
						console.log(response.statusCode);
						console.log(response.body);
						console.log(response.headers);
					});
				}
				// return
				callback(null, true);
			},
		],(err,results) =>{
			if(err) {
				loggger.log(`error, Error during processing request at: ${new Date()} , details messages: ${err.message}`, 'errer')
			}else{
				loggger.log(`an email ha been sent : ${new Date()} with results: ${resluts}, 'info`);
			}
			console.log("Done");
		});
		parentCallback(null,
			{
				successfulEmails,
				errorEmails
			});
	}
}