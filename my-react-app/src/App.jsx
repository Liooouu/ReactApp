function MyButton(){
    return(
        <button className="mt-60 ml-4 px-4 py-2 bg-blue-500 hover:bg-black text-white font-serif transition duration-300">Click Here</button>
    );
}

function MyButton2() {
    return(
        <button className="mt-60 ml-4 px-5 py-2 bg-blue-500 hover:bg-black text-white font-serif transition duration-300">Click Here</button>
    );
}

function AboutPage() {
    return(
        <>
        <h1 className="text-4xl font-bold text-blue-600 text-center">About</h1>
        <p className="text-center">This is Just for practice</p>
        </>
        
    );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-10 bg-gray-100 space-y-6">
        <AboutPage/>
        <div>
        <MyButton/>
        <MyButton2/>
        </div>
    </div>  
  );

}