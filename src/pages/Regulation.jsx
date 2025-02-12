import { useState } from "react";

const Section = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-300 py-2">
      <button
        className="w-full text-left text-lg font-semibold text-blue-600 hover:underline"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      {isOpen && <div className="mt-2 text-gray-700">{children}</div>}
    </div>
  );
};

export default function Regulation() {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold text-center mb-4">Versenyszabályzat</h1>
      <Section title="Általános szabályzat">
        <ul className="list-disc pl-6">
          <li>Ugyanazt a nevet használd Discordon is, mint játékban.</li>
          <li>Hirdetni csak az arra kijelölt helyen lehet.</li>
          <li>A futamokat rögzíteni kell, ha megoldható.</li>
        </ul>
      </Section>
      <Section title="Futam szabályzat">
        <ul className="list-disc pl-6">
          <li>Minimum 5 versenyző szükséges egy futam megtartásához.</li>
          <li>Időmérő alatt figyelni kell a gyorsabb autókra.</li>
        </ul>
      </Section>
      <Section title="Csapat szabályzat">
        <ul className="list-disc pl-6">
          <li>Csapatban versenyezni nem kötelező.</li>
          <li>Maximum 4 fős csapatok engedélyezettek.</li>
        </ul>
      </Section>
      <Section title="F1® 23 & 24 szabályok">
        <ul className="list-disc pl-6">
          <li>AI sofőr használata csak indokolt esetben engedélyezett.</li>
          <li>Tilos a "Reset to track" funkció.</li>
        </ul>
      </Section>
      <Section title="Beállítások">
        <ul className="list-disc pl-6">
          <li>Practice Format: 60 Min</li>
          <li>Qualifying: Full</li>
          <li>Session Length: Long 50%</li>
        </ul>
      </Section>
      <Section title="Menetrend">
        <ul className="list-disc pl-6">
          <li>1 órás Practice az indulás előtt.</li>
          <li>Qualifying és Race (Friends only).</li>
        </ul>
      </Section>
      <Section title="Panaszok és büntetések">
        <ul className="list-disc pl-6">
          <li>Panaszt 24 órán belül kell leadni.</li>
          <li>15 büntetőpont után végleges kizárás.</li>
        </ul>
      </Section>
    </div>
  );
}
