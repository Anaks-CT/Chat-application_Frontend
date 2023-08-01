import "./App.css";
import Homepage from "./pages/Homepage";
import Chatpage from "./pages/Chatpage";
import { Route, BrowserRouter } from "react-router-dom";
import { loginWallpaper } from "./assets";

const App = () => {
  

  return (
    <div className="App min-h-screen flex bg-cover bg-center" style={{backgroundImage: `url(${loginWallpaper})`}}>
      <BrowserRouter>
        <Route path="/" component={Homepage} exact />
        <Route path="/chats" component={Chatpage} />

      </BrowserRouter>
    </div>
  );
}

export default App;