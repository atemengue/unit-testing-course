

export function smtpSend(email: string, message: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Simulate SMTP sending logic
    setTimeout(() => {
      if (email && message) {
        resolve(`Email sent to ${email} successfully.`);
      } else {
        reject('Failed to send email. Missing email or message.');
      }
    }, 1000); // Simulate async delay
  });
}


export async function sendEmail(userEmail: string){
  await smtpSend(userEmail, "Hello");
}