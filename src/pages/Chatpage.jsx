import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import Chatbox from "../components/UI/Chatbox";
import SideDrawer from '../components/UI/SideDrawer'
import MyChats from "../components/MyChats";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();  

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" borderColor={'black'} >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );  
};

export default Chatpage;