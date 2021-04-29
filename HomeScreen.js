import * as React from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity,} from 'react-native';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {word:'', definition:'', phonetics:''};
  }
  getWord=(word)=>{
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
    return fetch(url)
      .then((data)=>{
        if(data.status===200){
            return data.json()
        }else{
            return null
        }
      })

      .then((response) => {
        console.log(response);
        var word = response[0].word;
        console.log(word);
        var definition = response[0].meanings[0].definitions[0].definition;
        
        this.setState({
          word: word.trim(),
          definition: definition.trim(),
        });
      });
  };

  render() {
    return (
      <View>
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchedPressed: false,
              lexicalCategory: '',
              examples: [],
              definition: '',
            });
          }}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchedPressed: true });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.textIn}> search </Text>{' '}
        </TouchableOpacity>

        <Text style={styles.textOutput1}>{this.state.word}</Text>
        <Text style={styles.textOutput2}>{this.state.definition}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    marginTop: 50,
    width: '60%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'black',
    fontFamily:'monospace',
    fontSize:20
  },
  searchButton: {
    width: '20%',
    height: 50,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: 'black',
    backgroundColor: 'white'
  },
  textIn: {
    textAlign: 'center',
    fontFamily: 'monospace',
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  textOutput1:{
      textAlign: 'left',
      fontFamily: 'monospace',
      fontSize:20,
      fontStyle:'bold'
  },
  textOutput2:{
    textAlign: 'left',
    fontFamily: 'monospace',
    fontSize:18,
}
});
