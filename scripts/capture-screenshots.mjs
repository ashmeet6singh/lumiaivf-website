import { chromium } from '/Users/ashmeetsingh/.nvm/versions/node/v24.16.0/lib/node_modules/playwright/index.mjs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'screenshots');

const BASE_URL = 'https://bloom-ivf.netlify.app';

const TODAY = '2026-05-28';

// Phone mockup inner screen: 240×510px → aspect ratio 2.125
// At 390px wide: 390 * 510/240 = 828.75 → 829px tall — tab bar fully visible, nothing cut
const VIEWPORT_W = 390;
const VIEWPORT_H = 829;

const makeSeed = (language) => ({
  state: {
    profile: {
      id: 'user-demo',
      name: 'Anna',
      partnerName: 'Marek',
      clinic: 'Klinika Bocian',
      doctor: 'Dr. Kowalski',
      clinicAddress: 'ul. Inflancka 6, Warsaw',
      clinicPhone: '+48 22 123 45 67',
      cycleNumber: 1,
      language,
      lmpDate: '2026-05-20',
      typicalCycleLength: 28,
      journeyType: 'started',
      isFirstCycle: true,
    },
    cycle: {
      id: 'cycle-1',
      protocol: 'Short Protocol',
      startDate: '2026-05-20',
      currentDay: 8,
      phase: 'Stimulation phase',
      cycleLength: 28,
    },
    hasCompletedOnboarding: true,
    medications: [
      {
        id: 'seed-med-1',
        name: 'Gonal-F',
        dose: '225 IU',
        type: 'injection',
        route: 'Injection (subcut.)',
        scheduledTime: '07:00',
        status: 'done',
        loggedAt: `${TODAY}T07:00:00.000Z`,
        notes: 'Left side of abdomen.',
        date: TODAY,
      },
      {
        id: 'seed-med-2',
        name: 'Cetrotide',
        dose: '0.25mg',
        type: 'injection',
        route: 'Injection (subcut.)',
        scheduledTime: '09:00',
        status: 'due',
        loggedAt: null,
        notes: 'Scheduled subcutaneous injection.',
        date: TODAY,
      },
      {
        id: 'seed-med-3',
        name: 'Progesterone',
        dose: '200mg',
        type: 'oral',
        route: 'Vaginal',
        scheduledTime: '21:00',
        status: 'upcoming',
        loggedAt: null,
        notes: 'Progesterone capsule for tonight.',
        date: TODAY,
      },
    ],
    bloodTests: [
      {
        id: 'seed-bt-1',
        testType: 'Estradiol (E2)',
        value: '1200',
        notes: 'Normal progression',
        date: '2026-05-26',
        loggedAt: '2026-05-26T10:30:00.000Z',
      },
      {
        id: 'seed-bt-2',
        testType: 'LH',
        value: '2.1',
        notes: '',
        date: '2026-05-24',
        loggedAt: '2026-05-24T09:00:00.000Z',
      },
    ],
    scans: [
      {
        id: 'seed-scan-1',
        scanType: 'follicle',
        leftFollicles: [14, 12, 10, 9],
        rightFollicles: [15, 13, 11],
        lining: 7.5,
        e2: 950,
        trilaminar: false,
        notes: 'Good follicle development.',
        date: '2026-05-24',
        loggedAt: '2026-05-24T14:00:00.000Z',
      },
      {
        id: 'seed-scan-2',
        scanType: 'follicle',
        leftFollicles: [17, 15, 13, 11],
        rightFollicles: [18, 16, 14],
        lining: 9.2,
        e2: 1640,
        trilaminar: true,
        notes: 'Lining looks trilaminar. Good response.',
        date: '2026-05-27',
        loggedAt: '2026-05-27T15:00:00.000Z',
      },
    ],
    appointments: [
      {
        id: 'seed-appt-1',
        title: 'Monitoring scan',
        type: 'Monitoring Scan',
        clinic: 'Klinika Bocian',
        scheduledTime: '15:00',
        date: TODAY,
        status: 'upcoming',
        notes: 'Check follicle growth and lining thickness.',
        loggedAt: `${TODAY}T15:00:00.000Z`,
      },
      {
        id: 'seed-appt-2',
        title: 'Blood test',
        type: 'Blood Test',
        clinic: 'Klinika Bocian',
        scheduledTime: '08:30',
        date: '2026-05-30',
        status: 'upcoming',
        notes: 'E2 + LH check before trigger.',
        loggedAt: '2026-05-30T08:30:00.000Z',
      },
    ],
    embryoUpdates: [],
    moodLogs: [
      {
        id: 'seed-mood-1',
        value: 7,
        notes: 'Feeling optimistic, slight bloating',
        date: '2026-05-27',
        loggedAt: '2026-05-27T20:00:00.000Z',
      },
      {
        id: 'seed-mood-2',
        value: 6,
        notes: 'Tired but hopeful',
        date: '2026-05-26',
        loggedAt: '2026-05-26T21:00:00.000Z',
      },
    ],
    journals: [],
    periodLogs: [],
  },
  version: 1,
});

const SCREENS = [
  { route: '/dashboard',          label: 'quick-log'   },
  { route: '/timeline',           label: 'timeline'    },
  { route: '/dashboard?log=meds', label: 'medications' },
  { route: '/scan',               label: 'scan'        },
  { route: '/dashboard?log=mood', label: 'mood'        },
  { route: '/profile',            label: 'partner'     },
  { route: '/reports',            label: 'reports'     },
];

async function captureSet(language) {
  const suffix = language === 'pl' ? '-pl' : '';
  const seed = makeSeed(language);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: VIEWPORT_W, height: VIEWPORT_H },
    deviceScaleFactor: 3,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  });

  // Seed localStorage before React boots
  await context.addInitScript((s) => {
    localStorage.setItem('bloom-app-storage', JSON.stringify(s));
  }, seed);

  const page = await context.newPage();

  // Dismiss cookie/privacy banner once on first load
  await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const acceptBtn = page.locator('button:has-text("Accept All"), button:has-text("Accept")').first();
  if (await acceptBtn.isVisible()) {
    await acceptBtn.click();
    await page.waitForTimeout(500);
  }

  // For PL: navigate to profile and click the Polski button to switch language
  if (language === 'pl') {
    await page.goto(`${BASE_URL}/profile`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    const polskiBtn = page.locator('button:has-text("Polski")').first();
    if (await polskiBtn.isVisible()) {
      await polskiBtn.click();
      await page.waitForTimeout(600);
      console.log('  → switched to Polski');
    }
  }

  for (let i = 0; i < SCREENS.length; i++) {
    const { route, label } = SCREENS[i];
    const url = `${BASE_URL}${route}`;
    console.log(`[${language}] Capturing screen-${i}${suffix} (${label}): ${url}`);

    // Use pushState to navigate without a full page reload — keeps React context alive (language state)
    await page.evaluate((r) => window.history.pushState({}, '', r), route);
    // Dispatch a popstate so React Router picks up the change
    await page.evaluate(() => window.dispatchEvent(new PopStateEvent('popstate', { state: {} })));
    await page.waitForTimeout(1400);

    const outPath = path.join(OUT_DIR, `screen-${i}${suffix}.png`);
    await page.screenshot({
      path: outPath,
      clip: { x: 0, y: 0, width: VIEWPORT_W, height: VIEWPORT_H },
    });
    console.log(`  → saved ${outPath}`);
  }

  await browser.close();
}

async function main() {
  console.log('=== Capturing EN screenshots ===');
  await captureSet('en');

  console.log('\n=== Capturing PL screenshots ===');
  await captureSet('pl');

  console.log('\nDone! 14 screenshots captured (7 EN + 7 PL).');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
