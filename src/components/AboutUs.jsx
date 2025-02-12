import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen p-8">
      
      {/* Title Animation */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, type: 'spring', stiffness: 100 }}
      >
        <h1 className="text-5xl font-extrabold mb-4 text-amber-800 dark:text-amber-500">Rólunk – HUNSRT</h1>
        <p className="text-lg">
          A HUNSRT egy népszerű magyar szimulátoros versenyliga, amely különböző platformokon szervez versenyeket.
        </p>
      </motion.div>

      {/* Shortened History */}
      <motion.section
        className="max-w-6xl mx-auto mb-16 p-6 rounded-lg shadow-lg bg-gray-100 dark:bg-slate-800"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <motion.h2 
          className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          🏁 Történet
        </motion.h2>
        <motion.p
          className="text-lg text-gray-900 dark:text-slate-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          A HUNSRT 2018-ban alakult, célunk, hogy profi és tisztességes versenyeket rendezzünk minden szimulátoros számára. Azóta számos eseményt szerveztünk, és sikeresen növeltük közösségünket.
        </motion.p>
      </motion.section>

      {/* Mission and Vision */}
      <motion.section
        className="max-w-6xl mx-auto mb-16 p-6 rounded-lg shadow-lg bg-gray-100 dark:bg-slate-800"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        <motion.h2
          className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          🎯 Küldetés
        </motion.h2>
        <motion.p
          className="text-lg text-gray-900 dark:text-slate-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          A küldetésünk, hogy minden szimulátoros számára elérhető versenyközösséget hozzunk létre, függetlenül a tapasztalati szinttől. Mindenkinek lehetőséget biztosítunk, hogy profi versenyeken vegyen részt.
        </motion.p>
      </motion.section>

      {/* Championships */}
      <motion.section
        className="max-w-6xl mx-auto mb-16 p-6 rounded-lg shadow-lg bg-gray-100 dark:bg-slate-800"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        <motion.h2 
          className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          🏎️ Bajnokságok
        </motion.h2>
        <motion.ul
          className="list-disc text-lg ml-6 text-gray-900 dark:text-slate-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          <motion.li whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
            Assetto Corsa Competizione – GT3 és GT4
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
            iRacing – Endurance és Sprint versenyek
          </motion.li>
        </motion.ul>
      </motion.section>

      {/* Team */}
      <motion.section
        className="max-w-6xl mx-auto mb-16 p-6 rounded-lg shadow-lg bg-gray-100 dark:bg-slate-800"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.6 }}
      >
        <motion.h2
          className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          👥 Csapat
        </motion.h2>
        <motion.ul
          className="list-disc text-lg ml-6 text-gray-900 dark:text-slate-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          <motion.li whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
            <strong>Varga Ádám</strong> – Alapító
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
            <strong>Limpár Bertold</strong> – Versenyigazgató
          </motion.li>
        </motion.ul>
      </motion.section>

      {/* Achievements */}
      <motion.section
        className="max-w-6xl mx-auto mb-16 p-6 rounded-lg shadow-lg bg-gray-100 dark:bg-slate-800"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.7 }}
      >
        <motion.h2
          className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          🏆 Eredmények
        </motion.h2>
        <motion.p
          className="text-lg text-gray-900 dark:text-slate-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
        >
          Több mint <span className="text-yellow-600 dark:text-yellow-400 font-bold">500 verseny</span> és <span className="text-yellow-600 dark:text-yellow-400 font-bold">2000+ pilóta</span>!
        </motion.p>
      </motion.section>

      {/* Contact */}
      <motion.section
        className="max-w-6xl mx-auto mb-16 p-6 rounded-lg shadow-lg bg-gray-100 dark:bg-slate-800"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8 }}
      >
        <motion.h2
          className="text-3xl font-bold text-blue-600 dark:text-green-400 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          📩 Kapcsolat
        </motion.h2>
        <motion.p
          className="text-lg text-gray-900 dark:text-slate-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
        >
          <strong>📧 Email:</strong> info@hunsrt.hu  
          <br />
          <strong>🌐 Weboldal:</strong> www.hunsrt.hu  
        </motion.p>
      </motion.section>
      <motion.section
        className="max-w-6xl mx-auto mb-16 p-6 rounded-lg shadow-lg bg-gray-100 dark:bg-slate-800"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8 }}
      >
        <motion.h2
          className="text-3xl font-bold text-red-600 dark:text-green-400 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          📩 Szabályzat
        </motion.h2>
        <motion.p
  className="text-lg text-gray-900 dark:text-slate-300"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.2, delay: 1 }}
>
  <strong>📜 Általános szabályzat: </strong> 
  Ugyanazt a nevet használd Discordon is mint játékban, hogy be tudjunk azonosítani (Írd át a beceneved a szerveren)
  Hirdetni nem hirdetünk csak az arra kijelölt helyen
  A futamokat kötelező rögzíteni amennyiben megoldható, balesetek elemzése érdekében (F1-ben futam után "Save Full Race Replay")

  <br />

  <motion.button
    onClick={() => navigate('/regulation')}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="mt-4 flex items-center gap-2 bg-red-600 text-white font-semibold px-4 py-2 rounded-xl shadow-md hover:bg-red-700 transition-all duration-300"
  >
    <img src="protected.png" alt="" className="w-5 h-5" />

    !!Folytatás...!!
  </motion.button>
</motion.p>
      </motion.section>
      
    </div>
  );
};
