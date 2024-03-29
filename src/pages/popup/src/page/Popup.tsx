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
import { MessageFormat, Models, Role, getGPTResponse } from '@root/src/shared/utils/getGPTResponse';
import { useEffect } from 'react';
// import { getStorageData } from '@root/src/shared/utils/getStorageData';
// import useStorage from '@root/src/shared/hooks/useStorage';
// import chatHistory from '@root/src/shared/storages/chatHistory';
// import { useEffect } from 'react';
// import useStorage from '@root/src/shared/hooks/useStorage';
import Loader from 'react-loader-spinner'
import { useRef } from 'react';


const Popup = () => {
  

  const [modelSelected, 
    setModelSelected
  ] = useState(Models.GPT_35_Turbo)

  const [apiKey, setApiKey] = useState('')


  useEffect(() => {
    chrome.storage.local.get(['apiKey'], function (result) { 
      if (result.apiKey) { 
        setApiKey(result.apiKey)
      } 
    })
  }, [])
  
  const [newMessage, setNewMessage] = useState('')
  const [toggle, setToggle] = useState(false)
  const openDropDown = () => setToggle(!toggle)
  const [loading, setLoading] = useState(false)

  const openSettings = () => chrome.runtime.openOptionsPage()
  const [chatMessages, setChatMessages] = useState<MessageFormat[]>([])

  useEffect(() => {
    chrome.storage.local.get(["chatHistory"], function (result) { 

      console.log("Loaded messages", result)

      const history = result.chatHistory || [] 
      console.log(history)
      if (history.length > 0) { 
        setChatMessages(history)
        
      }
    })
  }, [])
  
  const clearHistory = () =>  {
    chrome.storage.local.set({'chatHistory' : []}, function () { 
      console.log('Deleted ChatHistory')
      setChatMessages([])
      chrome.runtime.reload()
    })
  }

  const sendResponse = async (newMessage, apiKey, modelSelected) => {

    // Set loading state to `True`
    setLoading(true)
    // Send `newMessage` to Open AI and get a response
    const response: MessageFormat = 
      await getGPTResponse(newMessage, apiKey, modelSelected)
        .then((response) => {

          if (!response.choices || response.choices.length === 0) return null
          const { choices } = response 
          const chatResponse: MessageFormat = { 
            role: Role.AI,
            content: choices[0].message.content
          }
          return chatResponse
        })
        .catch((e) => {
          console.error(e)
          return null
        })

    // Add Open AI's response to chat list
    setChatMessages((prev) => [...prev, response])
    // chrome.storage.local.set({chatHistory: chatMessages})
    // Reset Loading State to default
    setLoading(false)
  }


  const handleSubmit = (e) => { 
    e.preventDefault();
    // Send message to chat
    sendResponse(newMessage, apiKey, modelSelected)
    // Reset Input fields 
    setNewMessage('')
  }

  const chatContainer = useRef(null)
  useEffect(() => { 
    // scrollToBottom()
    if (chatMessages.length) { 
      chatContainer.current?.scrollIntoView(({
        behavior: "smooth",
        block: 'end'
      }))
    }
  }, [chatMessages])


  return (
    <div className='flex flex-col  w-full '>

      <div className='flex shadow-md flex-row justify-between top-0 z-10 fixed w-full bg-gray-300 py-4 px-4 overflow-hidden'>
        <div className="relative">
          <button onClick={openDropDown} 
            className='hover:bg-gray-400 py-2 w-36 flex  flex-row items-center ring-2 ring-slate-400  
              shadow-md justify-center space-x-3 bg-slate-200 rounded-2xl text-[14px]' 
            title='LLM Engine'>
            <FaRobot height={20} width={20} color='#000'/> 
            <p className='uppercase'>{modelSelected}</p>
          </button>
        </div>
        <div className='flex items-center space-x-2'>
          <button onClick={clearHistory} className='p-4 bg-slate-200  hover:bg-gray-400 w-fit rounded-2xl' title='Clear chat'>
            <FaTrash height={20} width={20} color='#000'/>
          </button>
          <button onClick={openSettings} className='p-4 bg-slate-200  hover:bg-gray-400 w-fit rounded-2xl' title='Setting'>
            <FaGear height={20} width={20} color='#000'/>
          </button>
        </div>
      </div>


      {/* Chat History */}
      <div className='pl-4 pt-4 w-full h-full flex-col items-center justify-center relative top-16'>
        <div  className='overflow-auto max-h-[240px]'>
          {chatMessages.map(({content, role}, idx) => { 
            return (
              <div key={idx} 
                  className={` pr-4 py-2 text-wrap space-y-1  flex-col flex text-left items-start rounded-xl w-fit   mt-2`}>
                <div className='font-bold'>
                  {role === Role.AI ? 'AI' : 'You'}
                </div>
                <div>
                  {content}
                </div>
              </div>
            )
          })}
          <div ref={chatContainer}></div>
        </div>
      </div>

      
      {
        toggle && (
          <div className='w-36  flex py-2 absolute top-14 flex-col space-y-2 px-2  left-4 rounded-2xl uppercase
            bg-white z-50  h-fit text-sm shadow-md drop-shadow-md'>
            <button onClick={() => setModelSelected(Models.GPT_35_Turbo)} 
              className='py-2 hover:bg-slate-200 rounded-xl px-2 cursor-pointer text-left uppercase'>{Models.GPT_35_Turbo}</button>
            <button onClick={() => setModelSelected(Models.GPT4)} 
              className='py-2 hover:bg-slate-200 rounded-xl px-2 cursor-pointer text-left uppercase'>{Models.GPT4}</button>
          </div>
        )
      }

      {/* Input fields */}
      <form onSubmit={handleSubmit} className='w-full fixed b-full flex flex-row space-x-2 py-4 bottom-0 px-2 bg-slate-100'>
        <input type="text" 
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={`${loading ? 'Waiting for response...' : 'Message ChatGPT...' }`}
          value={newMessage}
          disabled={loading}
          className='rounded-lg border py-2 border-black px-2  w-full focus:outline-none text-sm '/>
        <button 
          type='submit' 
          className=' items-center flex justify-center p-2 bg-slate-200 hover:bg-gray-400 w-10 h-10 rounded-xl' 
          title='Send'
          >

            {
              loading ? (
                <Loader type="BallTriangle" color="black" height={20} width={20} />
              ) : (
                <BsFillSendFill height={10} width={10}/>
              )
            }

        </button>

      </form>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
