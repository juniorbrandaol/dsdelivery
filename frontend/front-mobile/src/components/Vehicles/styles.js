
import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  
    container: {
      marginTop: '5%',
      flex: 1,
    },
    image_login:{
      alignSelf:'center',
      marginTop:5,
      width:'35%',
      height:'15%',
      resizeMode: 'stretch',
    },
    title: {
      color: '#263238',
      fontSize: 26,
      lineHeight: 35,
      fontWeight: 'bold',
      marginTop: 5,
      textAlign: 'center'
    },
   
    content:{
      backgroundColor:'#DA5C5C',
      marginHorizontal:30,
      marginTop:10,
      borderRadius: 10,
      height:'70%',
      zIndex:-30
    },
    text_Input:{
      backgroundColor: "#fff",
      width: '90%',
      height:50,
      marginBottom:15,
      alignSelf: 'center',
      borderRadius: 10,
      paddingLeft: 20,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.7,
      shadowRadius: 2,
      elevation: 3,
      borderWidth:0,
      
    },
    dropDownPicker:{
      backgroundColor: "#fff",
      width: '90%',
      height:50,
      marginTop:20,
      alignSelf: 'center',
      borderRadius: 10,
      paddingLeft: 20,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.7,
      shadowRadius: 2,
      elevation: 3,
      borderWidth:0,
     
    },
    
    dropDownPickerContainer:{
      backgroundColor:'#DA5C5C',
      width: '80%',
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.7,
      shadowRadius: 2,
      elevation: 3,
      borderWidth:1,
      borderColor:'#fff',
      borderRadius:20,
      paddingHorizontal:25,
      alignSelf:'center'
    },
    footer: {
      marginTop: '10%',
      alignItems: 'center',
      
    },
    button: {
      backgroundColor: '#DA5C5C',
      flexDirection: 'row',
      width:'60%',
      alignItems:'center',
      justifyContent:'center',
      borderRadius: 10,
      marginBottom:15,
    },
    buttonText: {
      paddingTop: 15,
      paddingBottom: 15,
      paddingLeft: 50,
      paddingRight: 50,
      fontWeight: 'bold',
      fontSize: 18,
      color: '#FFF',
      letterSpacing: -0.24,
    },
    dataVehicle:{
      backgroundColor: '#fff',
      width:'100%',
      height:60,
      alignItems:'left',
      paddingHorizontal:15,
      marginTop:5
    },
    lineTitle:{
      color: '#9E9E9E',
      fontSize: 16,
      lineHeight: 22,
      textAlign: 'center'
    },
    line:{
      width:'90%',
      alignSelf:"center",
      borderWidth:0.5,
      borderColor:'#e3e1e1',
    }
  
});
export default styles;