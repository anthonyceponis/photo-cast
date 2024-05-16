import React, { useState, useEffect } from 'react';
import { View, Text, Switch, TextInput, Button, StyleSheet, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function sendTestNotification(city) {
    // Code to send test notification
    Alert.alert('️🌤️Weather Notification🌤️', `Current city: ${city}`);
  };

export function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [DefaultCity, setDefaultCity] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const notificationsSetting = await AsyncStorage.getItem('notificationsEnabled');
      setNotificationsEnabled(notificationsSetting === 'true');

      const storedDefaultCity = await AsyncStorage.getItem('defaultCity');
      if (storedDefaultCity !== null) {
        setDefaultCity(storedDefaultCity);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem('notificationsEnabled', notificationsEnabled.toString());
      await AsyncStorage.setItem('defaultCity', DefaultCity);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(previousState => {
      if (!previousState) {
        sendTestNotification(DefaultCity);
      }
      return !previousState;
    });
  };


  const handleAddressChange = (address) => {
    setDefaultCity(address);
  };

  const handleSaveSettings = () => {
    saveSettings();
  };

  return (
    <ImageBackground source={require('./settingsbg.jpeg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.settingsContainer}>
          <Text style={styles.sectionHeader}>Notifications</Text>
          <View style={styles.settingRow}>
            <Text>Receive weather notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
            />
          </View>

          <Text style={styles.sectionHeader}>Default City</Text>
          <TextInput
            style={styles.input}
            value={DefaultCity}
            placeholder="Enter default address"
            onChangeText={handleAddressChange}
          />

          <Button title="Save" onPress={handleSaveSettings} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    blurRadius: 0,
  },
  settingsContainer: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    elevation: 3,
    marginBottom: 30
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
