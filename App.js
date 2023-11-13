import { StyleSheet, Text, View, SafeAreaView, Platform, TouchableOpacity, } from 'react-native';
import { useEffect, useState } from 'react';
import Header from './src/components/Header';
import Timer from './src/components/Timer';
import { Audio } from 'expo-av';


const colors = [
  '#F7DC6F',
  '#A2D9CE',
  '#D7BDE2',
]

export default function App() {

  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currenTime, setCurrentTime] = useState('POMO' | '  SHORT' | 'BREAK');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime( time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    if (time === 0) {
      setIsActive(false);
      setIsWorking((prev) => !prev);
      setTime(isWorking ? 300 : 1500);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  function handleStartStop() {
    playSound();
    setIsActive(!isActive);
  }
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/mouse-click-117076.mp3')
    )
    await sound.playAsync();
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors[currenTime] }]}>
      <View style={{
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: Platform.OS === 'android' ? 40 : 0
      }}>
        <Text style={styles.text}>Pomodoro</Text>
        <Header
          currenTime={currenTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime} />
        <Timer time={time} />
        <TouchableOpacity style={styles.button} onPress={handleStartStop}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{isActive ? 'STOP' : 'START'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#333',
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 15,
  }
});
