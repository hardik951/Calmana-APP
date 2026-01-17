import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Button } from './Button';
import { DashboardCard } from './DashboardCard';

interface AIAssistantProps {
  onNavigate: (view: string) => void;
}

export function AIAssistant({ onNavigate }: AIAssistantProps) {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: "Hello! I'm your AI wellness companion. I'm here to support your mental health journey. How are you feeling today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const quickActions = [
    { text: "I'm feeling anxious", icon: "exclamation-triangle", color: "#EF4444" },
    { text: "I need meditation help", icon: "heart", color: "#F59E0B" },
    { text: "I'm having trouble sleeping", icon: "moon-o", color: "#3B82F6" },
    { text: "I want a mood assessment", icon: "bar-chart", color: "#10B981" },
  ];

  const handleQuickAction = (action: string) => {
    console.log('Quick action:', action);
    // Add AI response for quick actions
    const newMessage = {
      id: Date.now(),
      type: 'user',
      text: action,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        text: `I understand you're feeling this way. Let me help you with some coping strategies and support.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now(),
        type: 'user',
        text: inputText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          text: `Thank you for sharing that with me. I'm here to listen and support you. Would you like to talk more about this or try some relaxation techniques?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1500);
    }
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    Alert.alert(
      "Voice Input",
      "Voice control feature will be integrated with Python backend for speech recognition and natural language processing.",
      [
        {
          text: "OK",
          onPress: () => setIsListening(false)
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <DashboardCard
        title="AI Wellness Assistant"
        subtitle="Online • Ready to help • Voice-enabled"
        icon="cog"
        backgroundColor="#F0F8F0"
        iconColor="#4F7C52"
      >
        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionButton}
                onPress={() => handleQuickAction(action.text)}
              >
                <FontAwesome name={action.icon as any} size={16} color={action.color} />
                <Text style={styles.quickActionText}>{action.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Chat Interface */}
        <View style={styles.chatSection}>
          <Text style={styles.sectionTitle}>Chat with AI Assistant</Text>
          <View style={styles.chatContainer}>
            <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
              {messages.map((message) => (
                <View key={message.id} style={styles.messageContainer}>
                  <View style={[
                    styles.message,
                    message.type === 'ai' ? styles.aiMessage : styles.userMessage
                  ]}>
                    {message.type === 'ai' && (
                      <View style={styles.aiMessageHeader}>
                        <FontAwesome name="cogs" size={16} color="#4F7C52" />
                        <Text style={styles.aiMessageLabel}>AI Assistant</Text>
                      </View>
                    )}
                    <Text style={[
                      styles.messageText,
                      message.type === 'ai' ? styles.aiMessageText : styles.userMessageText
                    ]}>
                      {message.text}
                    </Text>
                    <Text style={styles.messageTime}>
                      {message.timestamp}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
            
            <View style={styles.chatInputContainer}>
              <TouchableOpacity 
                style={[styles.voiceButton, isListening && styles.voiceButtonActive]}
                onPress={handleVoiceInput}
              >
                <FontAwesome 
                  name={isListening ? "microphone-slash" : "microphone"} 
                  size={16} 
                  color={isListening ? "#FFFFFF" : "#4F7C52"} 
                />
              </TouchableOpacity>
              <TextInput
                style={styles.chatInput}
                placeholder="Share what's on your mind..."
                placeholderTextColor="#9CA3AF"
                value={inputText}
                onChangeText={setInputText}
                multiline
              />
              <TouchableOpacity 
                style={styles.sendButton}
                onPress={handleSendMessage}
              >
                <FontAwesome name="send" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Python Integration Info */}
        <View style={styles.pythonIntegration}>
          <Text style={styles.integrationTitle}>Voice & AI Integration</Text>
          <Text style={styles.integrationText}>
            This AI assistant will connect to Python backend for:
          </Text>
          <View style={styles.integrationFeatures}>
            <View style={styles.integrationFeature}>
              <FontAwesome name="microphone" size={16} color="#4F7C52" />
              <Text style={styles.integrationFeatureText}>Voice Recognition</Text>
            </View>
            <View style={styles.integrationFeature}>
              <FontAwesome name="bolt" size={16} color="#4F7C52" />
              <Text style={styles.integrationFeatureText}>Natural Language Processing</Text>
            </View>
            <View style={styles.integrationFeature}>
              <FontAwesome name="android" size={16} color="#4F7C52" />
              <Text style={styles.integrationFeatureText}>AI-Powered Responses</Text>
            </View>
          </View>
        </View>

        {/* Assessment Button */}
        <Button
          title="Take Full Assessment"
          onPress={() => onNavigate('diagnosis')}
          variant="primary"
          size="large"
          icon={<FontAwesome name="bar-chart" size={16} color="#FFFFFF" />}
          style={styles.assessmentButton}
        />
      </DashboardCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  quickActionsSection: {
    marginBottom: 24,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickActionText: {
    fontSize: 13,
    color: '#374151',
    marginLeft: 8,
    flex: 1,
  },
  chatSection: {
    marginBottom: 24,
  },
  chatContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  messagesContainer: {
    maxHeight: 300,
    marginBottom: 16,
  },
  messageContainer: {
    marginBottom: 12,
  },
  message: {
    borderRadius: 16,
    padding: 12,
    maxWidth: '85%',
  },
  aiMessage: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#4F7C52',
    alignSelf: 'flex-end',
  },
  aiMessageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiMessageLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4F7C52',
    marginLeft: 8,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  aiMessageText: {
    color: '#111827',
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  messageTime: {
    fontSize: 11,
    color: '#6B7280',
    alignSelf: 'flex-end',
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  voiceButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  voiceButtonActive: {
    backgroundColor: '#EF4444',
  },
  chatInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
    maxHeight: 80,
    paddingVertical: 8,
  },
  sendButton: {
    backgroundColor: '#4F7C52',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  pythonIntegration: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  integrationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  integrationText: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
    lineHeight: 20,
  },
  integrationFeatures: {
    gap: 12,
  },
  integrationFeature: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  integrationFeatureText: {
    fontSize: 14,
    color: '#475569',
    marginLeft: 12,
    fontWeight: '500',
  },
  assessmentButton: {
    marginTop: 8,
  },
});

