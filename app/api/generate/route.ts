import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    const isNovo = formData.grana === "novo";

    const prompt = `Generiši biznis starter paket za sljedeći biznis:

**Osnovne informacije:**
- Ime biznisa: ${formData.imeBiznisa}
- Industrija: ${formData.industrija}
- Lokacija: ${formData.gradDrzava}
- Opis: ${formData.kratakOpis || "Nije navedeno"}
- Tip: ${isNovo ? "Novi biznis" : "Postojeći biznis koji treba digitalizaciju"}

**Kupci i usluge:**
- Ciljni kupci: ${Array.isArray(formData.kupci) ? formData.kupci.join(", ") : "Nije navedeno"}
- Usluge/Proizvodi: ${formData.uslugeProizvodi}
- Radno vrijeme: ${formData.radnoVrijeme || "Nije navedeno"}

**Brend i stil:**
- Željeni stil: ${formData.stil}
- Color mood: ${formData.colorMood}
- Ton komunikacije: ${formData.tonKomunikacije}
- Jezik outputa: ${formData.jezikOutputa}

${
  isNovo
    ? `**Kontakt i planovi:**
- Telefon: ${formData.telefon5A || "Nije navedeno"}
- Email: ${formData.email || "Nije navedeno"}
- Platforme: ${Array.isArray(formData.platforme5A) ? formData.platforme5A.join(", ") : "Nije navedeno"}
- Ima logo/boje: ${formData.imaLogoBojeA === "da" ? "Da" : "Ne"}
- Vizija: ${formData.vizija || "Nije navedeno"}`
    : `**Kontakt i digitalizacija:**
- Telefon: ${formData.telefon5B || "Nije navedeno"}
- Web stranica: ${formData.webStranica || "Nije navedeno"}
- Instagram: ${formData.instagramProfil || "Nije navedeno"}
- Adresa: ${formData.adresa || "Nije navedeno"}
- Platforme koje koristi: ${Array.isArray(formData.platforme5B) ? formData.platforme5B.join(", ") : "Nije navedeno"}
- Ima logo: ${formData.imaLogoB === "da" ? "Da" : "Ne"}
- Ima web: ${formData.imaWebB === "da" ? "Da" : "Ne"}
- Glavni problem: ${formData.glavniProblem || "Nije navedeno"}`
}

Vrati ISKLJUČIVO sljedeći JSON objekat, bez ikakvog teksta prije ili poslije:

{
  "brandIdentity": {
    "slogan": "kratki upamtljivi slogan na bosanskom",
    "boje": {
      "primarna": "#XXXXXX",
      "sekundarna": "#XXXXXX",
      "akcentna": "#XXXXXX"
    },
    "fontovi": {
      "naslov": "naziv Google fonta za naslove",
      "tekst": "naziv Google fonta za tijelo teksta"
    },
    "brandVoice": "opis glasa i tona brenda u 2-3 rečenice",
    "misija": "misija biznisa u jednoj rečenici"
  },
  "instagramStarter": {
    "bio": "instagram bio maksimalno 150 znakova",
    "captioni": [
      "caption 1 sa emoji",
      "caption 2 sa emoji",
      "caption 3 sa emoji",
      "caption 4 sa emoji",
      "caption 5 sa emoji"
    ],
    "hashtagovi": [
      "#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5",
      "#hashtag6", "#hashtag7", "#hashtag8", "#hashtag9", "#hashtag10",
      "#hashtag11", "#hashtag12", "#hashtag13", "#hashtag14", "#hashtag15"
    ],
    "planObjava": {
      "ponedeljak": "tema objave",
      "utorak": "tema objave",
      "srijeda": "tema objave",
      "cetvrtak": "tema objave",
      "petak": "tema objave",
      "subota": "tema objave",
      "nedjelja": "tema objave"
    }
  },
  "googleBusiness": {
    "naziv": "puni naziv za Google Business profil",
    "opis": "opis biznisa maksimalno 750 znakova",
    "kategorija": "primarna Google Business kategorija",
    "kljucneRijeci": ["rijec1", "rijec2", "rijec3", "rijec4", "rijec5", "rijec6", "rijec7", "rijec8", "rijec9", "rijec10"],
    "usluge": ["usluga1", "usluga2", "usluga3", "usluga4", "usluga5"],
    "faq": [
      {"pitanje": "pitanje 1", "odgovor": "odgovor 1"},
      {"pitanje": "pitanje 2", "odgovor": "odgovor 2"},
      {"pitanje": "pitanje 3", "odgovor": "odgovor 3"},
      {"pitanje": "pitanje 4", "odgovor": "odgovor 4"},
      {"pitanje": "pitanje 5", "odgovor": "odgovor 5"}
    ]
  },
  "launchChecklist": [
    {"naziv": "naziv koraka 1", "opis": "detaljan opis koraka 1"},
    {"naziv": "naziv koraka 2", "opis": "detaljan opis koraka 2"},
    {"naziv": "naziv koraka 3", "opis": "detaljan opis koraka 3"},
    {"naziv": "naziv koraka 4", "opis": "detaljan opis koraka 4"},
    {"naziv": "naziv koraka 5", "opis": "detaljan opis koraka 5"},
    {"naziv": "naziv koraka 6", "opis": "detaljan opis koraka 6"},
    {"naziv": "naziv koraka 7", "opis": "detaljan opis koraka 7"},
    {"naziv": "naziv koraka 8", "opis": "detaljan opis koraka 8"},
    {"naziv": "naziv koraka 9", "opis": "detaljan opis koraka 9"},
    {"naziv": "naziv koraka 10", "opis": "detaljan opis koraka 10"}
  ],
  "messageTemplates": {
    "dobrodoslica": "poruka dobrodošlice za novog kupca",
    "odgovorNaUpit": "profesionalan odgovor na upit o uslugama",
    "ponuda": "poruka sa konkretnom ponudom",
    "potvrdaRezervacije": "potvrda rezervacije ili termina",
    "zahvalnica": "zahvalnica nakon kupovine ili posjete"
  }
}`;

    const response = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 8000,
      system:
        "Ti si ekspert za digitalni marketing i brendiranje malih biznisa na Balkanu. Generisi profesionalan, konkretan i koristan sadrzaj na bosanskom jeziku. Vrati SAMO validan JSON bez ikakvih dodatnih objasnjenja ili markdown formatiranja.",
      messages: [{ role: "user", content: prompt }],
    });

    const textBlock = response.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(
        { error: "Nema teksta u odgovoru od AI" },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(textBlock.text);
    return NextResponse.json(parsed);
  } catch (error) {
    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: `API greška: ${error.message}` },
        { status: error.status ?? 500 }
      );
    }
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Greška pri parsiranju AI odgovora" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Greška pri generisanju paketa" },
      { status: 500 }
    );
  }
}
