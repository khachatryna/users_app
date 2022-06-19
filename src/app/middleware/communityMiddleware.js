import { createListenerMiddleware } from '@reduxjs/toolkit';
import { getStorage, addStorage } from '../../features/community/communityServices';

import  communityReducer, {
    add,
    remove,
    getCommunity
} from './../../features/community/communitySlice'

export const communityMiddleware = createListenerMiddleware()

communityMiddleware.startListening({
  actionCreator: add,
  effect: async (action) => {
    const list = JSON.parse(JSON.stringify(getStorage()))
    list.push(action.payload)
    addStorage(list)
  },
})
communityMiddleware.startListening(
{
    actionCreator: remove,
    effect: async (action, listenerApi) => {
      let list = JSON.parse(JSON.stringify(getStorage()))
      const newList = list.filter(username => username !== action.payload )
      listenerApi.dispatch(getCommunity(newList))
      addStorage(newList)
    },
  })