import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import idToken from '@/components/idToken';


export default function ModalScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      <View style={{ marginVertical: 20 }}>
        <Text>User ID</Text>
        <Text>{idToken().storeId}</Text>
      </View>

      <View>
        <Text>Token</Text>
        <Text>{idToken().storeToken}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});