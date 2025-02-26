import React, { useEffect, useState, useRef, useContext } from 'react';
import { readCategories, toggleAplication } from '../utility/crudUtility';
import { UserContext } from '../context/UserContext';

export default function Details({ selectedRace, showDetails }) {
    const { user } = useContext(UserContext);
    const [categories, setCategories] = useState(null);
    const modalRef = useRef(null); // Reference for the modal

    useEffect(() => {
        readCategories(setCategories);
        if (showDetails) {
            modalRef.current?.showModal(); // Open modal when showDetails is true
        }
    }, [showDetails]);

    const handleApplication=async()=>{
      if(!user) setText("Jelentkezz be jelentekezéshez!")
        else await toggleAplication(selectedRace.id,user.uid)
    }

    return (
        <dialog ref={modalRef} id="details" className="modal">
            <div className="modal-box">
                {selectedRace ? (
                    <>
                        <div className='text-neutral-700'>
                            <img src={selectedRace.imageUrl} alt={selectedRace.palya} className='rounded mb-5' />
                            <h3 className="font-bold text-xl py-4">{selectedRace.palya}</h3>
                            <p className="py-2">
                                Kategória: {categories?.find(cat => cat.id === selectedRace.kategoria)?.nev}
                            </p>
                            <p className="py-2">
                                Dátum: {new Date(selectedRace.idopont.seconds * 1000).toLocaleDateString()}
                            </p>
                        </div>
                    </>
                ) : (
                    <p className="py-4">Nincsenek részletek.</p>
                )}
                <div className="modal-action w-full flex justify-between">
                    {selectedRace?.jelentkezesek?.includes(user?.uid) ? 
                    <div className="btn text-yellow-600 hover:bg-yellow-400 hover:text-slate-950" onClick={handleApplication}>Jeletkezés visszavonás</div>: 
                    <div className="btn text-green-600 hover:bg-green-400 hover:text-slate-950" onClick={handleApplication}>Jelentkezek</div>}
                    <div className="btn bg-red-600 text-white" onClick={() => modalRef.current?.close()}>
                        Bezárás
                    </div>
                </div>
            </div>
        </dialog>
    );
}
