export function verifyEmailTemplate({ url, text }) {
  return `
    <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%; ">
      <h2 style="text-align: center; text-transform: capitalize;color: teal;">Welcome to the UI/ UX booking room</h2>
      <p>Congratulations! You're almost set to start using UI/ UX booking room.
          Just click the button below to validate your email address.
      </p>
      
      <center><a href=${url} style="background: blue; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${text}</a></center>

      <p>If the button doesn't work for any reason, you can also click on the link below:</p>

      <span style="width:650px; word-wrap:break-word; display:inline-block;">${url}</span>
    </div>
  `
}
export function resetPasswordTemplate({ url, text }) {
  return `
    <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%; ">
      <h2 style="text-align: center; text-transform: capitalize;color: teal;">UI/ UX booking room</h2>
     <p>There was a request to change your password!

      If you did not make this request then please ignore this email.

      Otherwise, please click this link to change your password:</p>
      
      <center><a href=${url} style="background: blue; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${text}</a></center>

      <p>If the button doesn't work for any reason, you can also click on the link below:</p>

      <span style="width:650px; word-wrap:break-word; display:inline-block;">${url}</span>
    </div>
  `
}
