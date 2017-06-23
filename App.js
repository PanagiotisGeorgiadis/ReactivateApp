import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, StatusBar, FlatList, Image} from 'react-native';

import ReversedFlatList from 'react-native-reversed-flat-list';
import {send, subscribe} from 'react-native-training-chat-server';

import Header from "./Header";

const NAME = '@PanagiotisGeorgiadis';
const CHANNEL = 'Reactivate';
const AVATAR = 'https://pbs.twimg.com/profile_images/869307058931281921/xuQAx3pT.jpg';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      message: '',
      messagesArray: []
    }
  }

  componentWillMount() {
    subscribe(CHANNEL, messagesArray => {
      this.setState({messagesArray});
    });
  }

  sendMessage = async () => {
    // read message from component state
    const message = this.state.message;

    // send message to our channel, with sender name
    await send({
      channel: CHANNEL,
      sender: NAME,
      avatar: AVATAR,
      message,
    });

    // set the component state (clears text input)
    this.setState({
      message: '',
    });
  };

  renderItem({item}) {

    return (
      <View style = { styles.row } >
        <Image style = { styles.avatar } source={{ uri: item.avatar }} />
        <View style = { styles.rowText }>
          <Text style = { styles.sender }>
            { item.sender }
          </Text>
          <Text style = { styles.message }>
            { item.message }
          </Text>
        </View>
      </View>
    );
  }

  render() {

    return (
      <View style={ styles.container } >
        <Header titleText = { CHANNEL } />
        <ReversedFlatList data = { this.state.messagesArray } renderItem = { this.renderItem } />
        <KeyboardAvoidingView behavior = "padding">
          <View style = { styles.footer }>
            <TextInput value = { this.state.message } style = { styles.input } underlineColorAndroid = "transparent"
              placeholder = "Type something nice" onChangeText = { text => this.setState({ message: text }) } />
            <TouchableOpacity onPress = { this.sendMessage } >
              <Text style = { styles.send }>
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 10,
  },
  rowText: {
    flex: 1,
  },
  message: {
    fontSize: 16,
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 10,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
  },
  input: {
    paddingHorizontal: 20,
    fontSize: 18,
    flex: 1,
  },
  send: {
    alignSelf: 'center',
    color: 'lightseagreen',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20,
  },
});
