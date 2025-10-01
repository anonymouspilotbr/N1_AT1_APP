import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Button, Image, FlatList, Alert, ActivityIndicator, Modal, Pressable, Switch, Text, TextInput, TouchableOpacity, View, ScrollView, SectionList } from 'react-native';
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

  const DATA_SECTION = [
    {
      title: 'Dados',
      data: ['Imagens', 'Texto', 'Ícones']
    },
    {
      title: 'Status',
      data: ['Barra de status', 'Carregamento']
    },
    {
      title: 'Navegação',
      data: ['Clickspots', 'Modais', 'Janelas']
    },
  ]

  type ItemProps = {title: string};

  const Item = ({title}: ItemProps) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const [currentPage, setCurrentPage] = useState(0);

  const modalPages = [
    (
      <View key="page1">
        <Text style={styles.modalText}>Olá Mundo! Esta é uma demonstração de um aplicativo em React Native e várias de suas funções. Essas funções incluem:</Text>
        <FlatList style={{ maxHeight: 250 }}
          data={DATA}
          renderItem={({item}) => <Item title={item.title} />}
          keyExtractor={item => item.id}
        />
      </View>
    ),
    (
      <View key="page2">
        <Text style={styles.modalText}>Além disso, é possível utilizar funções como:</Text>
          <SectionList style={{ maxHeight: 550 }}
            sections={DATA_SECTION}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => (
              <View style={styles.item}>
                <Text style={styles.title}>{item}</Text>
              </View>
            )}
            renderSectionHeader={({section: {title}}) => (
              <Text style={styles.header}>{title}</Text>
            )}
          />
      </View>
    ),
    (
      <View key="page3">
        <ScrollView style={styles.scroll}>
          <Text style={styles.modalText}>
            Esta é apenas uma pequena demonstração do que essa tecnologia é capaz. Você pode buscar muito mais informações acessando reactnative.dev ou pesquisando online.
            Obrigado por testar nosso aplicativo. Em breve teremos nosso app de verdade, o PharmaGo, de entrega de medicamentos. Fique à vontade se quiser testá-lo.
            Esta é apenas uma pequena demonstração do que essa tecnologia é capaz. Você pode buscar muito mais informações acessando reactnative.dev ou pesquisando online.
            Obrigado por testar nosso aplicativo. Em breve teremos nosso app de verdade, o PharmaGo, de entrega de medicamentos. Fique à vontade se quiser testá-lo.
          </Text>
        </ScrollView>
      </View>
    ),
  ]

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
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              {modalPages[currentPage]}
                <View style={{ width: '100%' }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    {currentPage > 0 && (
                      <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#aaa', marginRight: 10 }]}
                        onPress={() => setCurrentPage(currentPage - 1)}
                      >
                        <Text style={styles.textStyle}>Voltar</Text>
                      </TouchableOpacity>
                    )}

                    {currentPage < modalPages.length - 1 ? (
                      <TouchableOpacity
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setCurrentPage(currentPage + 1)}
                      >
                        <Text style={styles.textStyle}>Próximo</Text>
                      </TouchableOpacity>
                    ) : (
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                          setCurrentPage(0);
                          setModalVisible(false);
                        }}
                      >
                        <Text style={styles.textStyle}>Fechar</Text>
                      </Pressable>
                    )}
                  </View>
                </View>
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
  scroll: {
    maxHeight: 190
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
    justifyContent: 'flex-start',
    width: '90%',
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
    padding: 12,
    marginVertical: 4,
    marginHorizontal: 12,
    alignItems: 'center'
  },
  header: {
    fontSize: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
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
