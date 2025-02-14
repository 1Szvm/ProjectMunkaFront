import React, { useEffect, useState } from 'react'
import { readCategories } from '../utility/crudUtility';

export default function Details({selectedRace}) {
    const [categories, setCategories] = useState(null);
    useEffect(() => {
        readCategories(setCategories);
    }, []);
    const today = new Date();
  return (
    <div>
        <dialog id="details" className="modal">
          <div className="modal-box">
            {selectedRace ? (
              <>
              <div className='text-neutral-700'>
                <img src={selectedRace.imageUrl} alt={selectedRace.palya} className='rounded mb-5' />
                <h3 className="font-bold text-xl py-4">{selectedRace.palya}</h3>
                <p className="py-2">
                  Kategória: {categories?.find(cat => cat.id === selectedRace.kategoria)?.nev}
                </p>
                <p className="py-2">Dátum: {new Date(selectedRace.idopont.seconds * 1000).toLocaleDateString()}</p>
                <p className="py-2">Hátralévő idő: {Math.ceil((new Date(selectedRace.idopont.seconds * 1000) - today) / (1000 * 60 * 60 * 24))} nap</p>
                </div>
              </>
            ) : (
              <p className="py-4">Nincsenek részletek.</p>
            )}
              <div className="modal-action w-full flex justify-between">
                {selectedRace?.jelentkezesek?.includes(user.uid) ? 
                  <button className="btn text-yellow-600 hover:bg-yellow-400 hover:text-slate-950 ">Jeletkezés visszavonás</button>: 
                  <button className="btn text-green-600 hover:bg-green-400 hover:text-slate-950">Jelentkezek</button>}
                <form method="dialog">
                  <button className="btn bg-red-600 txet-white">Bezárás</button>
                </form>
              </div>
          </div>
        </dialog>
    </div>
  )
}