"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// --- Types ---

type Grana = "novo" | "postojece" | null;

interface FormData {
  grana: Grana;
  // Korak 2
  imeBiznisa: string;
  industrija: string;
  gradDrzava: string;
  kratakOpis: string;
  // Korak 3
  kupci: string[];
  uslugeProizvodi: string;
  radnoVrijeme: string;
  // Korak 4
  stil: string;
  colorMood: string;
  tonKomunikacije: string;
  jezikOutputa: string;
  // Korak 5A
  telefon5A: string;
  email: string;
  platforme5A: string[];
  imaLogoBojeA: string;
  vizija: string;
  // Korak 5B
  telefon5B: string;
  webStranica: string;
  instagramProfil: string;
  adresa: string;
  platforme5B: string[];
  imaLogoB: string;
  imaWebB: string;
  glavniProblem: string;
}

const INITIAL_DATA: FormData = {
  grana: null,
  imeBiznisa: "",
  industrija: "",
  gradDrzava: "",
  kratakOpis: "",
  kupci: [],
  uslugeProizvodi: "",
  radnoVrijeme: "",
  stil: "",
  colorMood: "",
  tonKomunikacije: "",
  jezikOutputa: "Bosanski",
  telefon5A: "",
  email: "",
  platforme5A: [],
  imaLogoBojeA: "",
  vizija: "",
  telefon5B: "",
  webStranica: "",
  instagramProfil: "",
  adresa: "",
  platforme5B: [],
  imaLogoB: "",
  imaWebB: "",
  glavniProblem: "",
};

const TOTAL_STEPS = 5;

const INDUSTRIJE = [
  "Restoran/Kafic",
  "Frizerski salon",
  "Kozmeticki salon",
  "Apartman/Smjestaj",
  "Fitness/Teretana",
  "Autoservis",
  "Transport",
  "Webshop",
  "Freelancing",
  "Trgovina",
  "Medicinska ordinacija",
  "Drugo",
];

const KUPCI_OPCIJE = [
  "Porodice", "Mladi 18-30", "Poslovni ljudi", "Turisti",
  "Studenti", "Sportisti", "Djeca", "Svi",
];

const STILOVI = [
  { id: "moderan",  naziv: "Moderan",  opis: "Čist, tehnološki, savremeni izgled" },
  { id: "friendly", naziv: "Friendly", opis: "Topao, prijatan, pristupačni" },
  { id: "premium",  naziv: "Premium",  opis: "Luksuzno, ekskluzivno, visoka klasa" },
  { id: "minimalan",naziv: "Minimalan",opis: "Jednostavno, elegantno, bez viška" },
  { id: "smion",    naziv: "Smion",    opis: "Upadljivo, kreativno, različito" },
];

const COLOR_MOODS = [
  { id: "toplo",     naziv: "Toplo",     color: "#FF6B35",  rainbow: false },
  { id: "hladno",    naziv: "Hladno",    color: "#0066CC",  rainbow: false },
  { id: "neutralno", naziv: "Neutralno", color: "#555555",  rainbow: false },
  { id: "zemljano",  naziv: "Zemljano",  color: "#8B6914",  rainbow: false },
  { id: "sareno",    naziv: "Sareno",    color: "",         rainbow: true  },
];

const TONOVI_KOMUNIKACIJE = [
  "Profesionalno",
  "Opušteno i prijateljski",
  "Luksuzno",
  "Zabavno",
  "Direktno",
];

const PLATFORME_A = ["Instagram", "Facebook", "TikTok", "Google Business", "WhatsApp", "Viber", "Ništa još"];
const PLATFORME_B = ["Instagram", "Facebook", "TikTok", "Google Business", "WhatsApp", "Viber", "Ništa"];

// --- Shared UI components ---

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="fixed top-[73px] left-0 right-0 z-40">
      <div className="h-1.5 bg-gray-100">
        <div
          className="h-full bg-[#28007E] transition-all duration-500 ease-out"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      {msg}
    </p>
  );
}

function FieldLabel({ text, required }: { text: string; required?: boolean }) {
  return (
    <p className="text-sm font-semibold text-gray-700 mb-1.5">
      {text}{required && <span className="text-red-400 ml-0.5">*</span>}
    </p>
  );
}

function TextInput({
  label, value, onChange, placeholder, required, error, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; required?: boolean; error?: string; type?: string;
}) {
  return (
    <div>
      <FieldLabel text={label} required={required} />
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border-2 text-gray-900 placeholder-gray-400 text-sm outline-none transition-colors bg-white ${
          error ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-[#28007E]"
        }`}
      />
      <FieldError msg={error} />
    </div>
  );
}

function TextArea({
  label, value, onChange, placeholder, required, error, maxLength, rows = 4,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; required?: boolean; error?: string; maxLength?: number; rows?: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <FieldLabel text={label} required={required} />
        {maxLength && (
          <span className={`text-xs font-medium ${value.length >= maxLength * 0.9 ? "text-orange-500" : "text-gray-400"}`}>
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        value={value}
        onChange={(e) => {
          if (maxLength && e.target.value.length > maxLength) return;
          onChange(e.target.value);
        }}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-4 py-3 rounded-xl border-2 text-gray-900 placeholder-gray-400 text-sm outline-none transition-colors resize-none bg-white ${
          error ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-[#28007E]"
        }`}
      />
      <FieldError msg={error} />
    </div>
  );
}

function SelectDropdown({
  label, value, onChange, options, required, error,
}: {
  label: string; value: string; onChange: (v: string) => void;
  options: string[]; required?: boolean; error?: string;
}) {
  return (
    <div>
      <FieldLabel text={label} required={required} />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors bg-white cursor-pointer ${
          value ? "text-gray-900" : "text-gray-400"
        } ${error ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-[#28007E]"}`}
      >
        <option value="" disabled>Odaberite industriju...</option>
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <FieldError msg={error} />
    </div>
  );
}

function MultiSelectPills({
  label, options, selected, onToggle,
}: {
  label: string; options: string[]; selected: string[]; onToggle: (v: string) => void;
}) {
  return (
    <div>
      <FieldLabel text={label} />
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isOn = selected.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => onToggle(opt)}
              className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all duration-200 ${
                isOn
                  ? "bg-[#28007E] text-white border-[#28007E]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#28007E]/50"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RadioCards({
  label, options, selected, onSelect,
}: {
  label: string; options: { value: string; label: string }[]; selected: string; onSelect: (v: string) => void;
}) {
  return (
    <div>
      <FieldLabel text={label} />
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => {
          const isOn = selected === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              className={`p-4 rounded-xl border-2 text-sm font-semibold text-center transition-all duration-200 ${
                isOn
                  ? "border-[#28007E] bg-[#28007E]/5 text-[#28007E]"
                  : "border-gray-200 bg-white text-gray-600 hover:border-[#28007E]/40"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PillPicker({
  label, options, selected, onSelect,
}: {
  label: string; options: string[]; selected: string; onSelect: (v: string) => void;
}) {
  return (
    <div>
      <FieldLabel text={label} />
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isOn = selected === opt;
          return (
            <button
              key={opt}
              onClick={() => onSelect(isOn ? "" : opt)}
              className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all duration-200 ${
                isOn
                  ? "bg-[#28007E] text-white border-[#28007E]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#28007E]/50"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepHeader({ badge, title, subtitle }: { badge: string; title: string; subtitle: string }) {
  return (
    <div className="text-center mb-10">
      <div className="inline-flex items-center gap-2 bg-[#28007E]/10 text-[#28007E] px-4 py-2 rounded-full text-sm font-semibold mb-6">
        {badge}
      </div>
      <h1 className="text-4xl font-black text-gray-900 mb-3">{title}</h1>
      <p className="text-gray-500 text-lg">{subtitle}</p>
    </div>
  );
}

function NavButtons({
  onNext, onBack, nextLabel = "Nastavi →", nextDisabled,
}: {
  onNext: () => void; onBack?: () => void; nextLabel?: string; nextDisabled?: boolean;
}) {
  return (
    <div className="space-y-3">
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className="w-full bg-[#28007E] text-white py-4 rounded-full font-bold text-base transition-all duration-200 hover:bg-[#1e005e] disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.99] disabled:hover:scale-100 shadow-lg shadow-[#28007E]/20 disabled:shadow-none"
      >
        {nextLabel}
      </button>
      {onBack && (
        <button
          onClick={onBack}
          className="text-sm text-gray-400 hover:text-[#28007E] font-medium transition-colors flex items-center gap-1.5 mx-auto"
        >
          ← Nazad
        </button>
      )}
    </div>
  );
}

// --- Korak 1 ---

function Korak1({
  grana, setGrana, onNext,
}: {
  grana: Grana; setGrana: (v: Grana) => void; onNext: () => void;
}) {
  const opcije = [
    {
      id: "novo" as Grana,
      naslov: "Tek pokrećem biznis",
      opis: "Pomozite mi da krenem od nule",
      ikona: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      ),
    },
    {
      id: "postojece" as Grana,
      naslov: "Imam biznis, trebam online prisustvo",
      opis: "Već poslujemo, trebamo digitalizaciju",
      ikona: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
        </svg>
      ),
    },
  ];

  return (
    <div>
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#28007E]/10 text-[#28007E] px-4 py-2 rounded-full text-sm font-semibold mb-6">
          Korak 1 — Grana
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-3">Dobrodošli u Startify!</h1>
        <p className="text-gray-500 text-lg">Recite nam nešto o vašem biznisu</p>
      </div>

      <div className="grid gap-4 mb-8">
        {opcije.map((opcija) => {
          const sel = grana === opcija.id;
          return (
            <button
              key={String(opcija.id)}
              onClick={() => setGrana(opcija.id)}
              className={`p-6 rounded-2xl border-2 text-left transition-all duration-200 ${
                sel ? "border-[#28007E] bg-[#28007E]/5 shadow-md" : "border-gray-200 bg-white hover:border-[#28007E]/40 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${sel ? "bg-[#28007E] text-white" : "bg-gray-100 text-gray-400"}`}>
                  {opcija.ikona}
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-lg mb-0.5 ${sel ? "text-[#28007E]" : "text-gray-900"}`}>{opcija.naslov}</h3>
                  <p className="text-gray-500 text-sm">{opcija.opis}</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${sel ? "border-[#28007E] bg-[#28007E]" : "border-gray-300"}`}>
                  {sel && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <NavButtons onNext={onNext} nextDisabled={!grana} />
    </div>
  );
}

// --- Korak 2 ---

function Korak2({
  data, update, onNext, onBack,
}: {
  data: FormData; update: (p: Partial<FormData>) => void; onNext: () => void; onBack: () => void;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const clearError = (field: string) =>
    setErrors((prev) => ({ ...prev, [field]: "" }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.imeBiznisa.trim()) e.imeBiznisa = "Ime biznisa je obavezno";
    if (!data.industrija) e.industrija = "Molimo odaberite industriju";
    if (!data.gradDrzava.trim()) e.gradDrzava = "Grad i država su obavezni";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div>
      <StepHeader badge="Korak 2 — Osnove" title="Osnove vašeg biznisa" subtitle="Recite nam više o tome šta radite" />
      <div className="space-y-5 mb-8">
        <TextInput
          label="Ime biznisa"
          value={data.imeBiznisa}
          onChange={(v) => { update({ imeBiznisa: v }); clearError("imeBiznisa"); }}
          placeholder="Npr. Restoran Bosna, Salon Aida..."
          required
          error={errors.imeBiznisa}
        />
        <SelectDropdown
          label="Industrija"
          value={data.industrija}
          onChange={(v) => { update({ industrija: v }); clearError("industrija"); }}
          options={INDUSTRIJE}
          required
          error={errors.industrija}
        />
        <TextInput
          label="Grad i država"
          value={data.gradDrzava}
          onChange={(v) => { update({ gradDrzava: v }); clearError("gradDrzava"); }}
          placeholder="Npr. Sarajevo, BiH"
          required
          error={errors.gradDrzava}
        />
        <TextArea
          label="Kratki opis"
          value={data.kratakOpis}
          onChange={(v) => update({ kratakOpis: v })}
          placeholder="Šta radite ili planirate raditi? Recite nam ukratko o svom biznisu..."
          maxLength={300}
          rows={4}
        />
      </div>
      <NavButtons onNext={() => { if (validate()) onNext(); }} onBack={onBack} />
    </div>
  );
}

// --- Korak 3 ---

function Korak3({
  data, update, onNext, onBack,
}: {
  data: FormData; update: (p: Partial<FormData>) => void; onNext: () => void; onBack: () => void;
}) {
  const toggleKupac = (v: string) => {
    update({
      kupci: data.kupci.includes(v) ? data.kupci.filter((k) => k !== v) : [...data.kupci, v],
    });
  };

  return (
    <div>
      <StepHeader badge="Korak 3 — Kupci i usluge" title="Ko su vaši kupci?" subtitle="Pomozite nam da razumijemo vaše tržište" />
      <div className="space-y-6 mb-8">
        <MultiSelectPills
          label="Ko su vaši kupci? (možete odabrati više)"
          options={KUPCI_OPCIJE}
          selected={data.kupci}
          onToggle={toggleKupac}
        />
        <TextArea
          label="Koje usluge ili proizvode nudite?"
          value={data.uslugeProizvodi}
          onChange={(v) => update({ uslugeProizvodi: v })}
          placeholder="Npr. Pizza, pasta, dostava, catering..."
          rows={3}
        />
        <TextInput
          label="Radno vrijeme"
          value={data.radnoVrijeme}
          onChange={(v) => update({ radnoVrijeme: v })}
          placeholder="Npr. Pon-Pet 08-20h, Sub 09-16h"
        />
      </div>
      <NavButtons onNext={onNext} onBack={onBack} />
    </div>
  );
}

// --- Korak 4 ---

function VisualStylePicker({
  selected, onSelect,
}: {
  selected: string; onSelect: (v: string) => void;
}) {
  return (
    <div>
      <FieldLabel text="Kakav stil želite?" />
      <div className="grid gap-3">
        {STILOVI.map((s) => {
          const isOn = selected === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(isOn ? "" : s.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                isOn ? "border-[#28007E] bg-[#28007E]/5" : "border-gray-200 bg-white hover:border-[#28007E]/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-bold text-sm ${isOn ? "text-[#28007E]" : "text-gray-900"}`}>{s.naziv}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{s.opis}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ml-4 ${isOn ? "border-[#28007E] bg-[#28007E]" : "border-gray-300"}`}>
                  {isOn && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ColorMoodPicker({
  selected, onSelect,
}: {
  selected: string; onSelect: (v: string) => void;
}) {
  return (
    <div>
      <FieldLabel text="Color mood" />
      <div className="flex gap-5 flex-wrap">
        {COLOR_MOODS.map((mood) => {
          const isOn = selected === mood.id;
          return (
            <button
              key={mood.id}
              onClick={() => onSelect(isOn ? "" : mood.id)}
              className={`flex flex-col items-center gap-2 transition-all duration-200 ${isOn ? "opacity-100" : "opacity-55 hover:opacity-90"}`}
            >
              <div
                className={`w-12 h-12 rounded-full border-4 transition-all ${isOn ? "border-[#28007E] scale-110" : "border-transparent"}`}
                style={
                  mood.rainbow
                    ? { background: "linear-gradient(135deg, #FF0000, #FF8800, #FFEE00, #00CC44, #0066FF, #8800FF)" }
                    : { backgroundColor: mood.color }
                }
              />
              <span className={`text-xs font-semibold ${isOn ? "text-[#28007E]" : "text-gray-500"}`}>{mood.naziv}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Korak4({
  data, update, onNext, onBack,
}: {
  data: FormData; update: (p: Partial<FormData>) => void; onNext: () => void; onBack: () => void;
}) {
  return (
    <div>
      <StepHeader badge="Korak 4 — Brend i stil" title="Kakav izgled želite?" subtitle="Definišite vizualni identitet vašeg biznisa" />
      <div className="space-y-7 mb-8">
        <VisualStylePicker selected={data.stil} onSelect={(v) => update({ stil: v })} />
        <ColorMoodPicker selected={data.colorMood} onSelect={(v) => update({ colorMood: v })} />
        <PillPicker
          label="Ton komunikacije"
          options={TONOVI_KOMUNIKACIJE}
          selected={data.tonKomunikacije}
          onSelect={(v) => update({ tonKomunikacije: v })}
        />
        <div>
          <FieldLabel text="Jezik outputa" />
          <select
            value={data.jezikOutputa}
            onChange={(e) => update({ jezikOutputa: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#28007E] text-gray-900 text-sm outline-none transition-colors bg-white"
          >
            <option value="Bosanski">Bosanski</option>
            <option value="Engleski">Engleski</option>
          </select>
        </div>
      </div>
      <NavButtons onNext={onNext} onBack={onBack} />
    </div>
  );
}

// --- Korak 5A ---

function Korak5A({
  data, update, onSubmit, onBack,
}: {
  data: FormData; update: (p: Partial<FormData>) => void; onSubmit: () => void; onBack: () => void;
}) {
  const togglePlatforma = (v: string) => {
    update({
      platforme5A: data.platforme5A.includes(v)
        ? data.platforme5A.filter((p) => p !== v)
        : [...data.platforme5A, v],
    });
  };

  return (
    <div>
      <StepHeader badge="Korak 5 — Kontakt i planovi" title="Zadnji korak!" subtitle="Recite nam gdje ćemo vam poslati paket" />
      <div className="space-y-5 mb-8">
        <TextInput
          label="Planirani naziv biznisa"
          value={data.imeBiznisa}
          onChange={(v) => update({ imeBiznisa: v })}
          placeholder="Naziv vašeg biznisa"
        />
        <TextInput
          label="Telefon"
          value={data.telefon5A}
          onChange={(v) => update({ telefon5A: v })}
          placeholder="+387 61 000 000"
          type="tel"
        />
        <TextInput
          label="Email"
          value={data.email}
          onChange={(v) => update({ email: v })}
          placeholder="vas@email.com"
          type="email"
        />
        <TextInput
          label="Planirana lokacija / grad"
          value={data.gradDrzava}
          onChange={(v) => update({ gradDrzava: v })}
          placeholder="Npr. Sarajevo, BiH"
        />
        <MultiSelectPills
          label="Koje platforme planirate koristiti?"
          options={PLATFORME_A}
          selected={data.platforme5A}
          onToggle={togglePlatforma}
        />
        <RadioCards
          label="Imate li već logo ili boje?"
          options={[
            { value: "da", label: "Da, imam nešto" },
            { value: "ne", label: "Ne, trebam sve od nule" },
          ]}
          selected={data.imaLogoBojeA}
          onSelect={(v) => update({ imaLogoBojeA: v })}
        />
        <TextArea
          label="Imate li neku poruku ili viziju za biznis?"
          value={data.vizija}
          onChange={(v) => update({ vizija: v })}
          placeholder="Npr. Želim biti poznat po kvalitetu..."
          rows={3}
        />
      </div>
      <NavButtons onNext={onSubmit} onBack={onBack} nextLabel="Generiši moj paket!" />
    </div>
  );
}

// --- Korak 5B ---

function Korak5B({
  data, update, onSubmit, onBack,
}: {
  data: FormData; update: (p: Partial<FormData>) => void; onSubmit: () => void; onBack: () => void;
}) {
  const togglePlatforma = (v: string) => {
    update({
      platforme5B: data.platforme5B.includes(v)
        ? data.platforme5B.filter((p) => p !== v)
        : [...data.platforme5B, v],
    });
  };

  return (
    <div>
      <StepHeader badge="Korak 5 — Kontakt i digitalizacija" title="Zadnji korak!" subtitle="Recite nam više o vašem trenutnom biznisu" />
      <div className="space-y-5 mb-8">
        <TextInput
          label="Telefon"
          value={data.telefon5B}
          onChange={(v) => update({ telefon5B: v })}
          placeholder="+387 61 000 000"
          type="tel"
        />
        <TextInput
          label="Web stranica"
          value={data.webStranica}
          onChange={(v) => update({ webStranica: v })}
          placeholder="www.vasbiznis.ba"
        />
        <TextInput
          label="Instagram profil"
          value={data.instagramProfil}
          onChange={(v) => update({ instagramProfil: v })}
          placeholder="@vasbiznis"
        />
        <TextInput
          label="Adresa / lokacija"
          value={data.adresa}
          onChange={(v) => update({ adresa: v })}
          placeholder="Npr. Ulica bb, Sarajevo"
        />
        <MultiSelectPills
          label="Koje platforme već koristite?"
          options={PLATFORME_B}
          selected={data.platforme5B}
          onToggle={togglePlatforma}
        />
        <RadioCards
          label="Imate li već logo?"
          options={[
            { value: "da", label: "Da, imam logo" },
            { value: "ne", label: "Ne, nemam logo" },
          ]}
          selected={data.imaLogoB}
          onSelect={(v) => update({ imaLogoB: v })}
        />
        <RadioCards
          label="Imate li već web stranicu?"
          options={[
            { value: "da", label: "Da, imam" },
            { value: "ne", label: "Ne, nemam" },
          ]}
          selected={data.imaWebB}
          onSelect={(v) => update({ imaWebB: v })}
        />
        <TextArea
          label="Šta vam je najveći problem trenutno?"
          value={data.glavniProblem}
          onChange={(v) => update({ glavniProblem: v })}
          placeholder="Npr. Nemam dovoljno kupaca online..."
          rows={3}
        />
      </div>
      <NavButtons onNext={onSubmit} onBack={onBack} nextLabel="Generiši moj paket!" />
    </div>
  );
}

// --- Main ---

export default function Upitnik() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);

  const update = (partial: Partial<FormData>) =>
    setFormData((prev) => ({ ...prev, ...partial }));

  const next = () => setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => {
    console.log("Submitted:", formData);
    // TODO: send to API
  };

  return (
    <main className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Startify logo" width={40} height={40} className="rounded-full" />
            <span className="font-bold text-xl text-gray-900">Startify</span>
          </Link>
          <span className="text-sm text-gray-400 font-medium">Korak {currentStep} / {TOTAL_STEPS}</span>
        </div>
      </nav>

      <ProgressBar current={currentStep} total={TOTAL_STEPS} />

      <div className="pt-36 pb-24 px-6">
        <div className="max-w-xl mx-auto">
          {currentStep === 1 && (
            <Korak1 grana={formData.grana} setGrana={(v) => update({ grana: v })} onNext={next} />
          )}
          {currentStep === 2 && (
            <Korak2 data={formData} update={update} onNext={next} onBack={back} />
          )}
          {currentStep === 3 && (
            <Korak3 data={formData} update={update} onNext={next} onBack={back} />
          )}
          {currentStep === 4 && (
            <Korak4 data={formData} update={update} onNext={next} onBack={back} />
          )}
          {currentStep === 5 && formData.grana === "novo" && (
            <Korak5A data={formData} update={update} onSubmit={handleSubmit} onBack={back} />
          )}
          {currentStep === 5 && formData.grana === "postojece" && (
            <Korak5B data={formData} update={update} onSubmit={handleSubmit} onBack={back} />
          )}
        </div>
      </div>
    </main>
  );
}
