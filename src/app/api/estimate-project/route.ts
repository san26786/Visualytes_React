import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });


   await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER,

  subject: "New Project Estimate Request",

  html: `
    <h2>New Estimate Project Request</h2>

    <p><b>First Name:</b> ${data.firstName}</p>
    <p><b>Last Name:</b> ${data.lastName}</p>

    <p><b>Company Name:</b> ${data.companyName}</p>
    <p><b>Company Personnel:</b> ${data.companyPersonnel}</p>

    <p><b>Email:</b> ${data.email}</p>
    <p><b>Phone:</b> ${data.phone}</p>

    <p><b>Application Type:</b> ${data.mobileType}</p>

    <p><b>Budget:</b> ${data.budget}</p>

    <p><b>Project Details:</b></p>
    <p>${data.projectDetails}</p>

    <p><b>Timeline:</b> ${data.timeline}</p>

    <p>
      <b>Marketing Communication:</b>
      ${data.marketing ? "Accepted" : "Not Accepted"}
    </p>
  `,
});


    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });


  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success:false,
        message:"Email sending failed"
      },
      {
        status:500
      }
    );
  }
}