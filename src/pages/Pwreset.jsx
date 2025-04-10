import React from 'react'
import { useContext } from 'react'
import { DarkModeContext } from '../components/DarkModeContext.jsx';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext.jsx';
export default function PwReset() {
  const { msg,resetPassword } = useContext(UserContext)
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    resetPassword(data.get('email'))
    
  }
  const { darkMode, setDarkMode } = useContext(DarkModeContext); 
  return (
    <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    >
    <div  className={`min-h-screen p-3`}>
    <div className="pt-48 flex justify-center items-center">
      <div className="card w-96 shadow-xl">
        {/* <div > */}
        <motion.div
          className="card-body rounded-xl border-2 border-indigo-600 shadow-md"
          animate={{
            backgroundColor: darkMode ? "#1F1F1F" : "#F2F2F3",
            color: darkMode ? "#ffffff" : "#000000",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <h2 className="card-title text-center text-2xl font-bold mb-6">
            Jelszó módosítás
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control">
              <label className="label text-sm font-medium mb-1">E-mail</label>
              <input
                type="email"
                name="email"
                required
                placeholder="Adja meg az e-mail címét"
                className="input input-bordered w-full bg-white text-black dark:bg-zinc-800 dark:text-white dark:placeholder-gray-400"
              />
            </div>

            <div className="form-control">
              <button
                type="submit"
                className="btn btn-primary w-full text-white tracking-wide shadow-lg hover:shadow-xl transition-all duration-300"
                
              >
                Új jelszó igénylése
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="pt-4 text-center text-sm text-gray-600 dark:text-gray-400"
            >
              <p>
                Már van fiókja?{" "}
                <Link
                  to="/auth/in"
                  className="text-blue-600 hover:text-blue-800 font-semibold underline-offset-2 hover:underline transition-colors duration-200"
                >
                  Bejelentkezés
                </Link>
              </p>
            </motion.div>
          </form>
        </motion.div>

        </div>
        
      </div>
     </div>
     </motion.div>

  )
}