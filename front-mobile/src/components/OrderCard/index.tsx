import {View,Text,Image} from 'react-native';
import styles from './styles.js'

function OrderCard() {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
         <Text style={styles.orderName}>Pedido 1</Text>
         <Text style={styles.orderPrice}>R$ 5,00</Text>
      </View>
      <Text style={styles.text}> ha 30min atrás</Text>
      <View style={styles.productsList}>
         <Text style={styles.text}>
             Pizza Calabresa
             Pizza Quatro Queijos
             Pizza Marguerita
         </Text>
         <Text style={styles.text}>
          Sorvete de chocolate
          </Text>
      </View>
    </View>
  );
}

export default OrderCard;
