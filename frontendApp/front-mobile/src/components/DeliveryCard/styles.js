
import { StyleSheet} from 'react-native';


const styles = StyleSheet.create({
  
    container: {
      marginTop: '2%',
      marginLeft: '2%',
      marginRight: '2%',
      marginBottom: '2%',
      padding: 15,
      backgroundColor: '#FFF',
      shadowOpacity: 0.25,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 20,
      borderRadius: 10,
      elevation: 5
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    text: {
      fontWeight: 'normal',
      fontSize: 14,
      lineHeight: 19,
      letterSpacing: -0.24,
      color: '#9E9E9E',
      fontFamily: 'OpenSans_400Regular'
    },
    orderName: {
      fontWeight: 'bold',
      fontSize: 18,
      lineHeight: 25,
      letterSpacing: -0.24,
      color: '#263238',
      fontFamily: 'OpenSans_700Bold'
    },
    orderPrice: {
      fontWeight: 'bold',
      fontSize: 18,
      lineHeight: 25,
      textAlign: 'right',
      letterSpacing: -0.24,
      color: '#DA5C5C',
      fontFamily: 'OpenSans_700Bold'
    },
    line:{
      width:'95%',
      alignSelf:"center",
      borderWidth:0.5,
      borderColor:'#e3e1e1',
      marginTop:15
    },
    address:{
      width:'95%',
      justifyContent:'center',
    },
    addressName:{
      fontWeight: 'bold',
      fontSize: 14,
      lineHeight: 25,
      textAlign: 'left',
      letterSpacing: 1,
      color: '#DA5C5C',
      fontFamily: 'OpenSans_700Bold'
    },
    clientDetails:{
      flexDirection:'row',
      paddingVertical:5
    },
    textClient: {
      fontWeight: 'bold',
      fontSize: 16,
      lineHeight: 19,
      paddingRight:10,
      letterSpacing: 2,
      color: '#DA5C5C',
      fontFamily: 'OpenSans_700Bold'
    },
  
});
export default styles;