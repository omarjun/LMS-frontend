import {BsFacebook, BsTwitter, BsInstagram, BsLinkedin} from "react-icons/bs"
import { Link } from "react-router-dom";

function Footer(){
    const currDate = new Date();
    const year = currDate.getFullYear();

    return(
        <>
            <footer className="relative left-0 bottom-0 py-5 sm:px-20 h-[1ovh] flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800">
                <section className="text-lg">
                    Copyright {year} | All rights reserved
                </section>
                <section className="flex items-center justify-center gap-5 text-2xl text-white">
                    <Link className="hover:text-yellow-500 transition-all ease-in-out duration-300">
                        <BsFacebook/>
                    </Link>
                    <Link className="hover:text-yellow-500 transition-all ease-in-out duration-300">
                        <BsInstagram/>
                    </Link>
                    <Link className="hover:text-yellow-500 transition-all ease-in-out duration-300">
                        <BsTwitter/>
                    </Link>
                    <Link className="hover:text-yellow-500 transition-all ease-in-out duration-300">
                        <BsLinkedin/>
                    </Link>
                </section>

            </footer>
        </>
    )
}

export default Footer