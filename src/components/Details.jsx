import React, { useEffect, useState, useRef, useContext } from 'react';
import { readCategories, toggleAplication } from '../utility/crudUtility';
import Alerts from './Alerts';
import { UserContext } from '../context/userContext';

export default function Details({ selectedRace, showDetails }) {
    const { user } = useContext(UserContext);
    const [categories, setCategories] = useState(null);
    const [category, setCategory] = useState([]);
    const modalRef = useRef(null); // Reference for the modal
    const [txt,setText]=useState(null)

    useEffect(() => {
        readCategories(setCategories);
        if (showDetails) {
            modalRef.current?.showModal(); // Open modal when showDetails is true
        }
    }, [showDetails]);
    const handleApplication=async ()=>{        
      if(!user) setText("Jelentkezz be jelentekezéshez!")
        else await toggleAplication(selectedRace.id,user.uid)
    }

    useEffect(() => {
        if (categories && selectedRace) {
            setCategory(categories.find(cat => cat.id === selectedRace.kategoria));
        }
    }, [categories, selectedRace]); 

    return (
        <dialog ref={modalRef} id="details" className="modal">
            <div className="modal-box">

                {selectedRace ? (
                    <>
                        <img src={selectedRace.imageUrl.url} alt={selectedRace.palya} className='rounded mb-5' />
                        <div className='flex justify-between py-4 text-slate-700'>
                            <div>
                                <h3 className="font-bold text-xl ">{selectedRace.palya}</h3>
                                <p className="py-2">
                                    Kategória: {category?.nev}
                                </p>
                                <p className=" py-2">
                                    Dátum: {new Date(selectedRace.idopont.seconds * 1000).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <p style={{backgroundColor:category?.color}} className='text-neutral-100 rounded-xl p-2'>{selectedRace.resztvevok.length}/{selectedRace.max}</p>
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
                    <div className="btn text-white" style={{backgroundColor:category?.color}} onClick={() => modalRef.current?.close()}>Bezár</div>
                    </div>
                </div>
            {txt &&<Alerts err={txt}/>}
        </dialog>
    );
}
