
const Signup = () => {
  return (
    <div className="relative flex flex-col justify-center pb-5 overflow-hidden">
    <div
        className="w-full p-6 m-auto bg-white border-t border-blue-600 rounded shadow-lg shadow-blue-800/50 lg:max-w-md">
        <form className="mt-3">
            <div>
                <label htmlFor="name" className="block text-sm text-gray-800">Name*</label>
                <input type="name"
                    className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />           
            </div>
            <div className="mt-2">
                <label htmlFor="email" className="block text-sm text-gray-800">Email*</label>
                <input type="email"
                    className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />           
            </div>
              <div className="mt-2">
                <div>
                    <label htmlFor="password" className="block text-sm text-gray-800">Password*</label>
                    <input type="password"
                        className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                </div>
                <div className="mt-2">
                    <label htmlFor="confirmPassword" className="block text-sm text-gray-800">Confirm Password*</label>
                    <input type="password"
                        className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                </div>
                <div className="mt-2">
                    <label htmlFor="profile" className="block text-sm text-gray-800">Profile Pic*</label>
                    <input type="file"
                        className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                </div>
                <div className="mt-6">
                    <button
                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        Login
                    </button>
                </div>
                </div>
        </form>
    </div>
</div>
  )
}

export default Signup