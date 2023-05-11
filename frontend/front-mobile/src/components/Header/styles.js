
import { StyleSheet} from 'react-native';


const styles = StyleSheet.create({
  button:{
   width:"100%",
   height:130,
   alignItems:'center',
   backgroundColor: '#DA5C5C',
  }, 
  container: {
     backgroundColor: '#DA5C5C',
     width:"100%",
     height:90,
     paddingTop:30,
     flexDirection:'row',
     justifyContent:'space-between',
     paddingHorizontal:10,
     alignItems:'center'
  },
  grid:{
     backgroundColor:'#DA5C5C',
     flexDirection:'row',
     alignItems:"center",
     width:'33%',

  },
   headerButton:{
   width:'30%',
   height:'80%',
   backgroundColor:'#DA5C5C'
 },
  title_logo:{
   color:'#FFF',
   fontSize: 18,
   fontWeight: 'bold',
   lineHeight: 25,
   letterSpacing: -0.24,
   marginLeft:15,
  },
  title_msg: {
   height:'25%',
   color: '#fff',
   fontSize: 26,
   lineHeight: 35,
   fontWeight: 'bold',
   textAlign: 'center',
   
 },
});
export default styles;