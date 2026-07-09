import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const designation = formData.get("designation") as string;
    const message = formData.get("message") as string;
    const captchaToken = formData.get("captchaToken") as string;

    const resume = formData.get("resume") as File;

    // Verify reCAPTCHA
    const verify = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
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

    // Convert uploaded file to Buffer
    const bytes = await resume.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Career Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Career Application - ${designation}`,

      html: `
      <div style="font-family:Arial,sans-serif">

      <h2>New Career Application</h2>

      <table cellpadding="10" cellspacing="0" border="1" style="border-collapse:collapse">

      <tr>
      <td><b>Name</b></td>
      <td>${name}</td>
      </tr>

      <tr>
      <td><b>Email</b></td>
      <td>${email}</td>
      </tr>

      <tr>
      <td><b>Designation</b></td>
      <td>${designation}</td>
      </tr>

      <tr>
      <td><b>Message</b></td>
      <td>${message.replace(/\n/g, "<br/>")}</td>
      </tr>

      </table>

      </div>
      `,

      attachments: [
        {
          filename: resume.name,
          content: buffer,
          contentType: resume.type,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully.",
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}