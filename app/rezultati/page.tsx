"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// --- Types ---

interface StartifyResult {
  brandIdentity: {
    slogan: string;
    boje: { primarna: string; sekundarna: string; akcentna: string };
    fontovi: { naslov: string; tekst: string };
    brandVoice: string;
    misija: string;
  };
  instagramStarter: {
    bio: string;
    captioni: string[];
    hashtagovi: string[];
    planObjava: Record<string, string>;
  };
  googleBusiness: {
    naziv: string;
    opis: string;
    kategorija: string;
    kljucneRijeci: string[];
    usluge: string[];
    faq: { pitanje: string; odgovor: string }[];
  };
  launchChecklist: { naziv: string; opis: string }[];
  messageTemplates: {
    dobrodoslica: string;
    odgovorNaUpit: string;
    ponuda: string;
    potvrdaRezervacije: string;
    zahvalnica: string;
  };
}

type TabKey = "brand" | "instagram" | "google" | "checklist" | "messages";

const TAB_CONFIG: { key: TabKey; label: string }[] = [
  { key: "brand",     label: "Brand Identity"   },
  { key: "instagram", label: "Instagram Starter" },
  { key: "google",    label: "Google Business"   },
  { key: "checklist", label: "Launch Checklist"  },
  { key: "messages",  label: "Message Templates" },
];

// --- Shared UI ---

function CopyButton({ text, label = "Kopiraj" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handle = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handle}
      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all flex-shrink-0 ${
        copied
          ? "bg-green-100 text-green-700"
          : "bg-[#4D0ACA]/10 text-[#4D0ACA] hover:bg-[#4D0ACA]/20"
      }`}
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Kopirano!
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
          </svg>
          {label}
        </>
      )}
    </button>
  );
}

function Card({
  title,
  action,
  children,
}: {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
          {action}
        </div>
      )}
      {!title && action && <div className="flex justify-end mb-3">{action}</div>}
      {children}
    </div>
  );
}

// --- Brand Identity Tab ---

function BrandTab({ data }: { data: StartifyResult["brandIdentity"] }) {
  return (
    <div className="space-y-5">
      <div className="bg-gradient-to-br from-[#4D0ACA] to-[#7c3aed] rounded-2xl p-8 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-3">Slogan</p>
        <p className="text-2xl md:text-3xl font-black leading-tight">"{data.slogan}"</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <Card title="Boje brenda">
          <div className="space-y-3">
            {(
              [
                { label: "Primarna", hex: data.boje.primarna },
                { label: "Sekundarna", hex: data.boje.sekundarna },
                { label: "Akcentna", hex: data.boje.akcentna },
              ] as const
            ).map(({ label, hex }) => (
              <div key={label} className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex-shrink-0 border border-black/10 shadow-sm"
                  style={{ backgroundColor: hex }}
                />
                <div>
                  <p className="text-xs text-gray-400 font-medium">{label}</p>
                  <p className="text-sm font-bold text-gray-900 font-mono">{hex}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Fontovi">
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-400 font-medium mb-1">Naslov</p>
              <p className="text-xl font-bold text-gray-900">{data.fontovi.naslov}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-400 font-medium mb-1">Tijelo teksta</p>
              <p className="text-base text-gray-700">{data.fontovi.tekst}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Brand Voice">
        <p className="text-gray-600 leading-relaxed text-sm">{data.brandVoice}</p>
      </Card>

      <Card title="Misija">
        <p className="text-gray-600 leading-relaxed text-sm italic">"{data.misija}"</p>
      </Card>
    </div>
  );
}

// --- Instagram Starter Tab ---

function InstagramTab({ data }: { data: StartifyResult["instagramStarter"] }) {
  const dani = ["ponedeljak", "utorak", "srijeda", "cetvrtak", "petak", "subota", "nedjelja"];
  const daniLabels: Record<string, string> = {
    ponedeljak: "Pon",
    utorak: "Uto",
    srijeda: "Sri",
    cetvrtak: "Čet",
    petak: "Pet",
    subota: "Sub",
    nedjelja: "Ned",
  };

  return (
    <div className="space-y-5">
      <Card title="Instagram bio" action={<CopyButton text={data.bio} />}>
        <p className="text-gray-700 leading-relaxed text-sm">{data.bio}</p>
        <p className="text-xs text-gray-400 mt-2">{data.bio.length} / 150 znakova</p>
      </Card>

      <div>
        <h3 className="font-bold text-gray-900 text-sm mb-3">Captioni (5)</h3>
        <div className="space-y-3">
          {data.captioni.map((caption, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3 flex-1 min-w-0">
                  <span className="w-6 h-6 bg-[#4D0ACA]/10 text-[#4D0ACA] rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-gray-700 text-sm leading-relaxed">{caption}</p>
                </div>
                <CopyButton text={caption} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card
        title={`Hashtagovi (${data.hashtagovi.length})`}
        action={<CopyButton text={data.hashtagovi.join(" ")} label="Kopiraj sve" />}
      >
        <div className="flex flex-wrap gap-2">
          {data.hashtagovi.map((tag, i) => (
            <span
              key={i}
              className="bg-[#4D0ACA]/10 text-[#4D0ACA] text-xs font-medium px-3 py-1.5 rounded-full border border-[#4D0ACA]/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </Card>

      <Card title="Plan objava — 7 dana">
        <div className="grid grid-cols-7 gap-2">
          {dani.map((dan) => (
            <div key={dan} className="text-center">
              <div className="text-[#4D0ACA] font-bold text-xs mb-2">{daniLabels[dan]}</div>
              <div className="bg-gray-50 rounded-xl p-2 text-xs text-gray-600 leading-snug min-h-[80px] flex items-center justify-center text-center">
                {data.planObjava[dan] || "—"}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// --- Google Business Tab ---

function GoogleTab({ data }: { data: StartifyResult["googleBusiness"] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <Card title="Naziv profila" action={<CopyButton text={data.naziv} />}>
          <p className="text-gray-800 font-semibold text-sm">{data.naziv}</p>
        </Card>
        <Card title="Kategorija">
          <span className="inline-flex items-center bg-[#4D0ACA]/10 text-[#4D0ACA] px-4 py-2 rounded-full text-sm font-semibold">
            {data.kategorija}
          </span>
        </Card>
      </div>

      <Card title="Opis biznisa" action={<CopyButton text={data.opis} />}>
        <p className="text-gray-600 leading-relaxed text-sm">{data.opis}</p>
        <p className="text-xs text-gray-400 mt-2">{data.opis.length} / 750 znakova</p>
      </Card>

      <div className="grid md:grid-cols-2 gap-5">
        <Card title="Ključne riječi (SEO)">
          <div className="flex flex-wrap gap-2">
            {data.kljucneRijeci.map((rijec, i) => (
              <span key={i} className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full">
                {rijec}
              </span>
            ))}
          </div>
        </Card>
        <Card title="Usluge">
          <ul className="space-y-2">
            {data.usluge.map((usluga, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 rounded-full bg-[#4D0ACA] flex-shrink-0" />
                {usluga}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card title="FAQ — Često postavljana pitanja">
        <div className="space-y-2">
          {data.faq.map((item, i) => (
            <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-sm text-gray-900 pr-4">{item.pitanje}</span>
                <svg
                  className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 border-t border-gray-50">
                  <p className="text-sm text-gray-600 leading-relaxed pt-3">{item.odgovor}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// --- Launch Checklist Tab ---

function ChecklistTab({ data }: { data: StartifyResult["launchChecklist"] }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const progress = data.length > 0 ? Math.round((checked.size / data.length) * 100) : 0;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-2">
          <p className="font-bold text-gray-900 text-sm">
            {checked.size} / {data.length} koraka završeno
          </p>
          <p className="text-sm font-bold text-[#4D0ACA]">{progress}%</p>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#4D0ACA] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {data.map((item, i) => {
          const isDone = checked.has(i);
          return (
            <button
              key={i}
              onClick={() => toggle(i)}
              className={`w-full text-left bg-white rounded-2xl border-2 shadow-sm p-5 transition-all duration-200 ${
                isDone
                  ? "border-green-200 bg-green-50/50"
                  : "border-gray-100 hover:border-[#4D0ACA]/30"
              }`}
            >
              <div className="flex gap-4">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                    isDone ? "border-green-500 bg-green-500" : "border-gray-300"
                  }`}
                >
                  {isDone && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-400">{String(i + 1).padStart(2, "0")}</span>
                    <p className={`font-bold text-sm ${isDone ? "text-gray-400 line-through" : "text-gray-900"}`}>
                      {item.naziv}
                    </p>
                  </div>
                  <p className={`text-sm leading-relaxed ${isDone ? "text-gray-400" : "text-gray-600"}`}>
                    {item.opis}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// --- Message Templates Tab ---

function MessagesTab({ data }: { data: StartifyResult["messageTemplates"] }) {
  const templates = [
    {
      key: "dobrodoslica",
      label: "Dobrodošlica",
      text: data.dobrodoslica,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
        </svg>
      ),
    },
    {
      key: "odgovorNaUpit",
      label: "Odgovor na upit",
      text: data.odgovorNaUpit,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg>
      ),
    },
    {
      key: "ponuda",
      label: "Ponuda",
      text: data.ponuda,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
        </svg>
      ),
    },
    {
      key: "potvrdaRezervacije",
      label: "Potvrda rezervacije",
      text: data.potvrdaRezervacije,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
    },
    {
      key: "zahvalnica",
      label: "Zahvalnica",
      text: data.zahvalnica,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {templates.map((t) => (
        <div key={t.key} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#4D0ACA]/10 text-[#4D0ACA] rounded-xl flex items-center justify-center">
                {t.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-sm">{t.label}</h3>
            </div>
            <CopyButton text={t.text} />
          </div>
          <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 rounded-xl p-4">{t.text}</p>
        </div>
      ))}
    </div>
  );
}

// --- Main ---

export default function Rezultati() {
  const router = useRouter();
  const [result, setResult] = useState<StartifyResult | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("brand");

  useEffect(() => {
    const raw = localStorage.getItem("startifyResult");
    if (!raw) {
      router.push("/upitnik");
      return;
    }
    try {
      setResult(JSON.parse(raw));
    } catch {
      router.push("/upitnik");
    }
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg
            className="animate-spin h-8 w-8 text-[#4D0ACA]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="text-gray-500 text-sm">Učitavanje...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Startify logo" width={40} height={40} className="rounded-full" />
            <span className="font-bold text-xl text-gray-900">Startify</span>
          </Link>
          <Link
            href="/upitnik"
            className="bg-[#4D0ACA] hover:bg-[#3d089f] text-white px-5 py-2.5 rounded-full font-semibold transition-colors text-sm"
          >
            Novi biznis
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Paket uspješno generisan
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
              Tvoj starter paket je spreman!
            </h1>
            <p className="text-gray-500 text-base">
              Pregledaj svaki dio i kopiraj sadržaj koji ti treba
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1.5 mb-6 overflow-x-auto shadow-sm">
            {TAB_CONFIG.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.key
                    ? "bg-[#4D0ACA] text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "brand"     && <BrandTab     data={result.brandIdentity}    />}
          {activeTab === "instagram" && <InstagramTab  data={result.instagramStarter} />}
          {activeTab === "google"    && <GoogleTab     data={result.googleBusiness}   />}
          {activeTab === "checklist" && <ChecklistTab  data={result.launchChecklist}  />}
          {activeTab === "messages"  && <MessagesTab   data={result.messageTemplates} />}
        </div>
      </div>
    </main>
  );
}
