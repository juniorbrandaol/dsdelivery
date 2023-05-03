import * as SecureStore from 'expo-secure-store';

/************************* TOKEN ***************************/
const setToken=async(item:any)=> {
   try {
     await SecureStore.setItemAsync('TOKEN', item)
   } catch (e) {
      console.log(e)
   }
}

const getToken=async()=> {
   try {
    const TOKEN = await SecureStore.getItemAsync("TOKEN");
      return TOKEN ;
   } catch (e) {
      console.log(e)
   }
}

const removeToken=async()=>{

   try {
     await SecureStore.deleteItemAsync('TOKEN');
      return true
   } catch (e:any) {
      console.log('Erro ao remover item do carrinho: ' + e.message);
      return false
   }

}

const logOut=async()=>{

   try {
     await localStorage.deleteItemAsync('TOKEN');
      return true
   } catch (e:any) {
      console.log('Erro ao realizar logOut: ' + e.message);
      return false
   }

}

export default {logOut,setToken,getToken,removeToken} 