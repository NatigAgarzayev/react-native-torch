import * as Brightness from 'expo-brightness'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'

export default function App() {
    const [permission, requestPermission] = useCameraPermissions()
    const [torch, setTorch] = useState(false)
    const [isFront, setIsFront] = useState<boolean>(false)
    const [deviceBrightness, setDeviceBrightness] = useState<number | null>(null)

    useEffect(() => {
        (async () => {
            const { status } = await Brightness.requestPermissionsAsync()
            const brightness = await Brightness.getBrightnessAsync()
            console.log("system_brightness =", brightness)
            if (status === 'granted') {
                setDeviceBrightness(brightness)
            }
        })()
    }, [])

    useEffect(() => {
        if (isFront) {
            Brightness.setBrightnessAsync(1)
        }
        else {
            Brightness.setBrightnessAsync(deviceBrightness || 0.5)
        }
    }, [isFront])


    if (!permission) {
        return <View />
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Pressable style={styles.button} onPress={requestPermission}>
                    <Text style={styles.buttonText}>Grant Permission</Text>
                </Pressable>
            </View>
        )
    }




    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} enableTorch={torch} />
            <View style={styles.headlineTextContainer}>
                <Text style={styles.headlineText}>
                    {isFront ? 'Front light' : 'Back light'}
                </Text>
            </View>
            {
                isFront ?
                    <View style={styles.frontControls}></View>
                    :
                    <View style={styles.controls}>
                        <Pressable style={styles.button} onPress={() => setTorch((t) => !t)}>
                            <Text style={styles.buttonText}>
                                {torch ? 'Turn Off' : 'Turn On'}
                            </Text>
                        </Pressable>
                    </View>
            }
            <View style={styles.switchControls}>
                <Pressable style={styles.switchButton} onPress={() => setIsFront((f) => !f)}>
                    <Text style={styles.buttonText}>
                        <Svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={isFront ? "#000" : "#fff"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><Path d="M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" /><Path d="M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5" /><Circle cx="12" cy="12" r="3" /><Path d="m18 22-3-3 3-3" /><Path d="m6 2 3 3-3 3" /></Svg>
                    </Text>
                </Pressable>
            </View>

        </View>
    )
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
    frontControls: {
        position: 'absolute',
        alignSelf: 'center',
        height: "100%",
        width: "100%",
        backgroundColor: "#fff"
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
    buttonFront: {
        backgroundColor: '#fff',
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
    switchControls: {
        position: 'absolute',
        bottom: 50,
        right: 20,
        zIndex: 10,
        padding: 10,
    },
    switchButton: {
    },
    headlineTextContainer: {
        position: 'absolute',
        top: 50,
        zIndex: 10,
        alignSelf: 'center',
    },
    headlineText: {
        fontSize: 18,
        color: '#fff',
    }
})
