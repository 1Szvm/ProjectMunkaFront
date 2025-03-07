import React, { useContext, useEffect, useRef, useState } from 'react';
import { addFutam, readAuthorization, readCategories, updatePost  } from '../utility/crudUtility';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import { useParams } from 'react-router-dom';
import { uploadFile } from '../utility/uploadFile';
import Alerts from './Alerts';

export default function AddNew({addEdit, setAddEdit}) {
    const { user } = useContext(UserContext);
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [admins, setAdmins] = useState(null);
    const params = useParams();
    const [categories, setCategories] = useState(null);    
    const [txt,setText]=useState(null)
    const [erro, setErr] = useState(null);
    const modalRef = useRef(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const [idopont, setIdopont] = useState("");
    const [selectedCateg, setSelectedCateg] = useState("");
    const [palya,setPalya]=useState(null)
    const [max,setMax]=useState(null)
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        readCategories(setCategories);
        readAuthorization(setAdmins);
    }, []);

    useEffect(() => {
        if (typeof addEdit === "object") {
            console.log("edit mode");
            setIsEditMode(true);
            document.getElementById("file").disabled = true;
            modalRef.current?.showModal();
    
            setSelectedCateg(addEdit?.kategoria);
            setValue("track", addEdit?.palya);
            setValue("maxracers", addEdit?.max);
            
            // Ensure idopont is correctly set
            if (addEdit?.idopont?.seconds) {
                const formattedDate = new Date(addEdit.idopont.seconds * 1000).toISOString().split('T')[0];
                setIdopont(formattedDate);
                setValue("date", formattedDate); // Update the form as well
            }
        }
    }, [addEdit, reset, setValue]);
    
    const editPost = (data) => {
        try {
            updatePost(data.id,{...data,idopont: new Date(idopont),kategoria:selectedCateg,max,palya})
            setTimeout(() => modalRef.current?.close(), 800);
            setText("Sikeresen mentés!")
            setIsEditMode(false);
          } catch (error) {
            console.log("update: ",error);
          }
    }
    

    //WHY IS THIS SHIT NOT FUCKING WORKING THIS IS UTTERLY FUCKING RETARDED!!!!!! (I cant belive this shit it was a fucking typo all along)
    const onSubmit = async (data) => {
        try {
            let updatedData = {
                ...data,
                idopont: idopont ? new Date(idopont) : addEdit.idopont, // Keep original if unchanged
                kategoria: selectedCateg,
                max,
                palya
            };
    
            if (typeof addEdit === "object") {
                await updatePost(addEdit.id, updatedData);
                setText("Sikeresen mentve!");
            } else {
                let newRaceData = { ...updatedData, resztvevok: [] };
                let newPostData = { ...newRaceData };
    
                if (data.file?.[0]) {
                    const { url, id } = await uploadFile(data.file[0]);
                    newPostData.imageUrl = { url, id };
                }
    
                await addFutam(newPostData);
                reset({ date: "", maxracers: "", track: "" });
                setPhoto(null);
                setText("Sikeresen hozzáadva!");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setErr("Sikertelen");
        } finally {
            setTimeout(() => modalRef.current?.close(), 800);
        }
    };
    
    
    

    return (
        <div>
            {admins?.some(admin => admin.Ids.includes(user?.uid)) && (
                <div
                    className="fixed bottom-5 right-5 flex justify-center items-center w-16 h-16 rounded-full shadow-lg cursor-pointer transition-transform duration-300 bg-red-600"
                    onClick={()=>setAddEdit(true)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-10 text-white transition-transform duration-300"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </div>
            )}

            <dialog ref={modalRef} id="add" className="modal">
                <div className="modal-box max-h-screen p-6 rounded-2xl shadow-lg">
                    <h3 className="font-bold text-xl text-center mb-4">Verseny létrehozása</h3>
                    <div>
                        <label 
                            className="block font-medium mb-2"
                            htmlFor="category"
                        >
                            Játék kiválasztása
                        </label>
                        <select
                            id="category"
                            className="select w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedCateg}
                            onClick={(e) => {
                                setSelectedCateg(e.target.value);
                            }}
                            {...register('category', { required: 'A kategória kiválasztása kötelező.' })}
                        >
                            <option value="" disabled>Válaszd ki a játékot</option>
                            {categories && categories.map(obj => (
                                <option key={obj.id} value={obj.id} style={{ color: obj.color }}>
                                    {obj.nev}
                                </option>
                            ))}
                        </select>
                        <p className="text-red-600">{errors?.category?.message}</p>


                        <label className="block font-medium mt-4">Pálya neve</label>
                        <input id="track" type="text" placeholder="Pálya neve"
                            className="input w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register('track', { required: 'A név megadása kötelező.' })}
                            onChange={(e) => setPalya(e.target.value)}
                        />
                        <p className="text-red-600">{errors?.track?.message}</p>

                        <label className="block font-medium mt-4">Pálya kép</label>
                        <input
                            disabled={params.id}
                            id="file"
                            type="file"
                            className="file-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("file", params.id ? {} : {
                                required: !params.id,
                                validate: (value) => {
                                    if (!value[0]) return true;
                                    const fileExtension = value[0]?.name.split(".").pop().toLowerCase();
                                    const acceptedFormats = ['jpg', 'png'];
                                    if (!acceptedFormats.includes(fileExtension)) return "Invalid fájl formátum!";
                                    if (value[0].size > 1 * 1000 * 1024) return "Az engedélyezett fájl mérete 1MB";
                                    return true;
                                }
                            })}
                            onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
                        />
                        {photo && <img src={photo} alt="Preview" className="img-thumbnail mt-3" />}
                        <p className="text-red-600">{errors?.file?.message}</p>
                        
                        <label className='block font-medium mt-4'>Versenyzők száma</label>
                        <input 
                            id="maxracers" 
                            type="number" 
                            min="1" max="100"
                            className="input w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("maxracers", { 
                                required: "Minimum 1 versenyző szükséges!", 
                                min: { value: 1, message: "Minimum 1 versenyző szükséges!" } 
                            })}
                            onChange={(e) => setMax(e.target.value)}
                        />
                        {errors.maxracers && <p className="text-red-500 text-sm mt-1">{errors.maxracers.message}</p>}

                        <label className="block font-medium mt-4">Dátum kiválasztása</label>
                        <input id="date" type="date"
                            className="input w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register('date', { required: 'A dátum megadása kötelező.' })}
                            onChange={(e) => setIdopont(e.target.value)
                            }
                        />
                        <p className="text-red-600">{errors?.date?.message}</p>

                        <div className="modal-action flex justify-between mt-6">
                            {!isEditMode && (
                                <div 
                                    id='addBtn'
                                    className="btn bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-lg cursor-pointer"
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    Létrehozás
                                </div>
                            )}
                            {isEditMode && (
                                <div 
                                    id='saveBtn'
                                    className="btn bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg cursor-pointer"
                                    onClick={()=> editPost(addEdit)}
                                >
                                    Szerkesztés mentése
                                </div>
                            )}
                            <div 
                                className="btn text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg cursor-pointer"
                                onClick={() => setAddEdit(false)}
                            >
                                Bezárás
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
            {txt&&<Alerts txt={txt}/>}
        </div>
    );
}
