import React from 'react';
import '@pages/popup/Popup.css';
// import useStorage from '@src/shared/hooks/useStorage';
// import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { BsFillSendFill } from 'react-icons/bs';
// import { BsFillSendFill } from "react-icons/bs";



const Popup = () => {
  // const theme = useStorage(exampleThemeStorage);

  const chatMessages = [
    'Hello world',
    'Welcome to Open AI',
    'What the hell ✏️🗑️⚙️🎯'
  ]


  return (
    <div className='flex flex-col'>
      <div className='flex flex-row justify-between bg-gray-400 py-4 px-4'>
        <button className='p-2 px-2 bg-slate-200 w-fit rounded-2xl text-[14px]' title='LLM Engine'>
          🤖 GTP-3.50-Turbo (fastest)
        </button>

        <div className='flex items-center space-x-2'>
          <button className='p-2 bg-slate-200 w-fit rounded-xl' title='Clear chat'>
            🗑️
          </button>
          <button className='p-2 bg-slate-200 w-fit rounded-xl' title='Setting'>
            ⚙️
          </button>
        </div>
      </div>

      <div className='px-4 w-full h-full'>
        <div className=''>
          {chatMessages.map((f, idx) => { 
            return (
              <div key={idx} className='p-4 rounded-full w-fit bg-green-400 mt-2'>
                {f}
              </div>
            )
          })}
        </div>
      </div>
      <div className='w-full b-full flex flex-row space-x-2 absolute bottom-3 px-2'>
        <input type="text" placeholder='Message ChatGPT...' className='rounded-lg border py-2 border-black px-2  w-full focus:outline-none text-sm '/>
        <div className=' items-center flex justify-center p-2 bg-slate-200 w-10 h-10 rounded-xl' title='Setting'>
            <BsFillSendFill height={10} width={10}/>
        </div>
      </div>
      
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
