import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MessageBubbleProps {
  text: string;
  sender: string;
  isOwnMessage: boolean;
}

export default function MessageBubble({ text, sender, isOwnMessage }: MessageBubbleProps) {
  return (
    <View style={[
      styles.bubbleContainer, 
      isOwnMessage ? styles.ownBubbleContainer : styles.otherBubbleContainer
    ]}>
      {!isOwnMessage && <Text style={styles.senderName}>{sender}</Text>}
      
      <View style={[
        styles.bubble, 
        isOwnMessage ? styles.ownBubble : styles.otherBubble
      ]}>
        <Text style={isOwnMessage ? styles.ownText : styles.otherText}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    bubbleContainer: {
        marginVertical: 5,
        marginhorizontal: 10,
        maxWidth: '80%',
    },
    ownBubbleContainer: {
        alignSelf: 'flex-end',
    },
    otherBubbleContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#F2F2F7',
        borderBottomLeftRadius: 2,
        borderwidth: 1,
        borderColor: '#E5E5EA',
    },
    bubble: {
        padding: 10,
        borderRadius: 15,
    },
    ownBubble: {
        backgroundColor: '#007AFF',
        borderBottomLeftRadius: 2,
    },
    senderName: {
        fontSize: 12,
        color: '#8e8e93',
        marginBottom: 2,
        marginLeft: 5,
    },
    ownText: {
        color: '#fff',
    },
    otherText: {
        color: '#000000',
        fontSize: 16,
    },
    });