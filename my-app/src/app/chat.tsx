import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MessageBubble from '../components/MessageBubble';
import MessageInput from '../components/MessageInput';

interface Message {
  id: string;
  text: string;
  sender: string;
}

export default function ChatScreen() {
  const { user } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:3000/messages');
      const data = await response.json();
      const formattedData = data.map((msg: any) => ({
        ...msg,
        id: msg.id.toString(),
      }));
      setMessages(formattedData);
    } catch (error) {
      console.error('Virhe viestien hakemisessa:', error);
    }
  };

  useEffect(() => {
    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages(); // hae uudet viestit 10 sekunnin välein
    }, 10000);

    return () => clearInterval(interval); // haku loppuu kun poistutaan chatista
  }, []);

  const handleSendMessage = async (text: string) => {
    try {
      const response = await fetch('http://localhost:3000/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text,
          sender: user,
        }),
      });

      if (response.ok) {
        fetchMessages();
      }
    } catch (error) {
      console.error('Virhe viestin lähettämisessä:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>MiniChat</Text>
        <Text style={styles.userText}>Kirjautunut käyttäjällä: {user}</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageBubble 
            text={item.text} 
            sender={item.sender} 
            isOwnMessage={item.sender === user} 
          />
        )}
        inverted // uudet viestit alimpana
        style={styles.chatArea}
      />

      <MessageInput onSend={handleSendMessage} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userText: {
    fontSize: 14,
    color: '#666',
  },
  chatArea: {
    flex: 1,
  },
});