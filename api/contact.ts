import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const name = ((req.body?.name as string) ?? '').trim()
  const email = ((req.body?.email as string) ?? '').trim()
  const subject = ((req.body?.subject as string) ?? 'general').trim()
  const message = ((req.body?.message as string) ?? '').trim()

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' })
  }

  try {
    await resend.emails.send({
      from: 'Lumia Contact <noreply@lumiaivf.com>',
      to: 'hello@lumiaivf.com',
      replyTo: email,
      subject: `[Contact] ${subject} — from ${name}`,
      html: `
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p style="white-space:pre-wrap">${message}</p>
      `,
    })

    return res.status(200).json({ ok: true })
  } catch (err: unknown) {
    console.error('Contact error:', err)
    return res.status(500).json({ error: 'Failed to send message. Please try again.' })
  }
}
