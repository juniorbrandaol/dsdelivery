import {ScrollView} from 'react-native'
import styles from "./styles";
import Header from '../Header';
import OrderCard from '../OrderCard';

export default function Order() {

  return (
    <>
      <Header/>
        <ScrollView  style={styles.container}>
          <OrderCard/>
          <OrderCard/>
          <OrderCard/>
          <OrderCard/>
          <OrderCard/>
      </ScrollView>
    </>
  );
}

