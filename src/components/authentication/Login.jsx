import { Button } from '@chakra-ui/react'

const Login = () => {
  return (
    <div className="relative flex flex-col justify-center pb-5 overflow-hidden">
    <div
        className="w-full p-6 m-auto bg-white border-t border-blue-600 rounded shadow-lg shadow-blue-800/50 lg:max-w-md">
        <form className="mt-3">
            <div>
                <label htmlFor="email" className="block text-sm text-gray-800">Email*</label>
                <input type="email"
                    className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />           
            </div>
            <div className="mt-4">
                <div>
                    <label htmlFor="password" className="block text-sm text-gray-800">Password*</label>
                    <input type="password"
                        className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                </div>
                <a href="#" className="text-xs text-gray-600 hover:underline">Forget Password?</a>
                <div className="mt-6">
                <Button
                background={"blue"}
                color={"white"}
                className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}
              >
                Sign Up
              </Button>
                </div>
                </div>
        </form>
        <p className="mt-8 text-xs font-light text-center text-gray-700"> Don't have an account? <a href="#"
                className="font-medium text-blue-600 hover:underline">Sign up</a></p>
    </div>
</div>
  )
}

export default Login