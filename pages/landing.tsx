import Image from "next/image";
import Link from "next/link";

const Landing = () => {
    return(
        <>
            <div className="grid h-screen grid-rows-6 place-items-center max-h-screen mt-10 mb-20">
                <span></span>
                {/* <div className="grid grid-rows-4 justify-items-center"> */}
                <Image src="/xfolio.png" alt="logo" width={250} height={250}/>
                <h1 className="font-medium leading-tight text-4xl text-black-600">Tired of juggling portfolio trackers to track your crypto holdings?</h1>
                <h2 className="font-medium leading-tight text-3xl text-black-600">Track <span className='text-red-400'>everything</span> in one place with xFolio.</h2>
                <Link
                    href='/'
                >
                <button className="bg-blue-500 text-2xl hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5 mb-5">Access Your Portfolio</button>

                </Link>
                <a className="font-medium text-blue-500 dark:text-blue-500 hover:underline" href="https://twitter.com/anton42069" rel="noreferrer" target="_blank" >Twitter</a>
                {/* </div> */}
            </div>
        </>
    )
}

export default Landing;