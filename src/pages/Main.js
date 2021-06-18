import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Main = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    AsyncStorage.getItem('books').then(data => {
      const book = JSON.parse(data)
      setBooks(book)
    })
  }

  const onBookDelete = async (bookId) => {
    const newBooks = books.filter(item => item.id !== bookId)
    await AsyncStorage.setItem("books",JSON.stringify(newBooks));
    setBooks(newBooks)
  }

  const onBookRead = async (bookId) => {
    const newBooks = books.map(item => {
      if(item.id === bookId){
        item.read = !item.read
      }
      return item;
    })
    await AsyncStorage.setItem("books",JSON.stringify(newBooks));
    console.log(newBooks)
  }

  const navigator = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.tooBox}>
        <Text style={styles.title}>Lista de Leitura..</Text>
        <TouchableOpacity onPress={() => navigator.navigate("Book")} style={styles.toolboxButton}>
          <Text><Icon name="add" size={28} color="#fff" /></Text>
        </TouchableOpacity>
      </View>
      <View>
        {books?.map((book) => {
          return(
            <View key={book.id} style={styles.itemView}>
              <TouchableOpacity onPress={() => onBookRead(book.id)} style={styles.itemButton} >
                <Text style={[styles.itemText, book.read ? styles.itemRead : styles.itemText]}>{book.title}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}} onPress={() => onBookDelete(book.id)}>
                <Icon color="#d32f2f" name="delete" size={40} />
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 10,
    backgroundColor: '#f0ee87'
  },
  tooBox: {
    flexDirection: 'row',
    marginRight: 20,
    marginBottom: 5
  },
  title: {
    fontSize:30,
    flex: 1,
    color: "#3498db"
  },
  toolboxButton: {
    width: 40,
    height: 40,
    backgroundColor: "#3498db",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50
  },
  itemButton: {
    paddingVertical: 5,
    flex: 1
  },
  itemText: {
    fontSize: 26,
    color: "#000"
  },
  itemRead: {
    textDecorationLine: 'line-through',
    color: '#95a5a6'
  },
  itemView: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d7dd75'
  }
})

export default Main;