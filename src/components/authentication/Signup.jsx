import { useState } from "react";
import { Button } from "@chakra-ui/button";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useToast } from "@chakra-ui/react";

const Signup = () => {
  // toggling the password showing
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  // state for all the inputs
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  // const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const [picFromInput, setPicFromInput] = useState()

  // const history = useHistory();
  const navigate = useNavigate()

  const toast = useToast()
  const toastify = (message, status) => {
  return (
    toast({
        title: message,
        status: status,
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
  )
}
  // uploading the image in cloudinary
  // const postDetails = async (pics) => {
  //   setPicLoading(true);
    
  // };

  const submitHandler = async (pics) => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toastify("Please Fill all the Feilds", "warning");
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toastify("Passwords Do Not Match", "warning");
      setPicLoading(false);
      return;
    }
    // console.log(name, email, password, pic);
    try {
      if (pics === undefined) {
        toastify("Please Select an Image!", "warning");
        return;
      }
      console.log(pics);
      if (pics.type === "image/jpeg" || pics.type === "image/png") {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "resortManagemen");
        data.append("cloud_name", "dhcvbjebj");
        fetch("https://api.cloudinary.com/v1_1/dhcvbjebj/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then(async(cloudresponse) => {
            const pic = cloudresponse.url.toString()
            const config = {
              headers: {
                "Content-type": "application/json",
              },
            };
            const { data } = await axios.post(
              "http://localhost:8000/api/user",
              {
                name,
                email,
                password,
                pic,
              },
              config
            );
            console.log(data);
            toastify("Registration Successful", "success");
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/chats");
              
            // setPic(data.url.toString());
            // console.log(data.url.toString());
          })
          .catch((err) => console.log(err))
          .finally(() => setPicLoading(false));
      } else {
        toastify("Please Select an Image!", "warning");
        setPicLoading(false);
        return;
      }
      
    } catch (error) {
        console.log(error)
        toastify(error?.response?.data?.message, "error");
    } finally{
      setPicLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col justify-center pb-5 overflow-hidden">
      <div className="w-full p-6 m-auto bg-white border-t border-blue-600 rounded shadow-lg shadow-blue-800/50 lg:max-w-md">
        <form className="mt-3">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-800">
              Name*
            </label>
            <input
              type="name"
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="email" className="block text-sm text-gray-800">
              Email*
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2">
            <div className="relative">
              <span
                className="absolute text-blue-400 top-9 right-4 cursor-pointer"
                onClick={handleClick}
              >
                {!show ? "Show" : "Hide"}
              </span>
              <label htmlFor="password" className="block text-sm text-gray-800">
                Password*
              </label>
              <input
                type={show ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-2 relative">
              <span
                className="absolute text-blue-400 top-9 right-4 cursor-pointer"
                onClick={handleClick}
              >
                {!show ? "Show" : "Hide"}
              </span>
              <label
                htmlFor="confirmPassword"
                className="block text-sm text-gray-800"
              >
                Confirm Password*
              </label>
              <input
                type={show ? "text" : "password"}
                onChange={(e) => setConfirmpassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="profile" className="block text-sm text-gray-800">
                Profile Pic*
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPicFromInput(e.target.files[0])}
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-6">
              <Button
              onClick={() => submitHandler(picFromInput)}
                background={"blue"}
                color={"white"}
                className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}
                isLoading={picLoading}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
