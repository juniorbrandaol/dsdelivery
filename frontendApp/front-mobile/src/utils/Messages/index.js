import { Text, View, TouchableOpacity } from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";


export default Message = (msg, type, position, confirmation) => {

  const floating = Platform.OS === 'ios' ? false : true
  const widthTop = Platform.OS === 'ios' ? '100%' :'95%'

  /* HERE WE GONE SHOW OUR FIRST MESSAGE 
     TYPE: The type attribute set the type and color of your flash message, 
     default options are "success" (green), "warning" (orange), "danger" (red), "info" (blue) and "default" (gray).
     POSITION: set the position of a flash message  Expected options: "top" (default), "bottom", "center"
     FLOATING: DEFINES THE BEHAVIOR OF THE MESSAGE AT THE TOP. ON ANDROID DEVICES IT MUST BE SET TO TRUE
     ICON: (default), "auto" "success", "info", "warning", "danger" OR CUSTON
     CONFIRMATION(TRUE OR FALSE) : IF CONFIRMATION EXISTS, AN ACTION CANCEL AND CONFIRMATION BUTTONS WILL BE REDERIZED
  */
  let width = '95%'
  if (position == 'top') {
    width = widthTop
  }

  const cancelButton = () => {
    hideMessage()
  }

  const confirmButton = () => {

    console.log('confirmou')
  }

  const optionButton = () => {
    if (confirmation == true) {
      return (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            //  backgroundColor:'yellow',
            marginTop: 5,
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            style={{
              width: 100,
              height: 35,
              //    backgroundColor:'blue',
              alignItems: 'center',
              justifyContent: 'center',
              borderRightColor: '#979797',
              borderRightWidth: 0.5
            }}
            onPress={() => cancelButton()}
          >
            <Text
              style={{
                color: '#FFF',
                fontSize: 18,
                //    backgroundColor:'green',
                width: 90,
                height: 25,
                alignSelf: 'center',
                textAlign: 'center'
              }}
            >Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 100,
              height: 35,
              //    backgroundColor:'blue',
              alignItems: 'center',
              justifyContent: 'center',
              borderLeftColor: '#979797',
              borderLeftWidth: 0.5
            }}
            onPress={() => confirmButton()}
          >
            <Text
              style={{
                color: '#FFF',
                fontSize: 18,
                //   backgroundColor:'green',
                width: 90,
                height: 25,
                alignSelf: 'center',
                textAlign: 'center'
              }}
            >Confirmar</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return <></>
    }
  }

  showMessage({

    message: msg,
    type: type,
    position: position,
    autoHide: confirmation ? false : true,
    hideOnPress: confirmation ? false : true,
    icon: 'auto',
    duration: 3000,
    color: "#fff",
    hideStatusBar: false,
    statusBarHeight:0,
    animated: true,
    floating: floating,
    renderCustomContent: (() => optionButton()),

    icon: {
      icon: 'auto',
      width: 40,
      height: 40,
      position: 'left',
    },
    //estiliza o description
    titleStyle: {
      width:'100%',
      textAlign: 'center',
      alignSelf: 'center',
      justifyContent:'center',
      alignItems: 'center', 
      fontSize: 18,
      //fontWeight: 'bold'
    },
    //estiliza o description
    textStyle: {
      justifyContent:'center',
      textAlign: 'justify',
      alignSelf: 'center',
      fontSize: 15,
    },
    style: {
      width: width,    
      alignItems: "center",
      textAlign: 'center',
      alignSelf: 'center',
      height: 90
    },

  });

}