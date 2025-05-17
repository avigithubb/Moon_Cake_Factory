import React from "react";

function AddItem(){
    return (
        <>
            <a href="/" className="m-auto my-5 bg-black text-white rounded p-3">Home</a>
            <div className="w-[100vw] h-[100vh] m-auto justify-center content-center">
                <form className="w-[40vw] p-20 bg-white rounded flex flex-col m-auto" action="" method="post">
                    <input type="file" className="bg-[#09122C] w-44 h-8 text-white rounded-lg m-auto mt-5"/>
                    <input type="file" className="bg-[#09122C] w-44 h-8 text-white rounded-lg m-auto mt-5" />
                    <input type="file" className="bg-[#09122C] w-44 h-8 text-white rounded-lg m-auto mt-5" />
                    <input type="file" className="bg-[#09122C] w-44 h-8 text-white rounded-lg m-auto mt-5" />
                    <input type="file" className="bg-[#09122C] w-44 h-8 text-white rounded-lg m-auto mt-5" />
                    <input type="text" className="border-t-white border-x-white rounded-r px-4 py-2 w-[80%] m-auto text-center" placeholder="Product Name"/>
                    <input type="text" className="border-t-white border-x-white rounded-r px-4 py-2 w-[80%] m-auto text-center" placeholder="Product Description"/>
                    <input type="text" className="border-t-white border-x-white rounded-r px-4 py-2 w-[80%] m-auto text-center" placeholder="price"/>
                    <input type="text" className="border-t-white border-x-white rounded-r px-4 py-2 w-[80%] m-auto text-center" placeholder="rating"/>
                    <input type="text" className="border-t-white border-x-white rounded-r px-4 py-2 w-[80%] m-auto text-center" placeholder="Key Features(comma saparated values)"/>

                    <input type="submit" className="bg-[#09122C] w-20 h-10 text-white rounded-lg m-auto mt-10" value="Add" />
                </form>
            </div>
        </>
    )
}

export default AddItem;