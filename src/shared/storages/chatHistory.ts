import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';
import { MessageFormat } from '../utils/getGPTResponse';


type ChatHistory = {
  messages: MessageFormat[]
}

type ChatStorage = BaseStorage<ChatHistory> & {
  saveLocal: (message: MessageFormat) => Promise<void>;
};

const storage = createStorage<ChatHistory>('chatHistory', null, {
  storageType: StorageType.Local,
  liveUpdate: true,
});

const chatHistory: ChatStorage = {
  ...storage,
  saveLocal: async (message) => {
      await storage.set(prev => {

        if (prev === null) {
          prev.messages = []
        } else {
          prev.messages.push(message)
        }
        return prev;
      }
    )
  },
  // TODO: extends your own methods
  // toggle: async () => {
  //   await storage.set(currentTheme => {
  //     return currentTheme === 'light' ? 'dark' : 'light';
  //   });
  // },
};

export default chatHistory;
