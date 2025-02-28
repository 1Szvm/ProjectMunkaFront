import React, { useContext, useEffect, useRef, useState } from 'react';
import { addFutam, readAuthorization, readCategories  } from '../utility/crudUtility';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import { useParams } from 'react-router-dom';
import { uploadFile } from '../utility/uploadFile';
import Alerts from './Alerts';

export default function AddNew() {
    const { user } = useContext(UserContext);
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [admins, setAdmins] = useState(null);
    const [categories, setCategories] = useState(null);
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [story, setStory] = useState(null);
    const [selectedCateg, setSelectedCateg] = useState("");
    const [post, setPost] = useState(null);
    const [txt,setText]=useState(null)
    const modalRef = useRef(null);

    useEffect(() => {
        readCategories(setCategories);
        readAuthorization(setAdmins);
    }, []);

    const handleAdd = () => {
        modalRef.current?.showModal();
    };

    const onSubmit = async (data) => {
        setLoading(true);
    
        if (params.id) {
            try {
                await updatePost(params.id, { ...data, category: selectedCateg, story });
                setUploaded(true);
                setTimeout(() => navigate("/posts/"), 2000);
            } catch (error) {
                console.log("update: ", error);
            } finally {
                setLoading(false);
            }
        } else {
            try {
                let newRaceData = {
                    ...data,
                    idopont: new Date(data.date || document.getElementById("date")?.value), // Prefer form data if available
                    kategoria: selectedCateg,
                    szin: categories.find(cat => cat.id === selectedCateg)?.color,
                    max: data.maxracers || document.getElementById("maxracers")?.value,
                    palya: data.track || document.getElementById("track")?.value,
                    resztvevok: [],
                };
    
                console.log(newRaceData);
    
                let newPostData = { ...newRaceData };
                const file = data.file?.[0];
    
                if (file) {
                    const { url, id } = await uploadFile(file);
                    photo = { url, id };
                }
    
                await addFutam(newPostData); // Ensure this is awaited
                setUploaded(true);
                reset({ date: "", maxracers: "", track: "" }); // Reset with default values if needed
                setPhoto(null);
                setStory(null);
                setText("Sikeresen hozzáadva!")
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
            setTimeout(() => modalRef.current?.close(), 1500);
        }
    };
    

    return (
        <div>
            {admins?.some(admin => admin.Ids.includes(user?.uid)) && (
                <div
                    className="fixed bottom-5 right-5 flex justify-center items-center w-16 h-16 rounded-full shadow-lg cursor-pointer transition-transform duration-300 bg-red-600"
                    onClick={handleAdd}
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

                    {/* Removed the <form> tag, instead using handleSubmit for custom submit */}
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
                        />
                        {errors.maxracers && <p className="text-red-500 text-sm mt-1">{errors.maxracers.message}</p>}

                        <label className="block font-medium mt-4">Dátum kiválasztása</label>
                        <input id="date" type="date"
                            className="input w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register('date', { required: 'A dátum megadása kötelező.' })}
                        />
                        <p className="text-red-600">{errors?.date?.message}</p>

                        <div className="modal-action flex justify-between mt-6">
                            <div 
                                className="btn bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-lg cursor-pointer"
                                onClick={handleSubmit(onSubmit)}  // Triggering the submission with handleSubmit
                            >
                                Létrehozás
                            </div>
                            <div 
                                className="btn text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg cursor-pointer"
                                onClick={() => modalRef.current?.close()}
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
