import type { Article } from '../types'

export const ileKosztujeInVitro: Article = {
  slug: 'ile-kosztuje-in-vitro',
  title: 'Ile kosztuje in vitro w Polsce w 2026? Pełne rozbicie kosztów',
  metaDescription:
    'Ile kosztuje in vitro w Polsce? Przejrzyste rozbicie cen prywatnej procedury, tego co wchodzi w cenę, a co dochodzi osobno (leki, ICSI, mrożenie), oraz jak dzięki programowi refundacji zapłacić 0 zł.',
  keywordTarget: ['ile kosztuje in vitro', 'in vitro cena'],
  hero: {
    eyebrow: 'In vitro i pieniądze',
    subtitle:
      'Cena in vitro to rzadko jedna liczba. Oto z czego naprawdę składa się koszt — i jak rządowy program refundacji może go obniżyć do zera.',
  },
  readingTime: 8,
  datePublished: '2026-06-06',
  sections: [
    {
      type: 'p',
      text: 'Jedno z pierwszych pytań po decyzji o leczeniu niepłodności brzmi: ile to właściwie kosztuje? Odpowiedź jest złożona, bo cena in vitro zależy od kliniki, od Twojej indywidualnej sytuacji klinicznej, od tego, co wchodzi w „pakiet", a co dochodzi osobno — oraz od tego, czy kwalifikujesz się do refundacji.',
    },
    {
      type: 'p',
      text: 'Ten artykuł nie poda jednej magicznej kwoty, bo uczciwie nikt nie może. Pomoże za to zrozumieć, z jakich elementów składa się koszt, o co zapytać klinikę i jak zaplanować budżet na proces, który często wymaga więcej niż jednego podejścia.',
    },
    {
      type: 'callout',
      variant: 'info',
      text: 'Najważniejsza informacja na początek: jeśli kwalifikujesz się do rządowego programu „Program wsparcia in vitro", cała procedura jest dla Ciebie bezpłatna. Zanim zdecydujesz się na leczenie w pełni prywatne, sprawdź, czy możesz skorzystać z refundacji.',
    },
    {
      type: 'h2',
      text: 'Cena in vitro prywatnie — ile to kosztuje?',
      id: 'cena-prywatnie',
    },
    {
      type: 'p',
      text: 'W przypadku leczenia w pełni prywatnego pojedynczy cykl in vitro z własnymi komórkami kosztuje w Polsce zwykle od około 9 000 do 17 000 zł za samą procedurę (wizyty, monitoring stymulacji, punkcja, procedury embriologiczne, transfer zarodka). Po doliczeniu leków koszt jednego cyklu najczęściej mieści się w przedziale 16 000–25 000 zł.',
    },
    {
      type: 'p',
      text: 'Te liczby to punkt odniesienia, a nie sztywny cennik — każda klinika wycenia poszczególne elementy inaczej, a Twoja sytuacja kliniczna wpływa na liczbę potrzebnych badań, dobór metody i ilość leków. Dlatego zawsze proś o szczegółowy, rozpisany kosztorys, a nie tylko o „cenę od".',
    },
    {
      type: 'h2',
      text: 'Co zwykle WCHODZI w cenę cyklu',
      id: 'w-cenie',
    },
    {
      type: 'p',
      text: 'Reklamowana „cena podstawowa" pojedynczego cyklu zwykle obejmuje kluczowe etapy kliniczne:',
    },
    {
      type: 'list',
      items: [
        'Wizyty i monitoring stymulacji (USG, kontrola odpowiedzi jajników)',
        'Punkcję jajników, czyli pobranie komórek jajowych',
        'Procedury embriologiczne — zapłodnienie i hodowlę zarodków',
        'Jeden transfer świeżego zarodka',
      ],
    },
    {
      type: 'h2',
      text: 'Co zwykle NIE wchodzi w cenę',
      id: 'poza-ceną',
    },
    {
      type: 'p',
      text: 'Cena podstawowa często nie obejmuje kilku elementów, które dla wielu par okazują się konieczne:',
    },
    {
      type: 'h3',
      text: 'Leki do stymulacji',
    },
    {
      type: 'p',
      text: 'Leki hormonalne stosowane podczas stymulacji są zwykle wyceniane osobno i potrafią znacząco podnieść koszt — najczęściej o około 3 100–5 300 zł, choć kwota zależy od protokołu i Twojej indywidualnej odpowiedzi na leczenie.',
    },
    {
      type: 'h3',
      text: 'ICSI',
    },
    {
      type: 'p',
      text: 'Jeśli klinika zaleci ICSI (docytoplazmatyczne wstrzyknięcie plemnika — wprowadzenie pojedynczego plemnika bezpośrednio do komórki jajowej), zwykle jest to dodatkowo płatne. Metodę tę stosuje się m.in. przy obniżonych parametrach nasienia.',
    },
    {
      type: 'h3',
      text: 'Mrożenie i przechowywanie zarodków',
    },
    {
      type: 'p',
      text: 'Jeśli powstanie więcej zarodków, niż transferujesz, możesz zamrozić pozostałe do kolejnych prób. Osobno płatne są zwykle: sama procedura mrożenia, roczne przechowywanie oraz późniejszy transfer rozmrożonego zarodka (FET) — choć FET jest zazwyczaj tańszy niż pełny świeży cykl.',
    },
    {
      type: 'h3',
      text: 'Badania genetyczne (PGT)',
    },
    {
      type: 'p',
      text: 'Diagnostyka preimplantacyjna (PGT) podnosi koszt, ale pozwala wybrać zarodki przed transferem. Bywa zalecana m.in. po nawracających poronieniach lub w starszym wieku. To kolejny element, który warto wyjaśnić z kliniką przed rozpoczęciem.',
    },
    {
      type: 'h2',
      text: 'Refundacja: kiedy in vitro kosztuje 0 zł',
      id: 'refundacja',
    },
    {
      type: 'p',
      text: [
        'Od czerwca 2024 r. działa rządowy „Program wsparcia in vitro", który finansuje całą procedurę z budżetu państwa — od kwalifikacji i obowiązkowych badań po wszystkie niezbędne etapy zapłodnienia pozaustrojowego. Dla pacjenta oznacza to koszt zerowy. Program potrwa do końca 2028 r. Szczegóły i aktualne zasady opisuje ',
        { text: 'Ministerstwo Zdrowia na portalu gov.pl', href: 'https://www.gov.pl/web/zdrowie/in-vitro' },
        ' oraz ',
        { text: 'serwis pacjent.gov.pl', href: 'https://pacjent.gov.pl/artykul/program-wsparcia-vitro' },
        '.',
      ],
    },
    {
      type: 'p',
      text: [
        'Zanim porównasz oferty prywatne, sprawdź, czy się kwalifikujesz — to często różnica między kilkunastoma tysiącami złotych a brakiem opłat. Zasady, limity wieku i liczbę cykli omawiamy szczegółowo w osobnym przewodniku o ',
        { text: 'refundacji in vitro', href: '/pl/artykuly/in-vitro-refundacja' },
        '. Jeśli dopiero zaczynasz, zacznij od artykułu wyjaśniającego, ',
        { text: 'na czym polega in vitro', href: '/pl/artykuly/in-vitro-co-to' },
        '.',
      ],
    },
    {
      type: 'h2',
      text: 'Prawdziwy koszt: kilka cykli',
      id: 'kilka-cykli',
    },
    {
      type: 'p',
      text: 'In vitro nie zawsze kończy się sukcesem za pierwszym razem. Dla wielu par potrzebna jest więcej niż jedna próba — i to jeden z najtrudniejszych elementów planowania, zarówno finansowego, jak i emocjonalnego. Program refundacyjny obejmuje określoną liczbę cykli, dlatego warto z góry wiedzieć, ile prób przewiduje i czego dotyczy.',
    },
    {
      type: 'h2',
      text: 'O co zapytać klinikę',
      id: 'pytania',
    },
    {
      type: 'list',
      items: [
        '„Co dokładnie obejmuje cena podstawowa cyklu?"',
        '„Jaki jest przewidywany koszt leków dla pacjentki o moim profilu?"',
        '„Czy zalecają Państwo ICSI i czy jest ono wliczone, czy płatne osobno?"',
        '„Jakie są koszty mrożenia, przechowywania i transferu rozmrożonego zarodka?"',
        '„Czy kwalifikuję się do programu refundacji i jak wygląda kwalifikacja?"',
        '„Czy są inne koszty, które powinnam uwzględnić, a których nie ma w pierwszej wycenie?"',
      ],
    },
    {
      type: 'h2',
      text: 'Jak nad tym wszystkim zapanować',
      id: 'lumia',
    },
    {
      type: 'p',
      text: 'Leczenie in vitro to mnóstwo ruchomych elementów — wizyty, leki, wyniki badań i decyzje, które zapadają szybko. Aplikacja taka jak Lumia pomaga zebrać to w jednym miejscu: śledzić cykl, leki i wyniki monitoringu, dzięki czemu na każdą wizytę przychodzisz przygotowana, a nic nie umyka. Dołącz do listy oczekujących, by dowiedzieć się, gdy Lumia będzie gotowa.',
    },
  ],
  faq: [
    {
      question: 'Ile kosztuje jeden cykl in vitro w Polsce prywatnie?',
      answer:
        'Prywatnie pojedynczy cykl in vitro z własnymi komórkami kosztuje zwykle od około 9 000 do 17 000 zł za samą procedurę. Po doliczeniu leków do stymulacji (najczęściej około 3 100–5 300 zł) całkowity koszt jednego cyklu zazwyczaj mieści się w przedziale 16 000–25 000 zł. Ostateczna kwota zależy od kliniki i Twojej sytuacji klinicznej.',
    },
    {
      question: 'Czy in vitro można zrobić za darmo?',
      answer:
        'Tak — jeśli kwalifikujesz się do rządowego „Programu wsparcia in vitro", cała procedura jest finansowana z budżetu państwa i dla pacjenta bezpłatna. Program działa od czerwca 2024 r. i potrwa do końca 2028 r. Warunki kwalifikacji opisujemy w osobnym artykule o refundacji in vitro.',
    },
    {
      question: 'Dlaczego ceny in vitro tak bardzo się różnią?',
      answer:
        'Bo na koszt składa się wiele elementów wycenianych osobno: leki, ICSI, mrożenie i przechowywanie zarodków, badania genetyczne (PGT), dodatkowe konsultacje. Twoja indywidualna sytuacja kliniczna wpływa na liczbę badań i ilość leków, dlatego dwie pacjentki w tej samej klinice mogą otrzymać różne kosztorysy.',
    },
    {
      question: 'Czy leki są wliczone w cenę in vitro?',
      answer:
        'Najczęściej nie. Leki do stymulacji są zwykle wyceniane osobno i mogą dodać około 3 100–5 300 zł do kosztu cyklu. Niektóre kliniki włączają leki do pakietu — zawsze warto dopytać, co dokładnie obejmuje podana cena.',
    },
  ],
  disclaimer:
    'Lumia to cyfrowy towarzysz śledzenia leczenia, a nie urządzenie medyczne. Informacje o kosztach mają charakter ogólny i edukacyjny — ceny zmieniają się i różnią w zależności od kliniki oraz indywidualnej sytuacji. Przed rozpoczęciem leczenia poproś klinikę o szczegółowy, rozpisany kosztorys i skonsultuj decyzje z lekarzem prowadzącym.',
}
