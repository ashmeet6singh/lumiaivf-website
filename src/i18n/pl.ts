import type { en } from './en'

// Polish translations — English used as fallback until fully translated
export const pl: typeof en = {
  nav: {
    logo: 'Lumia',
    langToggle: 'EN',
  },
  hero: {
    headline: 'Twój towarzysz IVF, nareszcie stworzony dla Ciebie.',
    subheadline: 'Śledź każdy zastrzyk. Rozumiej każdy wynik badania. Honoruj każdą emocję.',
    emailPlaceholder: 'Twój adres e-mail',
    ctaButton: 'Powiadom mnie',
    thankyou: 'Jesteś na liście! Damy znać, gdy Lumia będzie gotowa. 🌸',
    socialProof: 'Dołącz do setek kobiet czekających na lepszego towarzysza IVF.',
  },
  features: [
    {
      id: 'quicklog',
      tag: 'Szybkie logowanie',
      headline: 'Zapisz wszystko jednym dotknięciem.',
      body: 'Zastrzyki, badania, nastrój, wizyty — cały dzień zapisany w sekundach, bez menu. Kafelki szybkiego logowania Lumii umieszczają każdą kategorię jeden dotyk od ekranu głównego.',
      bullets: [
        'Jeden dotyk, by zapisać — bez menu, bez zagnieżdżonych formularzy',
        'Kategorie oznaczone kolorami — nigdy nie wybierzesz złej',
        'Edytuj lub usuń dowolny wpis w każdej chwili',
      ],
    },
    {
      id: 'timeline',
      tag: 'Oś czasu',
      headline: 'Cała Twoja podróż, na jednej osi czasu.',
      body: 'Zobacz dokładnie, gdzie jesteś w swoim cyklu — i co czeka Cię dalej. Następny zastrzyk, następna wizyta, następne badanie, wszystko w jednym widoku chronologicznym.',
      bullets: [
        'Karta „Następne" pokazuje Twój następny zastrzyk lub wizytę',
        'Filtruj według dziś, tego tygodnia, pełnego cyklu lub całej historii',
        'Plakietki faz pokazują, gdzie jesteś: Przygotowanie → Stymulacja → Trigger → Transfer',
      ],
    },
    {
      id: 'medications',
      tag: 'Leki',
      headline: 'Każda dawka, na czas.',
      body: 'Śledź zastrzyki, leki doustne i czopki dzięki przypomnieniom opartym na czasie. Twój pełny protokół, na pierwszy rzut oka — nic nie zostaje pominięte.',
      bullets: [
        'Przypomnienia czasowe dla zastrzyków, leków doustnych i czopków',
        'Śledź drogę podania, dawkę i stronę (lewa/prawa) dla każdego leku',
        'Oznacz jako wykonane z ekranu głównego jednym dotknięciem',
      ],
    },
    {
      id: 'scans',
      tag: 'Śledzenie badań',
      headline: 'Twoje badania, nareszcie zrozumiałe.',
      body: 'Zapisuj liczbę pęcherzyków, poziom E2 i grubość endometrium po każdej wizycie kontrolnej. Obserwuj odpowiedź swojego ciała w czasie rzeczywistym.',
      bullets: [
        'Zapisuj liczbę pęcherzyków na jajnik (L/P) i grubość endometrium',
        'Śledź poziom E2 po każdym badaniu krwi',
        'Obserwuj odpowiedź na stymulację dzień po dniu',
      ],
    },
    {
      id: 'mood',
      tag: 'Nastrój i objawy',
      headline: 'Twoje emocje też są ważne.',
      body: 'Zapisuj swoje samopoczucie każdego dnia obok danych klinicznych. Bo IVF to nie tylko fizyczność — a Twoje doświadczenie zasługuje na utrwalenie.',
      bullets: [
        'Codzienne sprawdzanie nastroju od Niski → Świetny',
        'Loguj objawy obok danych klinicznych',
        'Zobacz trendy emocjonalne tuż obok medycznych',
      ],
    },
    {
      id: 'partner',
      tag: 'Partner',
      headline: 'Zabierz partnera ze sobą.',
      body: 'IVF to podróż dla dwojga. Dodaj imię partnera podczas konfiguracji Lumii i pozwól mu zapisywać własne wsparcie — uczestnictwo w wizytach, podawane zastrzyki, trudne dni przetrwane razem.',
      bullets: [
        'Dodaj imię partnera podczas konfiguracji',
        'Jego sesje wsparcia pojawiają się w Twoich raportach',
        'Poczuj się mniej samotna, wiedząc, że on też śledzi',
      ],
    },
    {
      id: 'reports',
      tag: 'Raporty',
      headline: 'Raporty, które pokochają lekarze.',
      body: 'Jedno dotknięcie generuje raport PDF z pełnym podsumowaniem cyklu — każdy zastrzyk, każde badanie, każdy odczyt E2 — przejrzyście rozłożony dla Twojej kliniki. Wejdź na każdą wizytę przygotowana.',
      bullets: [
        'Wykres progresji E2 + wykres wzrostu pęcherzyków (jajniki L/P)',
        'Faza cyklu, protokół i kluczowe kamienie milowe w jednym PDF',
        'Wydrukuj lub udostępnij lekarzowi w kilka sekund',
      ],
    },
  ],
  cta: {
    headline: 'Bądź pierwsza, gdy Lumia będzie gotowa.',
    subheadline: 'Dołącz do setek kobiet czekających na lepszego towarzysza IVF.',
    emailPlaceholder: 'Twój adres e-mail',
    ctaButton: 'Powiadom mnie',
    thankyou: 'Jesteś na liście! Damy znać, gdy Lumia będzie gotowa. 🌸',
  },
  footer: {
    tagline: 'Ciepły towarzysz Twojej podróży IVF.',
    copyright: '© 2025 Lumia. Wszelkie prawa zastrzeżone.',
  },
}
