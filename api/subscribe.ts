import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'
import { waitlistConfirmationHtml } from './email/waitlistConfirmation.js'

const resend = new Resend(process.env.RESEND_API_KEY)
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID!
const BETA_SEGMENT_ID = 'c030814f-9c2e-4ad7-96ec-a3ceb49ec084'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const email = ((req.body?.email as string) ?? '').trim().toLowerCase()
  const lang = (req.body?.lang as string) === 'pl' ? 'pl' : 'en'
  const isBetaCandidate = Boolean(req.body?.is_beta_candidate)

  // UTM params — stored as contact properties for list segmentation
  const utmSource = ((req.body?.utm_source as string) ?? '').trim().slice(0, 100)
  const utmMedium = ((req.body?.utm_medium as string) ?? '').trim().slice(0, 100)
  const utmCampaign = ((req.body?.utm_campaign as string) ?? '').trim().slice(0, 100)

  if (!email || !email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  // Encode segmentation data into native Resend fields (custom properties require
  // pre-defined schemas in Resend dashboard and are silently dropped otherwise).
  // first_name: "BETA" marks beta candidates — visible as a column in the contact list
  // and usable as a filter when targeting a broadcast ("First name is BETA").
  // last_name: stores UTM source so you can see acquisition channel per contact.
  const firstName = isBetaCandidate ? 'BETA' : undefined
  const lastName = utmSource || undefined

  try {
    // Add contact — ignore duplicate errors so the confirmation email always sends
    try {
      await resend.contacts.create({
        email,
        audienceId: AUDIENCE_ID,
        unsubscribed: false,
        ...(firstName !== undefined && { firstName }),
        ...(lastName !== undefined && { lastName }),
        ...(isBetaCandidate && { segments: [{ id: BETA_SEGMENT_ID }] }),
      })
    } catch {
      // Contact already exists — continue to send the email anyway
    }

    const subject = lang === 'pl'
      ? 'Jesteś na liście oczekujących Lumia 🌸'
      : "You're on the Lumia waitlist 🌸"

    await resend.emails.send({
      from: 'Lumia <noreply@lumiaivf.com>',
      to: email,
      subject,
      html: waitlistConfirmationHtml(email, lang),
    })

    return res.status(200).json({ ok: true })
  } catch (err: unknown) {
    console.error('Subscribe error:', err)
    return res.status(500).json({ error: 'Failed to subscribe. Please try again.' })
  }
}
