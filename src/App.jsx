import "./App.css";
import Homepage from "./pages/Homepage";
import Chatpage from "./pages/Chatpage";
import { Route, Routes } from "react-router"
import { loginWallpaper } from "./assets";

const App = () => {
  

  return (
    <div className="App min-h-screen flex bg-cover bg-center" style={{backgroundImage: `url(${loginWallpaper})`}}>
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/chats" element={<Chatpage />} />
        </Routes>
    </div>
  );
}

export default App;