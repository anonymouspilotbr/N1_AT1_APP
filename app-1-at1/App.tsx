import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Alert, Text, TextInput, View } from 'react-native';

export default function App() {
  const createTwoButtonAlert = () =>
    Alert.alert('Sucesso', 'Nome de usuário registrado com sucesso', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Digite seu nome de usuário</Text>
      <TextInput style={styles.input}/>
      <Button title={'Enviar'} onPress={createTwoButtonAlert} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20
  },
  input: {
    backgroundColor: '#fff',
    fontSize: 18,
    width: '75%',
    marginVertical: 10
  }
});
