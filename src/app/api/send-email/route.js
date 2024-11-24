import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, subject, html } = await req.json();

    // Configure the Nodemailer transport
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Gmail SMTP server
      port: 587, // Secure SMTP port
      secure: false, // Use TLS (not SSL)
      auth: {
        user: "intellishieldinsurance@gmail.com", // Your email address
        pass: "hnwn kgco avya wepn", // Your email password or app-specific password
      },
    });

    // Email options
    const mailOptions = {
      from: "intellishieldinsurance@gmail.com", // Sender address
      to: email, // Recipient address
      subject: subject, // Subject line
      html: html,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to send email." }),
      { status: 500 }
    );
  }
}
