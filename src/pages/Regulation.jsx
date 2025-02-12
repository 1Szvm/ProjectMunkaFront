import { useState } from "react";
import { Footer } from "../components/Footer";

const Section = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 py-4">
      <button
        className="w-full text-left text-xl font-semibold text-indigo-600 hover:text-indigo-800 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex justify-between items-center">
          {title}
          <span className={`transform transition-all duration-300 ${isOpen ? "rotate-180" : ""}`}>
            &#9650;
          </span>
        </span>
      </button>
      <div
        className={`transition-all duration-500 ease-in-out mt-4 text-gray-700 transform ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        {children}
      </div>
    </div>
  );
};

export default function Regulation() {
  return (
    <div className="m-8 min-w-[300px] max-w-4xl w-full mx-auto p-4 min-h-screen">
      <div className="m-4 mx-auto p-8 bg-white shadow-xl rounded-xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">Versenyszabályzat</h1>
        <Section title="Általános szabályzat">
          <ul className="list-disc pl-6 space-y-2">
            <li>Ugyanazt a nevet használd Discordon is, mint játékban.</li>
            <li>Hirdetni csak az arra kijelölt helyen lehet.</li>
            <li>A futamokat rögzíteni kell, ha megoldható.</li>
          </ul>
        </Section>
        <Section title="Futam szabályzat">
          <ul className="list-disc pl-6 space-y-2">
            <li>Minimum 5 versenyző szükséges egy futam megtartásához.</li>
            <li>Időmérő alatt figyelni kell a gyorsabb autókra.</li>
          </ul>
        </Section>
        <Section title="Csapat szabályzat">
          <ul className="list-disc pl-6 space-y-2">
            <li>Csapatban versenyezni nem kötelező.</li>
            <li>Maximum 4 fős csapatok engedélyezettek.</li>
          </ul>
        </Section>
        <Section title="F1® 23 & 24 szabályok">
          <ul className="list-disc pl-6 space-y-2">
            <li>AI sofőr használata csak indokolt esetben engedélyezett.</li>
            <li>Tilos a "Reset to track" funkció.</li>
          </ul>
        </Section>
        <Section title="Beállítások">
          <ul className="list-disc pl-6 space-y-2">
            <li>Practice Format: 60 Min</li>
            <li>Qualifying: Full</li>
            <li>Session Length: Long 50%</li>
          </ul>
        </Section>
        <Section title="Menetrend">
          <ul className="list-disc pl-6 space-y-2">
            <li>1 órás Practice az indulás előtt.</li>
            <li>Qualifying és Race (Friends only).</li>
          </ul>
        </Section>
        <Section title="Panaszok és büntetések">
          <ul className="list-disc pl-6 space-y-2">
            <li>Panaszt 24 órán belül kell leadni.</li>
            <li>15 büntetőpont után végleges kizárás.</li>
          </ul>
        </Section>
        <Footer/>
      </div>
    </div>
  );
}
