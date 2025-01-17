import ButtonSubmit from "../components/Button";
import Input from "../components/Input";
import 'react-toastify/dist/ReactToastify.css';
import useConnexionController from "../hook/useConnexionController.ts";


export default function Connexion() {
    const { onSubmit, register, handleSubmit, errors, loginQuery} = useConnexionController();
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* <div className="bg-gray-100  flex flex-col content-center items-center justify-center h-screen">
                    <div className="bg-white min-w-[40vw] max-w-lg shadow-lg mx-auto py-10 lg:px-20 rounded-md">
                        <div className="text-center	mt-5 flex items-center justify-center	">
                            <h1 className="text-center text-5xl text-green-950 mb-7 font-bold ">Connexion</h1>
                        </div>

                        <Input type="email" placeholder="Email " {...register("email")} />
                        {errors?.email && (
                            <span className="text-sm text-rose-500	">
                    {errors.email.message}
                </span>
                        )}
                        <Input type="password" placeholder="Mot de passe"{...register("password")} />
                        {errors?.password && (
                            <span className="text-sm text-rose-500	">
                    {errors.password.message}
                </span>
                        )}

                        <div className="w-full my-8 ">
                            <ButtonSubmit isForm={true} isLoading={loginQuery.isLoading} > Se connecter </ButtonSubmit>

                        </div>
                    </div>

                </div> */}
                <div className="min-h-screen flex items-center justify-center bg-teal-100">
                    <div className="flex max-w-4xl shadow-lg rounded-lg overflow-hidden bg-white">
                        {/* Left Section */}
                        <div className="flex-1 bg-gradient-to-br from-blue-900 via-teal-500 to-orange-500 p-8 flex flex-col justify-between rounded-br-[15px] rounded-tr-[15px]">
                        <div>
                            <h1 className="text-white font-bold text-2xl mb-4">THEGOOD NETWORK</h1>
                            <h2 className="text-white text-3xl font-semibold">
                            Invite only right now.
                            </h2>
                            <p className="text-white mt-4">
                            10 Million+ people have joined our network. We invite you to join
                            the tribe.
                            </p>
                        </div>
                        <p className="text-white mt-6">
                            Already have an account?{" "}
                            <a href="#" className="underline text-white font-medium">
                            Sign in
                            </a>
                        </p>
                        </div>

                        {/* Right Section */}
                        <div className="flex-1 bg-white p-8">
                        <div className="text-center	mt-5 flex items-center justify-center	">
                            <h1 className="text-center text-5xl text-green-950 mb-7 font-bold ">Connexion</h1>
                        </div>
                        <div className="space-y-4">
                            <div>
                            <label className="block text-gray-700">Email address</label>
                            <Input type="email" placeholder="Email " {...register("email")} />
                        {errors?.email && (
                          <span className="text-sm text-rose-500	">
                          {errors.email.message}
                      </span>
                              )}
                            {/* <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                            /> */}
                            </div>
                            <div>
                            <label className="block text-gray-700">Set password</label>

                            {/* <input
                                type="password"
                                placeholder="Enter password"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                            /> */}
                             <Input type="password" placeholder="Mot de passe"{...register("password")} />
                                    {errors?.password && (
                                        <span className="text-sm text-rose-500	">
                                            {errors.password.message}
                                         </span>
                                    )}
                            </div>
                            {/* <button
                            type="submit"
                            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
                            >
                            Sign up
                            </button> */}
                            <div className="w-full my-8 ">
                              <ButtonSubmit isForm={true} isLoading={loginQuery.isLoading} > Se connecter </ButtonSubmit>

                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            <div className="w-full border-b border-gray-300"></div>
                            <span className="px-3 text-gray-500">or</span>
                            <div className="w-full border-b border-gray-300"></div>
                        </div>
                        <button
                            className="w-full flex items-center justify-center mt-4 py-3 border border-green-500 rounded-lg hover:bg-gray-100 transition"
                        >
                            <img
                            src="https://www.google.com/favicon.ico"
                            alt="Google"
                            className="w-5 h-5 mr-3"
                            />
                            Continue with Google
                        </button>
                        </div>
                    </div>
                    </div>

            </form>



        </>
    );
}

