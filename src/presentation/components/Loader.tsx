import { SpinnerCircular } from "spinners-react/lib/esm/SpinnerCircular"

export const Loader = () => {
    return (
        // <div className="flex items-center justify-center">
      <div className="flex items-center justify-center h-screen">

            <SpinnerCircular enabled={true} secondaryColor="transparent" thickness={70} speed={150} size={100} color={"rgb(42, 24, 216)"} className="mr-3 " />

        </div>
    )
}
