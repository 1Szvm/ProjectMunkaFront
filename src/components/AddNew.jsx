import React, { useContext, useEffect, useRef, useState } from 'react';
import { addFutam, readAuthorization, readCategories, updatePost } from '../utility/crudUtility';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Alerts from './Alerts';
import { UserContext } from '../context/userContext';
import { uploadFile } from '../utility/backendHandling';

export default function AddNew({ addEdit, setAddEdit }) {
    const { user } = useContext(UserContext);
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [admins, setAdmins] = useState(null);
    const params = useParams();
    const [categories, setCategories] = useState(null);
    const [txt, setText] = useState(null);
    const [err, setErr] = useState(null);
    const modalRef = useRef(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const [idopont, setIdopont] = useState("");
    const [selectedCateg, setSelectedCateg] = useState("");
    const [palya, setPalya] = useState("");
    const [max, setMax] = useState(1);
    const [photo, setPhoto] = useState("");

    useEffect(() => {
        readCategories(setCategories);
        readAuthorization(setAdmins);
    }, []);

    useEffect(() => {
        if (addEdit === false) {
            setIsEditMode(false);
            modalRef.current?.close();
            document.getElementById("file").disabled = false;
            reset();
            setPhoto(null);
            setSelectedCateg("");
            setPalya("");
            setMax(1);
            setIdopont("");
        } 
        if (addEdit === true) {
            setIsEditMode(false);
            reset();
            modalRef.current?.showModal();
        }
        if (typeof addEdit === "object") {
            setIsEditMode(true);
            setPhoto(addEdit?.imageUrl.url)
            setSelectedCateg(addEdit?.kategoria);
            setPalya(addEdit?.palya);
            setMax(addEdit?.max);
            setIdopont(new Date(addEdit?.idopont.seconds * 1000).toISOString().split('T')[0]);
            document.getElementById("file").disabled = true;
            modalRef.current?.showModal();

            setValue('track', addEdit?.palya);
            setValue('maxracers', addEdit?.max);
            setValue('date', new Date(addEdit?.idopont.seconds * 1000).toISOString().split('T')[0]);
        }
        
    }, [addEdit, reset, setValue]);


    const onSubmit = async (data) => {
        if(isEditMode){
            try {
                updatePost(addEdit.id, {
                    ...data,
                    idopont: new Date(data.date),
                    kategoria: data.category,  
                    max: data.maxracers,
                    palya: data.track
                });
                setText("Sikeresen mentés!");
                setTimeout(() => modalRef.current?.close(), 800);
            } catch (error) {
                console.log("update error: ", error);
                setErr("Sikertelen");
            } finally {
                setAddEdit(false);
            }
        }else{
            try {
                let newRaceData = {
                    ...data,
                    idopont: new Date(idopont),
                    kategoria: selectedCateg,
                    max,
                    palya,
                    resztvevok: [],
                };
                let newPostData = { ...newRaceData };
                const file = data.file?.[0];
                if (file) {
                    const { url, id } = await uploadFile(file);
                    newPostData.imageUrl = { url, id };
                }
                await addFutam(newPostData);
                reset({ date: "", maxracers: "", track: "" });
                setPhoto(null);
                setText("Sikeresen hozzáadva!");
            } catch (error) {
                console.error("Error submitting form:", error);
                setErr("Sikertelen");
            } finally {
                setTimeout(() => modalRef.current?.close(), 800);
            }
        }
    };

    return (
        <div>
            {admins?.some(admin => admin.Ids.includes(user?.uid)) && (
                <div
                    className="fixed bottom-5 right-5 flex justify-center items-center w-16 h-16 rounded-full shadow-lg cursor-pointer transition-transform duration-300 bg-rose-600"
                    onClick={() => setAddEdit(true)}
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
            <div className="modal-box max-h-screen p-6 rounded-2xl shadow-lg bg-emerald-600">
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
                        value={palya}
                    />
                    <p className="text-red-600">{errors?.track?.message}</p>

                    <label className="block font-medium mt-4">Pálya kép</label>
                    <input
                        disabled={params.id}
                        id="file"
                        type="file"
                        className="file-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("file", {
                            validate: (value) => {
                                if (isEditMode) return true; // Skip validation when editing
                                if (!value[0]) return "Kép feltöltése kötelező!"; // Show error if missing in create mode
                                const fileExtension = value[0]?.name.split(".").pop().toLowerCase();
                                const acceptedFormats = ["jpg", "png"];
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
                        value={max}
                    />
                    {errors.maxracers && <p className="text-red-500 text-sm mt-1">{errors.maxracers.message}</p>}

                    <label className="block font-medium mt-4">Dátum kiválasztása</label>
                    <input id="date" type="date"
                        className="input w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register('date', { required: 'A dátum megadása kötelező.' })}
                        onChange={(e) => setIdopont(e.target.value)
                        }
                        value={idopont}
                    />
                    <p className="text-red-600">{errors?.date?.message}</p>

                    <div className="modal-action flex justify-between mt-6">
                        <div 
                            id='addBtn'
                            className={`btn text-white px-4 py-2 rounded-lg cursor-pointer ${isEditMode?"bg-blue-600 hover:bg-blue-700":"bg-green-600 hover:bg-green-700"}`}
                            onClick={()=>handleSubmit(onSubmit)()}
                        >
                            {isEditMode?"Szerkesztés mentése":"Létrehozás"}
                        </div>
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
        {err&&<Alerts err={err}/>}
    </div>
    );
}
