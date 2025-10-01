import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Button, Image, FlatList, Alert, ActivityIndicator, Modal, Pressable, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

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
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [modalVisible, setModalVisible] = useState(false);

  const DATA = [
    {
      id: '1',
      title: 'Listas'
    },
    {
      id: '2',
      title: 'Botões'
    },
    {
      id: '3',
      title: 'Entrada de texto'
    },
    {
      id: '4',
      title: 'Alertas'
    },
  ]

  type ItemProps = {title: string};

  const Item = ({title}: ItemProps) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Image style={styles.image} source={require('./assets/pharmago.png')}></Image>
          <Text style={styles.text}>Digite seu nome de usuário</Text>
          <TextInput style={styles.input}/>
          <ActivityIndicator size="small" color="#0000ff" />
          <View style={styles.switchRow}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            /><Text style={styles.text}>Manter conectado</Text>
          </View>
          <Button title={'Enviar'} onPress={createTwoButtonAlert} />

          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Olá Mundo! Esta é uma demonstração de um aplicativo em React Native e várias de suas funções. Essas funções incluem:</Text>
              <FlatList
                data={DATA}
                renderItem={({item}) => <Item title={item.title} />}
                keyExtractor={item => item.id}
              />
              <TouchableOpacity style={styles.button}>
              <Text>Entendi.</Text>
              </TouchableOpacity>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Fechar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Saber Mais</Text>
        </Pressable>
          <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 5
  },
  buttonOpen: {
    backgroundColor: '#3c76ffff',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  text: {
    fontSize: 20
  },
   item: {
    backgroundColor: '#ffcbc2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
  },
  input: {
    backgroundColor: '#fff',
    fontSize: 18,
    width: '80%',
    marginVertical: 10
  },
  image: {
    width: 220,
    height: 120
  }
});
