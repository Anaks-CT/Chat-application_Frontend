import { Box } from "@chakra-ui/layout";
import { ChatState } from "../../context/ChatProvider";
import SingleChat from "../SingleChat";
import { motion } from "framer-motion";
import { slideIn } from "../../utils/motion";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <motion.div variants={slideIn("left", "tween", 0.2, 1)}>
      <Box
        display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
        alignItems="center"
        flexDir="column"
        bg="white"
        w={{ base: "100%", md: "68%" }}
        borderRadius="lg"
        borderWidth="1px"
        backgroundColor={'black'}
        borderColor={"white"}
        p={3}
      >
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /> 
      </Box>

    </motion.div>
  );
};

export default Chatbox;