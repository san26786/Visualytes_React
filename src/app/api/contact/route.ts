// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// export async function POST(req: Request) {
//   try {
//     const { name, email, phone, topic, message } = await req.json();

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });

//     await transporter.sendMail({
//       from: `"Visualyte Contact Form" <${process.env.EMAIL_USER}>`,
//       to: process.env.EMAIL_USER,
//       replyTo: email,
//       subject: `New Contact Form - ${topic}`,
//       html: `
//         <div style="font-family:Arial,sans-serif">
//           <h2>New Contact Form Submission</h2>

//           <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;">
//             <tr>
//               <td><strong>Name</strong></td>
//               <td>${name}</td>
//             </tr>

//             <tr>
//               <td><strong>Email</strong></td>
//               <td>${email}</td>
//             </tr>

//             <tr>
//               <td><strong>Phone</strong></td>
//               <td>${phone}</td>
//             </tr>

//             <tr>
//               <td><strong>Topic</strong></td>
//               <td>${topic}</td>
//             </tr>

//             <tr>
//               <td><strong>Message</strong></td>
//               <td>${message.replace(/\n/g, "<br/>")}</td>
//             </tr>
//           </table>
//         </div>
//       `,
//     });

//     return NextResponse.json({
//       success: true,
//       message: "Message sent successfully",
//     });
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to send message",
//       },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      phone,
      topic,
      message,
      captchaToken,
    } = await req.json();

    // Verify Google reCAPTCHA
    const verify = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY!,
          response: captchaToken,
        }),
      }
    );

    const captchaResult = await verify.json();

    if (!captchaResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Robot verification failed.",
        },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Visualyte Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact Form - ${topic}`,
      html: `
        <div style="font-family:Arial,sans-serif">
          <h2>New Contact Form Submission</h2>

          <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;">
            <tr>
              <td><strong>Name</strong></td>
              <td>${name}</td>
            </tr>

            <tr>
              <td><strong>Email</strong></td>
              <td>${email}</td>
            </tr>

            <tr>
              <td><strong>Phone</strong></td>
              <td>${phone}</td>
            </tr>

            <tr>
              <td><strong>Topic</strong></td>
              <td>${topic}</td>
            </tr>

            <tr>
              <td><strong>Message</strong></td>
              <td>${message.replace(/\n/g, "<br/>")}</td>
            </tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message",
      },
      { status: 500 }
    );
  }
}