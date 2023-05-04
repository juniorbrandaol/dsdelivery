
import { StyleSheet} from 'react-native';


const styles = StyleSheet.create({
  container: {
     backgroundColor: '#DA5C5C',
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
  text_logo:{
   color:'#FFF',
   fontSize: 18,
   fontWeight: 'bold',
   lineHeight: 25,
   letterSpacing: -0.24,
   marginLeft:15,
  }
});
export default styles;