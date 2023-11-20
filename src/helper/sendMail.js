const { clerkClient } = require("@clerk/nextjs");
var nodemailer = require("nodemailer");

export default async function sendMail(mailOptions, batch, action) {
  const users = await clerkClient.users.getUserList();
  const batchUsers = users.filter((user) => user.publicMetadata.batch == batch);
  const settingsUsers = batchUsers.filter(
    (user) => user.publicMetadata.settings?.[action]
  );
  const emailOfUsers = settingsUsers.flatMap((user) =>
    user.emailAddresses.map((o) => o.emailAddress)
  );
  const stringifiedEmailOfUsers = emailOfUsers.join(", ");

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  transporter.sendMail(
    {
      from: process.env.NODEMAILER_EMAIL,
      bcc: stringifiedEmailOfUsers,
      ...mailOptions,
    },
    function (error, info) {
      if (error) {
        throw new Error(error);
      } else {
        console.log("Email Sent");
        return true;
      }
    }
  );
}
