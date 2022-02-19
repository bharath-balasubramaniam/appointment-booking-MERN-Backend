const randomString = require("random-string");
const randomStr = randomString({ length: 12 });
const Reset = () => {
  return ` <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Reset</title>
    </head>
    <body>
      <div style="margin : 0 auto; max-width: 400px; border:1px solid lightgray; border-radius:5px; padding:1rem; text-align:center;">
        <h1 style="font-size:1rem; color:grey; text-align: left; font-family: cursive; line-height: 1.7rem;"> <lead style="font-size: 2rem;">Dear user,</lead> <br/> <br/>if you have requested for a new password. Please verify this email to reset the password or simply ignore this email.</h1>
        <div style="padding:0rem; margin:0rem auto; width:300px; height: 300px;">
          <img src="https://cdn-icons-png.flaticon.com/512/4497/4497758.png" style="width:100%; height:100%;"  alt="recover-password">
        </div>
        <a href=${process.env.RESET_DEPLOY_URL}/${randomStr} "target="_blank"  style="font-size: 1rem; padding:0.5rem; border:2px solid black;background-color: transparent;color: grey; border-radius:5px; text-decoration:none;font-family:cursive ; cursor:pointer;"">Reset Now</a>
      </div>
    </body>
  </html>`;
};
module.exports = { Reset, randomStr };