
export enum Role { 
  AI = 'system',
  User = 'user',
  Assistant = 'assistant'
}

export enum Models { 
  GPT_35_Turbo = 'gpt-3.5-turbo',
  GPT4 = 'gpt-4'
}

export type MessageFormat = { 
  role: Role,
  content: string, 
}

type GPTTokens = {
  prompt_tokens: number,
  completion_tokens: number, 
  total_tokens: number
}


type GPTChoices = {
  message: MessageFormat,
  logprobs: null;
  finish_reason: string;
  index: number;
};

export type GPTResponse = {
  id: string, 
  object: string,
  created: number, 
  model: string, 
  usage: GPTTokens,
  choices: GPTChoices[]
}

const OPENAI_URL = "https://api.openai.com/v1/chat/completions"

const chatHistory: MessageFormat[] = []

export async function getGPTResponse(
    message: string, 
    apiKey: string, 
    modelSelection: Models
    
    ): Promise<GPTResponse> { 

    chatHistory.push( {
      role: Role.User, 
      content: message
    })
    
      
    return await fetch(OPENAI_URL, { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }, 
        body: JSON.stringify({ 
          model: modelSelection,
          messages: chatHistory
        })
      }).then(async (response) => { 
  
        if (response.ok) { 
     
          const openai = await response.json()
          chatHistory.push( {
            role: Role.Assistant, 
            content: openai.choices[0].message.content
          })
          // console.log(chatHistory)
          chrome.storage.local.set({'chatHistory' : chatHistory}, function () { 
            console.log('ChatHistory saved:', chatHistory)
        })

          return openai
  
        } else { 
          console.error('Error: ', response.statusText)
          const errorResponse = await response.json()
          console.error('Error Details: ', errorResponse)
  
          if (response.status == 401) { 
            throw new Error("Looks like your API key is incorrect. Please check your API Key");
          } else { 
            throw new Error(`Failed to get a response. Status Code: ${response.status}`)
          } 
        }
    
      }).catch((e) => { 
        console.error(e)
      });
  
} 