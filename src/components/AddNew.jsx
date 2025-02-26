import React, { useContext, useEffect, useRef, useState } from 'react';
import { readAuthorization, readCategories } from '../utility/crudUtility';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import { useParams } from 'react-router-dom';

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
    const [selectedCateg, setSelectedCateg] = useState(null);
    const [post, setPost] = useState(null);

    const modalRef = useRef(null); // Reference for the modal

    useEffect(() => {
        readCategories(setCategories);
        readAuthorization(setAdmins);
    }, []);

    useEffect(() => {
        if (post) {
            setValue("title", post.title);
            setSelectedCateg(post.category);
            setStory(post.story);
            setPhoto(post.photo.url);
        }
    }, [post, setValue]);

    const handleAdd = () => {
        modalRef.current?.showModal();
    };

    const handleNewRace = () => {
        console.log();
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            if (params.id) {
                await updatePost(params.id, { ...data, category: selectedCateg, story });
                setUploaded(true);
            } else {
                let newRaceData = {
                    ...data,
                    idopont: document.getElementById("date").value,
                    kategoria: selectedCateg,
                    palya: document.getElementById("track").value,
                    resztvevok: [],
                };

                console.log(newRaceData);

                const file = data.file[0];
                let newPostData = { ...newRaceData };

                if (file) {
                    const { url, id } = await uploadFile(file);
                    newPostData.imageUrl = { url, id };
                }

                addPost(newPostData);
                setUploaded(true);
                reset();
                setPhoto(null);
                setStory(null);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setTimeout(() => {
                modalRef.current?.close();
            }, 2000);
        }
    };

    return (
        <div>
            {admins?.some(admin => admin.Ids.includes(user?.uid)) && (
                <div
                    className="fixed bottom-20 right-5 flex justify-center items-center w-16 h-16 rounded-full shadow-lg cursor-pointer transition-transform duration-300 bg-red-600"
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

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className="block font-medium mb-2">Játék kiválasztása</label>
                        <select
                            className="select w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setSelectedCateg(e.target.value)}
                        >
                            <option disabled defaultValue={true}>Válaszd ki a játékot</option>
                            {categories && categories.map(obj => (
                                <option key={obj.id} value={obj.id} style={{ color: obj.color }}>
                                    {obj.nev}
                                </option>
                            ))}
                        </select>

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
                        <p className="text-red-600">{errors?.file?.message}</p>

                        <label className="block font-medium mt-4">Dátum kiválasztása</label>
                        <input id="date" type="date"
                            className="input w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register('date', { required: 'A dátum megadása kötelező.' })}
                        />
                        <p className="text-red-600">{errors?.date?.message}</p>

                        <div className="modal-action flex justify-between mt-6">
                            <div type="submit" className="btn bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-lg">
                                Létrehozás
                            </div>
                            <div type="button" className="btn bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg" onClick={() => modalRef.current?.close()}>
                                Bezárás
                            </div>
                        </div>
                    </form>
                </div>
            </dialog>

            {uploaded && <p className="text-green-500">Sikeres feltöltés!</p>}
            {photo && <img src={photo} alt="Preview" className="img-thumbnail mt-3" />}
        </div>
    );
}
