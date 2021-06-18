import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native'

const Book = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [photo, setPhoto] = useState();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem('books').then(data => {
      const book = JSON.parse(data)
      book === null ? setBooks([]) : setBooks(book)
      console.log(books)
    })
    
  }, [])
  const isValid = () => {
    if(title !== undefined && title !== '') {
      return true
    }
    return false
  }

  const onSave = async () => {
    if(isValid()){
      const id = Math.random(5000).toString()
      const data = {
        id,
        title,
        description,
        reaad: false,
        photo
      }

      books.push(data);
      console.log(books)
      await AsyncStorage.setItem("books", JSON.stringify(books))
      navigator.navigate('Main')
    }else{
      alert("Dados inválidos, por favor, preencha todos os campos requeridos.")
    }
  }


  const navigator = useNavigation()
  return(
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Inclua seu novo livro...</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={(text) => {
          setTitle(text)
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        multiline={true}
        numberOfLines={4}
        value={description}
        onChangeText={(text) => {
          setDescription(text)
        }}
      />

      <TouchableOpacity 
      onPress={onSave} 
      disabled={(isValid()) ? false : true}
      style={[ styles.saveButton ,(!isValid()) ?  styles.saveButtonInvalid : '' ]}>
        <Text style={styles.saveButtonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigator.goBack()} style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '20%',
    paddingHorizontal: 20,
    backgroundColor: '#f0ee87'
  },
  pageTitle: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom: '20%'
  },
  input: {
    fontSize: 18,
    borderBottomColor: "#f39c12",
    borderBottomWidth: 1,
    marginBottom: '10%'
  },
  cameraButton: {
    width: 60,
    height: 60,
    backgroundColor: "#f39c12",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: '30%',
  },
  saveButton: {
    backgroundColor: "#f39c12",
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: '10%'
  },
  saveButtonInvalid: {
    opacity: 0.5
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  cancelButton: {
    alignSelf: 'center'
  },
  cancelButtonText: {
    color: "#95a5a6"
  }
})

export default Book;