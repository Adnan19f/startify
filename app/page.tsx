import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Startify logo" width={40} height={40} className="rounded-full" />
            <span className="font-bold text-xl text-gray-900">Startify</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#kako-radi" className="text-gray-600 hover:text-[#28007E] transition-colors text-sm font-medium">Kako radi</a>
            <a href="#sta-dobijas" className="text-gray-600 hover:text-[#28007E] transition-colors text-sm font-medium">Sta dobijas</a>
            <a href="#cijene" className="text-gray-600 hover:text-[#28007E] transition-colors text-sm font-medium">Cijene</a>
          </div>
          <a href="/upitnik" className="bg-[#28007E] hover:bg-[#1e005e] text-white px-5 py-2.5 rounded-full font-semibold transition-colors text-sm">
            Pokreni biznis
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-36 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#28007E]/10 text-[#28007E] px-4 py-2 rounded-full text-sm font-semibold mb-8">
            Pokreni biznis online za 10 minuta
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-6">
            Tvoj biznis,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#28007E] to-[#7c3aed]">
              online odmah.
            </span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Unesite osnovne informacije o svom biznisu i dobijte kompletan online paket —
            branding, Instagram, Google Business i landing stranicu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/upitnik" className="bg-[#28007E] hover:bg-[#1e005e] text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-[#28007E]/20">
              Kreiraj svoj paket besplatno
            </a>
            <a href="#kako-radi" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-4 rounded-full font-bold text-lg transition-colors">
              Pogledaj kako radi
            </a>
          </div>
          <p className="text-sm text-gray-400 mt-5">Besplatno · Bez registracije · Gotovo za 10 minuta</p>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-10 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-6 font-semibold">Savrseno za</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Restorani", "Saloni", "Apartmani", "Fitness", "Autoservisi", "Webshopovi", "Transport", "Freelanceri"].map((item) => (
              <span key={item} className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm font-medium hover:border-[#28007E] hover:text-[#28007E] transition-colors cursor-default">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* KAKO RADI */}
      <section id="kako-radi" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Kako Startify radi?</h2>
            <p className="text-gray-500 text-lg">Tri koraka do profesionalnog online prisustva</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                broj: "01",
                naslov: "Ispuni upitnik",
                opis: "Unesite ime biznisa, industriju, opis usluga i odaberite stil koji vas predstavlja.",
                ikona: (
                  <svg className="w-7 h-7 text-[#28007E]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                  </svg>
                )
              },
              {
                broj: "02",
                naslov: "AI kreira paket",
                opis: "Naa AI za nekoliko sekundi generise kompletan starter paket prilagodjen vasem biznisu.",
                ikona: (
                  <svg className="w-7 h-7 text-[#28007E]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                )
              },
              {
                broj: "03",
                naslov: "Preuzmite i koristite",
                opis: "Dobijate branding, Instagram sadrzaj, Google Business opis i landing stranicu.",
                ikona: (
                  <svg className="w-7 h-7 text-[#28007E]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                )
              }
            ].map((korak) => (
              <div key={korak.broj} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all hover:-translate-y-1 group">
                <div className="w-12 h-12 bg-[#28007E]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#28007E]/20 transition-colors">
                  {korak.ikona}
                </div>
                <div className="text-[#28007E] font-bold text-xs tracking-widest mb-2">{korak.broj}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{korak.naslov}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{korak.opis}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STA DOBIJAS */}
      <section id="sta-dobijas" className="py-24 px-6 bg-[#28007E]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">Sta dobijas u paketu?</h2>
            <p className="text-white/60 text-lg">Sve sto trebate za profesionalan online start</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                naslov: "Brand Identity",
                opis: "Boje, fontovi, slogan i ton komunikacije",
                ikona: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88" />
                  </svg>
                )
              },
              {
                naslov: "Instagram Starter",
                opis: "Bio, captions, hashtags i plan objava",
                ikona: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                  </svg>
                )
              },
              {
                naslov: "Google Business",
                opis: "SEO opis, kategorije i kljucne rijeci",
                ikona: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                )
              },
              {
                naslov: "Landing Stranica",
                opis: "Moderna web stranica za vas biznis",
                ikona: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253" />
                  </svg>
                )
              },
              {
                naslov: "Launch Checklist",
                opis: "Korak-po-korak vodic za pokretanje",
                ikona: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                naslov: "Message Templates",
                opis: "Poruke za kupce, ponude i odgovore",
                ikona: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                  </svg>
                )
              },
            ].map((item) => (
              <div key={item.naslov} className="bg-white/10 rounded-2xl p-6 hover:bg-white/20 transition-all hover:-translate-y-1 group">
                <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                  {item.ikona}
                </div>
                <h3 className="text-white font-bold text-base mb-2">{item.naslov}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.opis}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CIJENE */}
      <section id="cijene" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Jednostavne cijene</h2>
            <p className="text-gray-500 text-lg">Otkazite bilo kada, bez obaveza</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {[
              {
                naziv: "Besplatno",
                cijena: "0 KM",
                opis: "Za pocetak",
                stavke: ["Upitnik", "Preview brenda", "Instagram bio", "Launch checklist"],
                cta: "Pocni besplatno",
                highlighted: false
              },
              {
                naziv: "Starter",
                cijena: "40 KM/mj",
                opis: "Mjesecna pretplata",
                stavke: ["Kompletan brand identity", "Instagram starter pack", "Google Business opis", "3 varijante svakog teksta", "PDF export"],
                cta: "Uzmi Starter",
                highlighted: true
              },
              {
                naziv: "Pro",
                cijena: "90 KM/mj",
                opis: "Mjesecna pretplata",
                stavke: ["Sve iz Starter paketa", "Landing stranica", "Message templates", "7-dnevni plan objava", "Prioritetna podrska"],
                cta: "Uzmi Pro",
                highlighted: false
              }
            ].map((plan) => (
              <div key={plan.naziv} className={`rounded-2xl p-8 ${plan.highlighted ? "bg-[#28007E] text-white shadow-2xl shadow-[#28007E]/30 scale-105" : "bg-gray-50 text-gray-900"}`}>
                <div className={`text-xs font-semibold mb-2 uppercase tracking-widest ${plan.highlighted ? "text-white/60" : "text-[#28007E]"}`}>{plan.opis}</div>
                <h3 className="text-2xl font-black mb-1">{plan.naziv}</h3>
                <div className="text-4xl font-black mb-6">{plan.cijena}</div>
                <ul className="space-y-3 mb-8">
                  {plan.stavke.map((stavka) => (
                    <li key={stavka} className={`flex items-center gap-2 text-sm ${plan.highlighted ? "text-white/80" : "text-gray-600"}`}>
                      <svg className={`w-4 h-4 flex-shrink-0 ${plan.highlighted ? "text-white" : "text-[#28007E]"}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {stavka}
                    </li>
                  ))}
                </ul>
                <a href="/upitnik" className={`block text-center py-3 rounded-full font-bold text-sm transition-all hover:scale-105 ${plan.highlighted ? "bg-white text-[#28007E] hover:bg-gray-50" : "bg-[#28007E] text-white hover:bg-[#1e005e]"}`}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">Spreman za online prisustvo?</h2>
          <p className="text-gray-400 text-lg mb-8">
            Priduzi se malim biznisima koji su vec pokrenuli online prisustvo uz Startify.
          </p>
          <a href="/upitnik" className="inline-block bg-[#28007E] hover:bg-[#1e005e] text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-[#28007E]/30">
            Kreiraj svoj paket besplatno
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Startify" width={32} height={32} className="rounded-full" />
            <span className="text-white font-bold">Startify</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Uvjeti koristenja</a>
            <a href="/kontakt" className="hover:text-white transition-colors">Kontakt</a>
          </div>
          <p className="text-gray-500 text-sm">2026 Startify. Sva prava zadrzana.</p>
        </div>
      </footer>
    </main>
  );
}