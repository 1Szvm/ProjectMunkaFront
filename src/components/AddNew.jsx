import React, { useContext, useEffect, useState } from 'react'
import { readAuthorization, readCategories } from '../utility/crudUtility';
import { useForm } from 'react-hook-form'
import { UserContext } from '../context/UserContext';
import { useParams } from 'react-router-dom'

export default function AddNew() {
    const { user } = useContext(UserContext);
    const {register,handleSubmit,formState: { errors },reset,setValue} = useForm()
    const [admins, setAdmins] = useState(null);
    const [categories, setCategories] = useState(null);
    const params=useParams()
    const [loading,setLoading]=useState(false)
    const [uploaded,setUploaded]=useState(false)
    const [photo,setPhoto]=useState(null)
    const [story,setStory]=useState(null)
    const [enableBtn,setEnableBtn]=useState(false)
    const [selectedCateg,setSelectedCateg]=useState(null)
    const [post,setPost]=useState(null)

    useEffect(() => {
    readCategories(setCategories);
    readAuthorization(setAdmins);
    }, []);

    const handleAdd=()=>{
        document.getElementById('add').showModal()
    }
    const handleNewRace=()=>{
        console.log();
        
    }

    useEffect(()=>{
        if(post){
          setValue("title",post.title)
          setSelectedCateg(post.category)
          setStory(post.story)
          setPhoto(post.photo.url)
        }
      },[post])

    const onSubmit=async(data)=>{
        setLoading(true)
        if(params.id){
          try {
            updatePost(params.id,{...data,category:selectedCateg,story})
            setUploaded(true)
            setTimeout(function(){
                document.getElementById('add').hideModal();
            },2000)
          } catch (error) {
            console.log("update: ",error);
          }finally{
            setLoading(false)
          }
        }else{
          let newRaceData={
            ...data,
            idopont:document.getElementById("date").value,
            kategoria:selectedCateg,
            palya:document.getElementById("track").value,
            resztvevok:[]
          }
          console.log(newRaceData);
          
          try {
            const file=data.file[0]
            const {url,id}=file ? await uploadFile(file) : null
            delete newPostData.file
            newPostData={...newRaceData,imageUrl:{url,id}}
            addPost(newPostData)
            setUploaded(true)
            reset()
            setPhoto(null)
            setStory(null)
            setTimeout(function(){
                document.getElementById('add').hideModal();
            },2000)
          } catch (error) {
            console.log(error);
          }finally{
            setLoading(false)
          }
        }
      }

  return (
    <div>
        <div>
            {admins?.some(admin => admin.Ids.includes(user.uid)) && (
            <div
            className={`fixed bottom-20 right-5 flex justify-center items-center w-16 h-16 rounded-full shadow-lg cursor-pointer transition-transform duration-300 bg-red-600`}
            >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`size-10 text-white transition-transform duration-300 `}
                onClick={handleAdd}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            </div>
        )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="post-form">  
            <dialog id="add" className="modal">
            <div className="modal-box max-h-screen p-6 rounded-2xl shadow-lg">
                <h3 className="font-bold text-xl text-center mb-4">Verseny létrehozása</h3>
                
                <label className="block font-medium mb-2">Játék kiválasztása</label>
                <select className="select w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option disabled defaultValue={true}>Válaszd ki a játékot</option>
                    {categories && categories.map(obj => (
                        <option key={obj.id} style={{ color: obj.color }}  onClick={()=>setSelectedCateg(obj.id)}>{obj.nev}</option>
                    ))}
                </select>
                
                <label className="block font-medium mt-4">Pálya neve</label>
                <input id="track" type="text" placeholder="Pálya neve" className="input w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                              {...register('track', { required: 'A név megadása kötelező.' })}
                />
                <p className="text-red-600">{errors?.track?.message}</p>
                
                <label className="block font-medium mt-4">Pálya kép</label>
                <div>
                    <input disabled={params.id} id="file" type="file" className="file-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        {...register("file",params.id?{}:{
                            required:!params.id,
                            validate: (value) => {
                            if (!value[0]) return true
                            const fileExtension = value[0]?.name.split(".").pop().toLowerCase()
                            console.log(fileExtension);
                            const acceptedFormats = ['jpg', 'png']
                            if (!acceptedFormats.includes(fileExtension)) return "Invalid fájl formátum!"
                            if (value[0].size > 1 * 1000 * 1024) return "Az engedélyezett fájl mérete 1MB"
                            return true
                            }
                        })}
                        onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
                    />
                    <p className="text-red-600">{errors?.file?.message}</p>
                    <p className="text-red-600">{errors?.file&&"Fotó megadása kötelező"}</p>
                </div>
                
                <label className="block font-medium mt-4">Dátum kiválasztása</label>
                <input id="date" type="date" className="input w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    {...register('date', { required: 'A dátum megadása kötelező.' })}
                />
                <p className="text-red-600">{errors?.date?.message}</p>
                
                <div className="modal-action flex justify-between mt-6">
                <button className="btn bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-lg" onClick={handleNewRace}>Létrehozás</button>
                <form method="dialog">
                    <button className="btn bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg">Bezárás</button>
                </form>
                </div>
            </div>
            </dialog>
        </form>
        {/*loading && <BarLoader />*/}
        {uploaded && <Alerts txt="Sikeres feltőltés"/>}
        {photo && <img src={photo} alt="Preview" className="img-thumbnail mt-3" />}
    </div>
  )
}