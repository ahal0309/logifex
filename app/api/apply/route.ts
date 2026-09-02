import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const jobTitle = formData.get("jobTitle") as string;
    const jobLocation = formData.get("jobLocation") as string;
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const coverLetter = formData.get("coverLetter") as string;
    const joinTime = formData.get("joinTime") as string;
    const resume = formData.get("resume") as File;

    if (!resume) {
      return NextResponse.json({ error: "Resume is required" }, { status: 400 });
    }

    const buffer = Buffer.from(await resume.arrayBuffer());

    const subject = jobLocation 
      ? `New Application for ${jobTitle} - ${jobLocation}` 
      : `General Application - ${name}`;

    const { data, error } = await resend.emails.send({
      // Resend requires a verified domain to send FROM. In testing/free tier, use onboarding@resend.dev
      from: "Logifex Careers <onboarding@resend.dev>",
      to: "info@logifexgroup.com",
      subject: subject,
      html: `
        <h2>New Job Application</h2>
        <p><strong>Job:</strong> ${jobTitle} ${jobLocation ? `(${jobLocation})` : ""}</p>
        <hr />
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Availability to Join:</strong> ${joinTime}</p>
        <br/>
        <h3>Cover Letter</h3>
        <p style="white-space: pre-wrap; background: #f4f4f4; padding: 15px; border-radius: 5px;">${coverLetter}</p>
      `,
      attachments: [
        {
          filename: resume.name,
          content: buffer,
        },
      ],
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Error processing application:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
