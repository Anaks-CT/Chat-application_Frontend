import { useToast } from '@chakra-ui/react'

const UseToastify = (message, status) => {
    const toast = useToast()
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

export default UseToastify