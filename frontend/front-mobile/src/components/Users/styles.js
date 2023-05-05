
import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  
    container: {
      flex: 1,
    },
    image_login:{
      alignSelf:'center',
      marginTop:35,
      width:'35%',
      height:'15%',
    },
    header:{
      backgroundColor:'#DA5C5C',
      width:'100%',
      height:'40%',
    },
    titleHeader:{
      flexDirection:"row",
      width:'100%',
      height:'25%',
      justifyContent:'space-between',
      alignItems:'flex-end',
      backgroundColor:'#DA5C5C',
    },
    headerButton:{
      justifyContent:"center",
      alignItems:'center',
      width:'20%',
      height:'50%',
      backgroundColor:'#DA5C5C'
    },
    perfil:{
      width:'100%',
      height:'75%',
      justifyContent:'left',
      alignItems:'center',
      backgroundColor:'#DA5C5C',
    },
    imagePerfil:{
      width:'50%',
      height:'100%',
      resizeMode: 'contain',
    },
   
    title: {
      color: '#263238',
      fontSize: 26,
      lineHeight: 35,
      fontWeight: 'bold',
      marginTop: 5,
      textAlign: 'center'
    },
    subTitle: {
      color: '#9E9E9E',
      fontSize: 16,
      marginTop: 15,
      lineHeight: 22,
      textAlign: 'center'
    },
    content:{
      backgroundColor:'#DA5C5C',
      marginHorizontal:30,
      marginTop:20,
      paddingTop:20,
      paddingVertical:10,
      borderRadius: 10,
      height:'75%',
      justifyContent:'space-between',
    },
    text_Input:{
      backgroundColor: "#fff",
      width: '90%',
      height:50,
      marginBottom:10,
      alignSelf: 'center',
      borderRadius: 10,
      paddingLeft: 20,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.7,
      shadowRadius: 2,
      elevation: 3,
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
    editButton: {
      backgroundColor: '#DA5C5C',
      width:'15%',
      height:'15%',
      alignItems:'center',
      justifyContent:'center',
      borderRadius:'30%',
      marginBottom:50,
      marginLeft:20
    },
    buttonLink:{
      flexDirection:"row",
      backgroundColor: '#fff',
      width:'100%',
      height:60,
      alignItems:'center',
      paddingHorizontal:15,
      justifyContent:'space-between',
      marginTop:5
    },
    dataProfile:{
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