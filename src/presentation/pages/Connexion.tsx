import ButtonSubmit from "../components/Button";
import Input from "../components/Input";
import 'react-toastify/dist/ReactToastify.css';
import useConnexionController from "../hook/useConnexionController";


export default function Connexion() {
    const { onSubmit, register, handleSubmit, errors, loginQuery} = useConnexionController();
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative flex items-center justify-center h-screen bg-center bg-cover"
                style={{
                    backgroundImage: "url('assets/bg.png')",
                }}
                >
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl p-10 bg-center bg-cover rounded-lg shadow-lg md:flex-row"
                style={{
                    backgroundImage: "url('assets/bg.png')",
                }}
                >
                    {/* Left Section */}
                    <div className="p-8 bg-gradient-to-r from-white/30 to-transparent md:w-1/2">
                    <h1 className="text-xl font-bold text-gray-900">
                        Bonjour ! <br />
                        <span className="text-2xl text-green-700">Bon retour sur votre espace personnel !</span>
                    </h1>
                    <p className="mt-4 text-gray-600">
                        Nous sommes ravis de vous retrouver parmi nous.
                    </p>
                    </div>

                    {/* Right Section */}
                    <div className="p-8 bg-white rounded-2xl md:w-1/2">
                    <div className="flex items-center justify-center text-center ">
                        <div>
                        <h2 className="text-3xl font-bold text-center text-green-950 ">Se Connecter</h2>
                        <p className="mb-4 text-sm text-gray-500">
                            Accédez à votre espace personnel !
                        </p>

                        </div>
                    </div>
                    <div className="space-y-4">
                            <label className="block text-gray-700">Email or Phone Numbre</label>
                            <Input 
                                type="email" 
                                {...register("identifier")}
                                placeholder="Enter your email or phone"
                            />
                            {errors.identifier && <span>{errors.identifier.message}</span>}
                    </div>
                    <div>
                            <label className="block mt-4 text-gray-700">Set password</label>

                             <Input type="password" placeholder="Mot de passe"{...register("password")} />
                                    {errors?.password && (
                                        <span className="text-sm text-rose-500 ">
                                            {errors.password.message}
                                         </span>
                                    )}
                            </div>
                        <div>
                        <p className="mt-1 text-sm text-right text-green-700 cursor-pointer hover:underline">
                            Mot de passe oublié ?
                        </p>
                       
                        </div>
                        <div className="w-full mt-4">
                         <ButtonSubmit isForm={true} isLoading={loginQuery.isLoading} > Se connecter </ButtonSubmit>
                         {loginQuery.isError && (
                            <p className="text-red-500">
                            {loginQuery.error?.message || "An unexpected error occurred"}
                            </p>
                        )}
                        </div>
                        <div className="flex items-center justify-between mt-6">
                            <div className="w-full border-b border-gray-300"></div>
                            <span className="px-3 text-gray-500">or</span>
                            <div className="w-full border-b border-gray-300"></div>
                        </div>
                    <div className="flex justify-center space-x-4">
                    <button className="p-2 rounded-full hover:bg-gray-300">
                        <img
                            src="https://www.facebook.com/favicon.ico"
                            alt="Facebook"
                            className="w-5 h-5 mr-3"
                        />
                    </button>
                        <button className="p-2 rounded-full hover:bg-gray-300">
                        <img
                            src="https://www.google.com/favicon.ico"
                            alt="Google"
                            className="w-5 h-5 mr-3"
                            />
                        </button>

                        <button className="p-2 rounded-full hover:bg-gray-300">
                        <img
                            src="https://twitter.com/favicon.ico"
                            alt="Twitter"
                            className="w-5 h-5 mr-3"
                        />
                        </button>
                        
                    </div>
                    </div>
                </div>
                </div>
            );
        
            </form>



        </>
    );
}

