interface EmailStrings {
  title: string
  headline: string
  body1: string
  body2: string
  cardLabel: string
  cardBody: string
  footer1: string
  footer2: string
  footer3: (email: string) => string
}

const strings: Record<'en' | 'pl', EmailStrings> = {
  en: {
    title: "You're on the Lumia waitlist",
    headline: "You're on the list 🌱",
    body1: "Thank you for signing up — we're building Lumia with so much care, and knowing you're interested means a lot.",
    body2: "We'll reach out the moment Lumia is ready. Until then, we're making something worth the wait.",
    cardLabel: 'What Lumia does',
    cardBody: 'A warm IVF companion that tracks medications, scans, and emotions — built for the whole journey, not just the data.',
    footer1: 'Sent with care by the Lumia team',
    footer2: "You're receiving this because you signed up at lumiaivf.com",
    footer3: (email) => `This email was sent to ${email}`,
  },
  pl: {
    title: 'Jesteś na liście oczekujących Lumia',
    headline: 'Jesteś na liście 🌱',
    body1: 'Dziękujemy za rejestrację — budujemy Lumię z ogromną starannością i wiemy, że Twoje zainteresowanie wiele dla nas znaczy.',
    body2: 'Odezwiemy się w chwili, gdy Lumia będzie gotowa. Do tego czasu tworzymy coś wartego czekania.',
    cardLabel: 'Czym jest Lumia',
    cardBody: 'Ciepły towarzysz IVF, który śledzi leki, badania i emocje — stworzony dla całej podróży, nie tylko dla danych.',
    footer1: 'Wysłane z troską przez zespół Lumia',
    footer2: 'Otrzymujesz tę wiadomość, ponieważ zarejestrowałaś się na lumiaivf.com',
    footer3: (email) => `Ta wiadomość została wysłana na adres ${email}`,
  },
}

export function waitlistConfirmationHtml(email: string, lang: 'en' | 'pl' = 'en'): string {
  const s = strings[lang]
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${s.title}</title>
</head>
<body style="margin:0;padding:0;background-color:#FAF6F1;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF6F1;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(123,94,167,0.08);">

          <!-- Header bar -->
          <tr>
            <td style="background:linear-gradient(135deg,#7B5EA7 0%,#994529 100%);padding:32px 40px;text-align:center;">
              <div style="margin:0 auto 10px;width:48px;height:48px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 64 64" fill="none">
                  <defs>
                    <radialGradient id="eOrb" cx="42%" cy="34%" r="80%">
                      <stop offset="0%" stop-color="#FFD9A8"/>
                      <stop offset="40%" stop-color="#E78FA6"/>
                      <stop offset="74%" stop-color="#B1577C"/>
                      <stop offset="100%" stop-color="#943E63"/>
                    </radialGradient>
                  </defs>
                  <g transform="translate(0 2)">
                    <path d="M10 32.5 C 19 49 43 49 52 32.5" stroke="#943E63" stroke-width="5" stroke-linecap="round" opacity="0.92"/>
                    <circle cx="31" cy="31" r="11.5" fill="url(#eOrb)"/>
                  </g>
                </svg>
              </div>
              <p style="margin:0;font-family:Georgia,serif;font-size:20px;font-weight:600;color:#ffffff;letter-spacing:-0.3px;">Lumia</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <h1 style="margin:0 0 16px;font-family:Georgia,serif;font-size:28px;font-weight:700;color:#1C1C19;line-height:1.2;">
                ${s.headline}
              </h1>
              <p style="margin:0 0 24px;font-size:16px;color:#4A4A45;line-height:1.6;">
                ${s.body1}
              </p>
              <p style="margin:0 0 32px;font-size:16px;color:#4A4A45;line-height:1.6;">
                ${s.body2}
              </p>

              <!-- Highlight card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF6F1;border-radius:12px;margin-bottom:32px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#7B5EA7;letter-spacing:0.08em;text-transform:uppercase;">${s.cardLabel}</p>
                    <p style="margin:0;font-size:14px;color:#4A4A45;line-height:1.6;">${s.cardBody}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <hr style="border:none;border-top:1px solid #F0EBE3;margin:0;" />
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px 32px;text-align:center;">
              <p style="margin:0 0 4px;font-size:13px;color:#9A9A90;">${s.footer1}</p>
              <p style="margin:0 0 12px;font-size:12px;color:#B0B0A8;">${s.footer2}</p>
              <p style="margin:0;font-size:12px;color:#C0C0B8;">${s.footer3(email)}</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
