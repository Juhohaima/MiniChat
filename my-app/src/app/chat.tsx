import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import MessageInput from '../components/MessageInput';

export default function ChatScreen() {
  const { user } = useLocalSearchParams();
  
  const handleSendMessage = (text: string) => {
    console.log(` ${user} lähetti viestin: ${text}`);
  };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Mini Chat</Text>
                <Text style={styles.userText}>Kirjautunut käyttäjällä {user}</Text>
            </View>

            <MessageInput onSend={handleSendMessage} />
        </SafeAreaView>
    );
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 20,
        backgroundColor: '#007AFF',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    userText: {
        marginTop: 5,
        fontSize: 16,
        color: '#fff',
    },
};
