import { Link } from "react-router-dom";

function Landing(){
    return(
        <div className=" flex flex-col flex-auto justify-center items-center font-poppins ">
            <h1 className="font-bold text-xl md:text-4xl mb-1 font-roboto">NOTESCAPE</h1>
            <p className="  text-sm md:text-lg my-6 w-[65%] text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras feugiat, justo quis dictumconsectetur adipiscing elit. Cras feugiat, justo quis dictum</p>
            <Link to="/note"><button className="mt-6 border-2 border-solid border-balck rounded-3xl h-14 w-32 bg-slate-200 text-md md:text-lg">Get Started!</button></Link>
        </div>
    );
}

export default Landing