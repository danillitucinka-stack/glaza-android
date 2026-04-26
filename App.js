import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform, Alert, Text } from 'react-native';
import { Camera, useCameraDevices, useCameraPermission } from 'react-native-vision-camera';

// Request camera permission on Android
const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Eye-Pro Camera Permission',
          message: 'Eye-Pro needs access to your camera for eye tracking',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    // For iOS, we rely on the permission hook
    return true;
  }
};

export default function App() {
  const { hasPermission } = useCameraPermission();
  const devices = useCameraDevices();
  const [deviceId, setDeviceId] = useState('');
  const cameraRef = useRef(null);

  // Request permission on mount
  useEffect(() => {
    (async () => {
      const granted = await requestCameraPermission();
      if (!granted) {
        Alert.alert('Permission denied', 'Camera permission is required to use Eye-Pro');
      }
    })();
  }, []);

  // Select the first back camera
  useEffect(() => {
    const backCamera = devices.find(device => device.position === 'back');
    if (backCamera) setDeviceId(backCamera.id);
  }, [devices]);

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <View style={styles.overlay}>
          <Text style={styles.text}>Camera permission is required</Text>
        </View>
      </View>
    );
  }

  if (!deviceId) {
    return null; // Waiting for devices or permission
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}
        deviceId={deviceId}
        isActive={true}
        frameProcessor={async ({ frame }) => {
          // TODO: Send frame to native C++ for processing via VisionCamera frame processor
          // This requires setting up a native frame processor module
          // For now, we just release the frame
          await frame.release();
        }}
      >
        {/* Overlay for calibration points */}
        <View style={styles.overlay}>
          {/* Top-left point */}
          <View style={[styles.point, styles.topLeft]} />
          {/* Top-right point */}
          <View style={[styles.point, styles.topRight]} />
          {/* Bottom-left point */}
          <View style={[styles.point, styles.bottomLeft]} />
          {/* Bottom-right point */}
          <View style={[styles.point, styles.bottomRight]} />
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  point: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
  },
  topLeft: {
    position: 'absolute',
    top: 100,
    left: 100,
  },
  topRight: {
    position: 'absolute',
    top: 100,
    right: 100,
  },
  bottomLeft: {
    position: 'absolute',
    bottom: 100,
    left: 100,
  },
  bottomRight: {
    position: 'absolute',
    bottom: 100,
    right: 100,
  },
});