import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  email: z.string().email().max(120),
  message: z.string().min(1).max(5000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL!, // e.g. "Contacto <onboarding@resend.dev>" or your verified domain sender
      to: [process.env.CONTACT_TO_EMAIL!], // where you want to receive messages
      replyTo: data.email,
      subject: `Nuevo mensaje: ${data.firstName} ${data.lastName}`,
      text:
        `Nombre: ${data.firstName} ${data.lastName}\n` +
        `Email: ${data.email}\n\n` +
        `Mensaje:\n${data.message}\n`,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Unknown error" },
      { status: 400 },
    );
  }
}
