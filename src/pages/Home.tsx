import { useState } from "react";
import axios from "axios";

const Home = () => {
    const [result, setResult] = useState<string[] | null>(null);
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    

    const endPoint = 'https://sort-node.vercel.app/api/v1/sort';
    
    const onSubmit = async() => {
        setError('');
        setResult([]);
       if(input){
           axios({
            method:"POST",
            headers:{
                "Content-Type":'application/json'
            },
            url:endPoint,
            data:{
                data:input.toLowerCase()
            }
           }).then(result => {
            
            if(result.status ===200){
                setResult(result.data.word)
            }else{
                setError('Could not retrieve the data')
            }
           }).catch(err => {
            if(err){
                setError('Something went wrong')
            }
           })

       } else{
        setError('Enter a word')
       }
    }
    return (
        <div className="h-[100vh] grid items-center">
            <div className="max-w-[900px] w-[90%] m-auto">
                <p className="text-center p-3">API Demo</p>
                <h3 className="text-3xl font-semibold text-center">Word Sorter</h3>
                <p className="text-center p-3">Enter a word and get its letters sorted</p>
                <div className="grid grid-cols-12 gap-2 w-[500px] m-auto mt-3">
                <div className="md:col-span-8 col-span-12">
                <input type="text" className="border border-gray-300 block p-3 outline-none w-full" placeholder="Enter a word" value={input} onChange={(e) => setInput(e.target.value)}/>
                {error &&<p className="text-red-500">{error}</p>}
                </div>
                <div className="md:col-span-4 col-span-12">
                <button type="button" className="bg-black w-full p-3.5 text-white cursor-pointer" onClick={onSubmit}>Sort</button>
                </div>
                </div>
                {result && result.length > 0 && (
            <div
              className="mt-10 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <p className="text-label text-muted-foreground mb-4 text-center">
                Result
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {result.map((letter, i) => (
                  <span
                    key={i}
                    className="w-10 h-10 flex items-center justify-center border border-border bg-muted text-foreground font-heading text-lg animate-fade-in"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
             
            </div>
          )}
            </div>
        </div>
    )
}

export default Home;