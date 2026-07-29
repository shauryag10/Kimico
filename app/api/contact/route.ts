import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const enquiry = parsed.data;

  // TODO(client): wire up your email provider here. Recommended: Resend.
  //
  //   1. `npm install resend`
  //   2. Create an API key at https://resend.com and set it in `.env.local`:
  //        RESEND_API_KEY=re_xxxxxxxx
  //      (never commit the key — `.env*` is already gitignored)
  //   3. Replace the console.log below with:
  //        import { Resend } from "resend";                    // top of file
  //        const resend = new Resend(process.env.RESEND_API_KEY);
  //        await resend.emails.send({
  //          from: "website@yourdomain.com",
  //          to: "sales@yourdomain.com",
  //          replyTo: enquiry.email,
  //          subject: `[${enquiry.enquiryType}] Enquiry from ${enquiry.name}` +
  //                   (enquiry.sku ? ` · ${enquiry.sku}` : ""),
  //          text: JSON.stringify(enquiry, null, 2),
  //        });
  //
  // Until then, enquiries are logged to the server console so nothing is lost
  // silently during development.
  console.log("[contact] new enquiry:", JSON.stringify(enquiry, null, 2));

  return NextResponse.json({ ok: true });
}
