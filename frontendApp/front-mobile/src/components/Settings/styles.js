
import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  
    container: {
      flex: 1,
    },
    header:{
      backgroundColor:'#DA5C5C',
      width:'100%',
      height:'30%',
      justifyContent:'center'
    },
    perfil:{
      width:'100%',
      height:'55%',
      justifyContent:'left',
      alignItems:'center',
      flexDirection:'row',
    },
    imagePerfil:{
      width:'35%',
      height:'100%',
      resizeMode: 'contain',
    },
    titlePerfil:{
      color: '#fff',
      fontSize: 22,
      fontWeight:'bold',
      marginTop: 15,
      lineHeight: 22,
      textAlign: 'center'
    },
    title: {
      height:'20%',
      color: '#fff',
      fontSize: 26,
      lineHeight: 35,
      fontWeight: 'bold',
      marginTop: 15,
      textAlign: 'left',
      paddingHorizontal:20
    },
    subTitle: {
      color: '#9E9E9E',
      fontSize: 16,
      marginTop: 15,
      lineHeight: 22,
      textAlign: 'center'
    },
    content:{
      backgroundColor:'#fff',
      height:'100%',
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
    editButton: {
      backgroundColor: '#DA5C5C',
      width:'15%',
      height:'35%',
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
    titleLink:{
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