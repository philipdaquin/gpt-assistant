import React from 'react';
import '@pages/popup/Popup.css';
// import useStorage from '@src/shared/hooks/useStorage';
// import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { BsFillSendFill } from 'react-icons/bs';
import { useState } from 'react';
// import { BsFillSendFill } from "react-icons/bs";




type MessageFormat = { 
  name: string,
  message: string, 
}

enum Models { 
  GPT_35_Turbo = 'GPT-3.5 Turbo',
  GPT4 = 'GPT-4'
}


const Popup = () => {
  // const theme = useStorage(exampleThemeStorage);
  const [modelSelected, setModelSelected] = useState(Models.GPT_35_Turbo)
  const chatMessages: MessageFormat[] = [
    {
      name: 'You',
      message: 'Hello world',
    },
    {
      name: 'AI',
      message: 'Hows it going!'
    },
    {
      name: 'You',
      message: 'Welcome to Open AI',
    },
    {
      name: 'AI',
      message: 'No thats my job!'
    },
    {
      name: 'You',
      message: 'What the hell ✏️🗑️⚙️🎯'
    },
    
    {
      name: 'AI',
      message: 'No thats my job!'
    },
    {
      name: 'You',
      message: 'What the hell ✏️🗑️⚙️🎯'
    },
    
    {
      name: 'AI',
      message: 'No thats my job!'
    },
    {
      name: 'You',
      message: 'What the hell ✏️🗑️⚙️🎯'
    },
    {
      name: 'You',
      message: 'What the hell ✏️🗑️⚙️🎯'
    },
    {
      name: 'You',
      message: 'What the hell ✏️🗑️⚙️🎯'
    },
    {
      name: 'You',
      message: 'What the hell ✏️🗑️⚙️🎯'
    },
    {
      name: 'You',
      message: 'What the hell ✏️🗑️⚙️🎯'
    },
  ]

  const [toggle, setToggle] = useState(true)
  const openDropDown = () => setToggle(!toggle)


  return (
    <div className='flex flex-col  w-full '>
      <div className='flex flex-row justify-between top-0 z-10 fixed w-full bg-gray-300 py-4 px-4 overflow-hidden'>
        <button onClick={openDropDown} className='p-2 px-2 bg-slate-200 w-fit rounded-2xl text-[14px]' 
          title='LLM Engine'>
          🤖 {modelSelected}

           
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

      <div hidden={toggle} className='absolute flex flex-col space-y-1 items-left bg-white w-full text-left' >
              <button className='p-2 text-left ' onClick={() => setModelSelected(Models.GPT_35_Turbo)}>GPT 3.5 Turbo</button>
              <button className='p-2 text-left ' onClick={() => setModelSelected(Models.GPT4)}>GPT-4</button>
            </div>


      {/* Scrollable chats */}
      <div className='pl-4 w-full h-full flex-col items-center justify-center'>
        <div className='overflow-auto max-h-[300px]'>
          {chatMessages.map(({message, name}, idx) => { 
            return (
              <div key={idx} className='p-2 flex-col flex text-left items-start rounded-full w-full  mt-2'>
                <div className='font-bold'>
                  {name}
                </div>
                <div>
                  {message}
                </div>
              </div>
            )
          })}
        </div>
      </div>


      {/* Input fields */}
      <div className='w-full fixed b-full flex flex-row space-x-2 py-4 bottom-0 px-2 bg-slate-100'>
        <input type="text" placeholder='Message ChatGPT...' className='rounded-lg border py-2 border-black px-2  w-full focus:outline-none text-sm '/>
        <div className=' items-center flex justify-center p-2 bg-slate-200 w-10 h-10 rounded-xl' title='Setting'>
            <BsFillSendFill height={10} width={10}/>
        </div>
      </div>
      
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
