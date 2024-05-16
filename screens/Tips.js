import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';

// Placeholder image, replace with your actual image path
const backgroundImage = require('./tipsbg.jpeg');

export function TipsScreen() {
  const [tip, setTip] = useState('');

  const tips = {
    goldenHour: {
      title: 'Golden Hour Photography',
      content: `Golden hour is the period shortly after sunrise and before sunset when the sunlight is softer and warmer.
- Plan your shoot ahead of time.
- Use a tripod for stability.
- Experiment with different angles.
- Capture silhouettes by positioning your subject against the light.
- Adjust your camera settings to make the most of the lighting conditions.`
    },
    night: {
      title: 'Night Photography',
      content: `Night photography can be challenging but rewarding.
- Use a tripod to avoid camera shake.
- Set a long exposure to capture more light.
- Increase ISO settings, but be cautious of noise.
- Use a wide aperture to let in more light.
- Experiment with light trails and star photography.`
    },
    portrait: {
      title: 'Portrait Photography',
      content: `Portrait photography focuses on capturing the personality of a person or group.
- Use natural light where possible.
- Focus on the eyes of your subject.
- Use a wide aperture to create a blurred background.
- Engage with your subject to capture genuine expressions.
- Experiment with different compositions and angles.`
    },
    landscape: {
      title: 'Landscape Photography',
      content: `Landscape photography captures the beauty of the natural world.
- Use a wide-angle lens for expansive views.
- Include foreground elements to add depth.
- Use a small aperture for greater depth of field.
- Consider the rule of thirds for composition.
- Shoot during golden hour for the best lighting.`
    },
    macro: {
      title: 'Macro Photography',
      content: `Macro photography involves capturing close-up details of small subjects.
- Use a dedicated macro lens or extension tubes.
- Ensure good lighting, using diffused light if possible.
- Use a tripod to avoid camera shake.
- Focus manually for precision.
- Experiment with different angles and perspectives.`
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Photography Tips and Tricks</Text>
        <TouchableOpacity style={styles.button} onPress={() => setTip('goldenHour')}>
          <Text style={styles.buttonText}>Golden Hour</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setTip('night')}>
          <Text style={styles.buttonText}>Night Photography</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setTip('portrait')}>
          <Text style={styles.buttonText}>Portrait Photography</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setTip('landscape')}>
          <Text style={styles.buttonText}>Landscape Photography</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setTip('macro')}>
          <Text style={styles.buttonText}>Macro Photography</Text>
        </TouchableOpacity>
        {tip ? (
          <View style={styles.tipContainer}>
            <Text style={styles.tipTitle}>{tips[tip].title}</Text>
            <Text style={styles.tipContent}>{tips[tip].content}</Text>
          </View>
        ) : (
          <Text style={styles.tipPlaceholder}>Select a tip to see more details.</Text>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  tipContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 8,
    width: '100%',
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  tipContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#fff',
  },
  tipPlaceholder: {
    marginTop: 20,
    fontSize: 16,
    color: '#ddd',
  },
});

export default TipsScreen;
