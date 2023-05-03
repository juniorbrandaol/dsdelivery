

/************************* TOKEN ***************************/
function setToken(item:any) {
   try {
     localStorage.setItem('TOKEN', item)
   } catch (e) {
      console.log(e)
   }
}

const getToken=async()=> {
   try {
    const TOKEN =  localStorage.getItem("TOKEN");
      return TOKEN ;
   } catch (e) {
      console.log(e)
   }
}

function removeToken() {

   try {
    localStorage.removeItem('TOKEN');
      return true
   } catch (e:any) {
      console.log('Erro ao remover item do carrinho: ' + e.message);
      return false
   }

}

function logOut() {

   try {
      localStorage.removeItem('TOKEN');
      return true
   } catch (e:any) {
      console.log('Erro ao realizar logOut: ' + e.message);
      return false
   }

}



export default {logOut,setToken,getToken,removeToken} 