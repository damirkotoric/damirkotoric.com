import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { name, email, project, budget } = await request.json();

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Contact Form <contact@damirkotoric.com>",
      to: "mail@damirkotoric.com",
      replyTo: email,
      subject: `New inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Project: ${project || "Not provided"}`,
        `Budget: ${budget || "Not selected"}`,
      ].join("\n\n"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
