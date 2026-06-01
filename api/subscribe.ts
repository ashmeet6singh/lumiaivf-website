import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'
import { waitlistConfirmationHtml } from './email/waitlistConfirmation.js'

const resend = new Resend(process.env.RESEND_API_KEY)
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID!

const SEGMENTS = {
  waitlistEn: 'a53e4305-4a5c-4932-9978-a0fa421c7a24',
  waitlistPl: 'bd221967-f6d9-4230-9e01-a209f2319972',
  beta:       'c030814f-9c2e-4ad7-96ec-a3ceb49ec084',
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const email = ((req.body?.email as string) ?? '').trim().toLowerCase()
  const lang = (req.body?.lang as string) === 'pl' ? 'pl' : 'en'
  const isBetaCandidate = Boolean(req.body?.is_beta_candidate)

  const utmSource = ((req.body?.utm_source as string) ?? '').trim().slice(0, 100)
  const utmMedium = ((req.body?.utm_medium as string) ?? '').trim().slice(0, 100)
  const utmCampaign = ((req.body?.utm_campaign as string) ?? '').trim().slice(0, 100)

  if (!email || !email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  // first_name: "[EN] BETA" or "[PL] BETA" for beta candidates so the Beta Signups
  // segment shows language at a glance. UTM source stored in last_name.
  const firstName = isBetaCandidate ? `[${lang.toUpperCase()}] BETA` : undefined
  const lastName = utmSource || undefined

  try {
    // Create contact (ignore duplicate errors)
    try {
      await resend.contacts.create({
        email,
        audienceId: AUDIENCE_ID,
        unsubscribed: false,
        ...(firstName !== undefined && { firstName }),
        ...(lastName !== undefined && { lastName }),
      })
    } catch {
      // Contact already exists — continue
    }

    // Add to language waitlist segment
    const waitlistSegment = lang === 'pl' ? SEGMENTS.waitlistPl : SEGMENTS.waitlistEn
    try {
      await resend.contacts.segments.add({ email, segmentId: waitlistSegment })
    } catch {
      // Non-fatal
    }

    // Add to Beta Signups segment if opted in
    if (isBetaCandidate) {
      try {
        await resend.contacts.segments.add({ email, segmentId: SEGMENTS.beta })
      } catch {
        // Non-fatal
      }
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
