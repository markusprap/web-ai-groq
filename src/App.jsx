import { useState } from 'react'
import { requestToGroqAI} from './utils/groq'
import {Light as SyntaxHiglight} from 'react-syntax-highlighter'
import {darcula} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import './App.css'

function LoadingSpinner() {
  return (
    <div className="spinner">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  )
}

function App() {
  const [data, setData] = useState("")
  const [displayData, setDisplayData] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    // Reset displayData and data
    setDisplayData("");
    setData("");
    
    const ai = await requestToGroqAI(content.value)
    setData(ai);
    setLoading(false);
  
    // Check if ai is not undefined
    if (ai) {
      // Start typing animation
      let i = 0-1;
      const interval = setInterval(() => {
        if (i < ai.length) {
          setDisplayData(prev => prev + ai[i]);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 10);
    }
  }

  return(
    <main className='flex flex-col min-h-[80vh] justify-center items-center max-w-xl w-full mx-auto'>
      <h1 className='text-4xl text-indigo-500 mb-4'>Welcome to Markus's AI Project</h1>
      <form action='submit' className='flex flex-col gap-4 py-4 w-full'>
        <input
         className='py-2 px-4 text-md rounded-md' 
         placeholder='Ketik permintaan disini'
         id='content'
         type='text'
        />
        <button
          onClick={handleSubmit}
          type='submit'
          className='bg-indigo-500 py-2 px-4 font-bold text-white rounded-md'
        >
          {loading ? <LoadingSpinner /> : "Submit"}
        </button>
      </form>
      <div className='max-w-xl w-full mx-auto'>
        {data ? (
          <SyntaxHiglight language='swift' style={darcula} wrapLongLines={true}>
            {displayData.toString()}
          </SyntaxHiglight>
        ) : null}
        
      </div>
      
    </main>
  )
}

export default App
