import Reac, {useState, useEffect} from "react";
import { useAuth } from "../context/AuthContext";
import profile from "../assets/profile.png";
import Cookies from "universal-cookie";
import HomeIcon from '@mui/icons-material/Home';


const cookies = new Cookies();

function Profile(){

    const { auth, setAuth } = useAuth();
     const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: ''
    });

    const [editMode, setEditMode] = useState({
        username: false,
        email: false,
        phone: false
    });

    console.log(auth.phone)

    useEffect(() => {
        if (auth) {
        setFormData({
            username: auth.username || '',
            email: auth.email || '',
            phone: auth.phone || ''
        });
        }
    }, [auth]);

    const handleEditToggle = (field) => {
        setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleChange = (e) => {
        console.log(e.target.name);
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async () => {
        try {
        const res = await fetch("/myapp/update-profile/", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": cookies.get("csrftoken")
            },
            credentials: "same-origin",
            body: JSON.stringify(formData)
        });

        const data = await res.json();
        if (data.message === "success") {
            alert("Profile updated successfully!");
            setEditMode({ username: false, email: false, phone: false });
        } else {
            alert("Failed to update profile.");
        }
        } catch (err) {
        console.error(err);
        }
    };


    function handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
      
        const formData = new FormData();
        formData.append("profile_pic", file);
      
        fetch("/myapp/upload-profile-pic/", {
          method: "POST",
          body: formData,
          credentials: "same-origin", // to maintain session
          headers: {
            "X-CSRFToken": cookies.get("csrftoken"), // add your CSRF token logic
          },
        })
          .then(res => res.json())
          .then(data => {
            console.log("Upload success:", data);
            // Update state with new image
            setAuth(prev => ({
              ...prev,
              profile_image: data.profile_pic_url,
            }));
          })
          .catch(err => console.error("Upload error:", err));
      }

    return (
        <>
        <a href="/" className="rounded-full bg-transparent lg:bg-white w-12 h-12 justify-center content-center float-none lg:float-right mt-10 mx-20"><HomeIcon /></a>
        <div className="m-auto content-center justify-center text-center w-[100vw]">
            <div className="h-[100vh] w-[80vw] lg:w-[40vw] m-auto content-center">
 
                <div className="border-b-2 block md:flex flex-col content-center justify-center">

                <div className="m-auto w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
                    <div className="flex justify-between">
                    <span className="text-xl m-auto font-semibold block">User's Profile</span>
                    </div>
                    <div className="w-full p-8 mx-2 flex flex-col justify-center">
                        <img id="showImage" className="rounded-full max-w-xs w-40 h-40 items-center border m-auto" src={auth.profile_image ? `http://localhost:8000/myapp${auth.profile_image}` : profile} alt="ImageUpload" />  
                        <label htmlFor="profile-upload" className="mt-2 cursor-pointer inline-block text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800">Edit</label>
                        <input id="profile-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden"/>                        
                    </div>
                </div>
                
                <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md m-auto border-blue-400" style={{margin: "auto", marginTop: "2rem"}}>
                    <div className="rounded  shadow p-6">
                    <div className="pb-6">
                        <label className="text-left font-semibold text-gray-700 block pb-1">Name</label>
                        <div className="flex">
                            <input
                            name="username"
                            className="border rounded-r px-4 py-2 w-full"
                            type="text"
                            onChange={handleChange}
                            value={formData.username}
                            />
                            <button onClick={() => handleEditToggle('username')} className="mt-2 mx-5 text-md font-bold text-white bg-gray-700 rounded px-5 py-2 hover:bg-gray-800">
                            {editMode.username ? "Cancel" : "Edit"}
                            </button>
                        </div>
                    </div>
                   <div className="pb-4">
                        <label className="text-left font-semibold text-gray-700 block pb-1">Email</label>
                        <div className="flex">
                            <input
                            name="email"
                            className="border rounded-r px-4 py-2 w-full"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            />
                            <button onClick={() => handleEditToggle('email')} className="mt-2 mx-5 text-md font-bold text-white bg-gray-700 rounded px-5 py-2 hover:bg-gray-800">
                            {editMode.email ? "Cancel" : "Edit"}
                            </button>
                        </div>
                    </div>
                    <div className="pb-4">
                        <label className="text-left font-semibold text-gray-700 block pb-1">Phone Number</label>
                        <div className="flex">
                            <input
                            name="phone"
                            className="border rounded-r px-4 py-2 w-full"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            />
                            <button onClick={() => handleEditToggle('phone')} className="mt-2 mx-5 text-md font-bold text-white bg-gray-700 rounded px-5 py-2 hover:bg-gray-800">
                            {editMode.phone ? "Cancel" : "Edit"}
                            </button>
                        </div>
                    </div>

                    {/* Save Button */}
                    {(editMode.username || editMode.email || editMode.phone) && (
                    <button onClick={handleSave} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                        Save Changes
                    </button>
                    )}
                    
                    </div>
                </div>

                </div>

            </div>
        </div>
        </>
        )
}

export default Profile;