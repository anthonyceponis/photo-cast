import React, { useState, useEffect } from 'react';
import { View, Text, Switch, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [homeAddress, setHomeAddress] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const notificationsSetting = await AsyncStorage.getItem('notificationsEnabled');
      setNotificationsEnabled(notificationsSetting === 'true');

      const storedHomeAddress = await AsyncStorage.getItem('homeAddress');
      if (storedHomeAddress !== null) {
        setHomeAddress(storedHomeAddress);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem('notificationsEnabled', notificationsEnabled.toString());
      await AsyncStorage.setItem('homeAddress', homeAddress);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(previousState => !previousState);
  };

  const handleAddressChange = (address) => {
    setHomeAddress(address);
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
            value={homeAddress}
            placeholder="Enter default city"
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
    backgroundColor: '#fff',
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