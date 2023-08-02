import { Box } from "@chakra-ui/layout";
import { ChatState } from "../../context/ChatProvider";
import SingleChat from "../SingleChat";
import { motion, useAnimation } from "framer-motion";
import { slideIn } from "../../utils/motion";
import { useEffect } from "react";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  // for mounting animation
  const controls = useAnimation();

  useEffect(() => {
    controls.start("show");
  }, [controls]);
  return (
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
        variants={slideIn("left", "tween", 0, 1)}
      initial="hidden"
      animate={controls}
      >
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /> 
      </Box>

  );
};

export default Chatbox;