import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {
    const [permission, requestPermission] = useCameraPermissions()
    const [torch, setTorch] = useState(false)

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Pressable style={styles.button} onPress={requestPermission}>
                    <Text style={styles.buttonText}>Grant Permission</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} enableTorch={torch} />
            <View style={styles.controls}>
                <Pressable style={styles.button} onPress={() => setTorch((t) => !t)}>
                    <Text style={styles.buttonText}>
                        {torch ? 'Turn Off' : 'Turn On'}
                    </Text>
                </Pressable>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    camera: {
        // flex: 1,
    },
    controls: {
        position: 'absolute',
        alignSelf: 'center',
        height: "100%",
        width: "100%",
    },
    button: {
        backgroundColor: '#374858ff',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '600',
    },
});
