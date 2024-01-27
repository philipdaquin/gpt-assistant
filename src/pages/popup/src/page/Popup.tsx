import React from 'react';
import '@pages/popup/Popup.css';
// import useStorage from '@src/shared/hooks/useStorage';
// import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import {BsFillSendFill } from 'react-icons/bs';
import { useState } from 'react';
// import { BsFillSendFill } from "react-icons/bs";

import { FaRobot } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";



type MessageFormat = { 
  name: Role,
  message: string, 
}

enum Models { 
  GPT_35_Turbo = 'gpt-3.5-turbo',
  GPT4 = 'gpt-4'
}

enum Role { 
  AI = 'Ai',
  User = 'You'
}


const OPENAI_URL = "https://api.openai.com/v1/chat/completions"


const Popup = () => {
  // const theme = useStorage(exampleThemeStorage);
  const [modelSelected, setModelSelected] = useState(Models.GPT_35_Turbo)

  const [isSending, setIsSending] = useState(false)
  const tmpMessages: MessageFormat[] = [
    {
      name: Role.User,
      message: 'Hey there!',
    },
    {
      name: Role.AI,
      message: 'Hows it going philip!',
    },
    {
      name: Role.User,
      message: 'Load wise, not now'
    },
    {
      name: Role.AI,
      message: 'good',
    },
   
  ]

  
  const [newMessage, setNewMessage] = useState('')
  const [toggle, setToggle] = useState(true)
  const openDropDown = () => setToggle(!toggle)
  
  const apiKey = ""
  
  const [chatMessages, setChatMessages] = useState<MessageFormat[]>(tmpMessages)
  const sendMessage =  (newMessage, apiKey, modelSelected) => { 
    if (isSending)
    //  Send messages to chat gpt 
    if (!newMessage) return 


    const sampleMessage: MessageFormat = { 
      message: newMessage,
      name: Role
    }

    setChatMessages((prev) => [...prev, sampleMessage])
    
    // return await fetch(OPENAI_URL, { 
    //   method: 'POST', 
    //   headers: {
    //     Authorization: `Bearer ${apiKey}`,
    //     'Content-Type': 'application/json'
    //   }, 
    //   body: JSON.stringify({ 
    //     model: modelSelected,
    //     messages: newMessage
    //   })
    // }).then(async (response) => { 

    //   if (response.ok) { 
        
    //     return await response.json();
    //   } else { 
    //     if (response.status == 401) { 
    //       throw new Error("Looks like your API key is incorrect. Please check your API Key");
    //     } else { 
    //       throw new Error(`Failed to get a response. Status Code: ${response.status}`)
    //     } 
    //   }
  
    // }).catch((e) => { 
    //   console.error(e.message)
    //   chrome.runtime.sendMessage({error: e.message})
    // });


    // const { choices, error } = await response.json();
    // if (response.ok) {
    //   if (choices?.length > 0) {
    //     const newSystemMessageSchema: MessageSchema = {
    //       role: 'system',
    //       content: choices[0].message.content,
    //     };
    //     res.json(newSystemMessageSchema);
    //   } else {
    //     // send error
    //     res.status(500).send('No response from OpenAI');
    //   }
    // } else {
    //   res.status(500).send(error.message);
    // }
  }


  return (
    <div className='flex flex-col  w-full '>
      <div className='flex flex-row justify-between top-0 z-10 fixed w-full bg-gray-300 py-4 px-4 overflow-hidden'>
        
        <div className="relative">
          <button onClick={openDropDown} className='py-2 px-4 flex flex-row items-center  justify-center space-x-3 bg-slate-200 w-fit rounded-2xl text-[14px]' 
            title='LLM Engine'>
            <FaRobot height={20} width={20} color='#000'/> 
            <p>{modelSelected}</p>
          </button>
        </div>

        <div className='flex items-center space-x-2'>
          <button className='p-2 bg-slate-200 w-fit rounded-xl' title='Clear chat'>
            <FaTrash height={20} width={20} color='#000'/>

          </button>
          <button className='p-2 bg-slate-200 w-fit rounded-xl' title='Setting'>
          <FaGear height={20} width={20} color='#000'/>

          </button>
        </div>
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

      <div  className='w-full fixed b-full flex flex-row space-x-2 py-4 bottom-0 px-2 bg-slate-100'>
        <input type="text" 
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder='Message ChatGPT...' 
          className='rounded-lg border py-2 border-black px-2  w-full focus:outline-none text-sm '/>
        <button onClick={() => sendMessage(newMessage, apiKey, modelSelected)} className=' items-center flex justify-center p-2 bg-slate-200 w-10 h-10 rounded-xl' title='Setting'>
            <BsFillSendFill height={10} width={10}/>
        </button>
      </div>
      
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
