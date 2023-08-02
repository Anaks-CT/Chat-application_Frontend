import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon, ArrowRightIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useState } from "react";
// import { useHistory } from "react-router";
import {useNavigate} from 'react-router-dom'
import ProfileModal from "./ProfileModal";
import UserListItem from "../userAvatar/UserListItem";
import ChatLoading from "./ChatLoading";
import { ChatState } from "../../context/ChatProvider";
import { getSender } from "../../config/ChatLogic";
import NotificationBadge from "react-notification-badge/lib/components/NotificationBadge";
import { Effect } from "react-notification-badge";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats
  } = ChatState();
  // accessing data from vaalio store


  // const history = useHistory();
  const navigate = useNavigate()

  const toast = useToast();


  const toastify = (message, status) => {
  return (
    toast({
        title: message,
        status: status,
        duration: 5000,
        isClosable: true,
        position: "top-left",
      })
  )
}

  // logout function
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  // searching all the users in the side bar
  const handleSearch = async () => {
    if (!search) {
        toastify("Please Enter something in search", "warning")
      return;
    }
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`https://chit-chat-6oao.onrender.com/api/user?search=${search}`, config);

      setSearchResult(data);
    } catch (error) {
        toastify("Failed to Load the Search Results", "error")
    } finally {
      setLoading(false);
    }
  };


  const { isOpen, onOpen, onClose } = useDisclosure();

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`https://chit-chat-6oao.onrender.com/api/chat`, { userId }, config);
      console.log(data)
      if(chats){
        if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      console.log(error)
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
        color={"white"}
        backgroundColor={"black"}
        className="flex justify-between items-center bg-white px-10 py-5"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen} px={4} backgroundColor={"#36454f"} padding={"3"} className="rounded">
            <i className="fas fa-search sm:hidden block"><ArrowRightIcon/></i>
            <Text display={{ base: "none", md: "flex" }} >
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans" letterSpacing={3} >
          Chit-Chat
        </Text>
        <div>
          <Menu
          >
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2} bg={"black"}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  color={"black"}
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                  
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} bg="white" color="black" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList backgroundColor={"black"} >
              <ProfileModal user={user}>
                <MenuItem _hover={"blue"} backgroundColor={"black"}>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler} backgroundColor={"black"} color={"red"}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen} >
        <DrawerOverlay />
        <DrawerContent backgroundColor={"black"}>
          <DrawerHeader borderBottomWidth="1px" color={"white"} dispaly="flex" justifyContent={"center"}>Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2} >
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                color={"white"}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                  _hover={{ bg: "white", svg: { fill: "black" } }}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
