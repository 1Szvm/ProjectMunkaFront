import React, { useEffect, useState, useRef, useContext } from 'react';
import { readCategories, toggleAplication } from '../utility/crudUtility';
import { UserContext } from '../context/UserContext';
import Toastify from './Toastify';
import Alerts from './Alerts';

export default function Details({ selectedRace, showDetails }) {
    const { user } = useContext(UserContext);
    const [categories, setCategories] = useState(null);
    const modalRef = useRef(null); // Reference for the modal
    const [txt,setText]=useState(null)

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
                        <img src={selectedRace.imageUrl} alt={selectedRace.palya} className='rounded mb-5' />
                        <div className='flex justify-between py-4'>
                            <div>
                                <h3 className="font-bold text-xl">{selectedRace.palya}</h3>
                                <p className="py-2">
                                    Kategória: {categories?.find(cat => cat.id === selectedRace.kategoria)?.nev}
                                </p>
                                <p className="py-2">
                                    Dátum: {new Date(selectedRace.idopont.seconds * 1000).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <p className='bg-red-600 rounded-xl p-2'>{selectedRace.resztvevok.length}/{selectedRace.max}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="py-4">Nincsenek részletek.</p>
                )}
                <div className="modal-action w-full flex justify-between">
                    {selectedRace?.resztvevok?.includes(user?.uid) ? (
                        <div 
                        className="btn text-yellow-600 hover:bg-yellow-400 hover:text-slate-950" 
                        onClick={handleApplication}
                        >Jelentkezés visszavonás</div>
                    ) : (
                        <div 
                        className={`btn text-green-600 hover:bg-green-400 hover:text-slate-950 
                        ${selectedRace?.resztvevok?.length === selectedRace?.max ? "cursor-not-allowed opacity-50" : ""}`} 
                        onClick={selectedRace?.resztvevok?.length === selectedRace?.max ? null : handleApplication}
                        >Jelentkezek</div>
                    )}
                    <div className="btn bg-red-600 text-white" onClick={() => modalRef.current?.close()}>Bezár</div>
                    </div>
                </div>
            {txt &&<Alerts err={txt}/>}
        </dialog>
    );
}
