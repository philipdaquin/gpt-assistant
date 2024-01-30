import { 
  // useEffect, 
  useState } from 'react'
import React from 'react';

import { TrashIcon } from '@heroicons/react/24/outline'
import {FaSave} from 'react-icons/fa'
import { useEffect } from 'react';



enum Action { 
  ADD,
  DELETED
}



// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Options: React.FC = () => {
  const [apiKey, setApiKey] = useState('')
  const [message, setMessage] = useState('')


  useEffect(() => {
    chrome.storage.local.get(['apiKey'], function (result) { 
      if (result.apiKey) { 
        setApiKey(result.apiKey)
      } 
    })
  }, [])
  

  const onSubmit = (action: Action) => { 
      if (apiKey !== '' && apiKey.length > 10 && apiKey.length < 100 && apiKey.includes('sk-')) { 
          if (action == Action.ADD) { 
              chrome.storage.local.set({'apiKey' : apiKey}, function () { 
                  console.log('Data saved:', apiKey)
              })
              setMessage("Successfully updated the OpenAI API Key! Don't forget to 📌 on your browser")
              
          } else {
              chrome.storage.local.remove('apiKey', function () { 
                  console.log('Data saved:', apiKey)
              })
              setMessage('API key deleted successfully!')
          }

          setTimeout(() => { 
              setMessage('')
          }, 3000)

      } else { 
          setMessage('Please enter a valid API key.')
      }
     
  }

  return (
      <div className='p-5 rounded-xl bg-white w-fit shadow-2xl drop-shadow-lg'>
          <div className='text-center space-y-2'>
              <h1 className='text-3xl font-bold'>Options</h1>
              <h3 className='text-xs flex justify-center space-x-2 text-center'>
                Enter your  
                <a 
                    href="https://platform.openai.com/api-keys" 
                    className='underline to-blue-400 ml-1 mr-1'
                    target="_blank"
                    rel="noopener noreferrer"
                > OpenAI API key </a>

                below to get started.
              </h3>
          </div>
          <div>
              <div className='flex space-x-3 mt-5'>
                  <input type="text" className='border border-black px-1 py-0 w-full focus:outline-none text-sm' 
                      onChange={(e) => setApiKey(e.target.value)} 
                      value={apiKey}
                      placeholder='Open AI API key'/> 
                  
                  <button onClick={() => onSubmit(Action.ADD)} className='cursor-pointer rounded-lg text-white flex items-center space-x-2 transition-colors duration-200 bg-[#4caf50] px-4 py-3 active:bg-[#2e6f30] hover:bg-[#2e6f30]'>
                      <FaSave height={20} width={20} color='#fff'/>
                      <div className='text-medium font-medium'>
                          Save 
                      </div>
                  </button>
              </div>
              <div className='text-xs mt-2 h-3 text-gray-500 transition-transform duration-300'>
                  {
                      message && (
                          <div className='delete'>
                              {message}
                          </div>
                      )
                  }
              </div>
          </div>

          <button onClick={() => onSubmit(Action.DELETED)} className='cursor-pointer mt-3 rounded-lg transition-colors duration-200 text-white flex  items-center space-x-2 text-lg bg-red-500 w-fit px-3 py-2 active:bg-red-800 hover:bg-red-800'>
              <TrashIcon width={20} height={20} color='#fff' />
              <div className='text-sm'>
                  Delete API Key
              </div>
          </button>


          <p className='text-xs mt-3'>
              Note: Your API key will be only be stored locally on your computer and nowhere else.
          </p>

      </div>
  )
}

export default Options