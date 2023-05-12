
import { StyleSheet} from 'react-native';


const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingRight:'5%',
    paddingLeft:'5%',
  },
  deliveryType:{
    width:'100%',
    height:60,
    paddingHorizontal:30,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:"space-evenly",
    backgroundColor:'#fff'
  },
  text: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: -0.24,
    color: '#9E9E9E',
    fontFamily: 'OpenSans_400Regular'
  },
  button:{
    justifyContent:'center',
    height:40,
    paddingHorizontal:20,
  },
});
export default styles;