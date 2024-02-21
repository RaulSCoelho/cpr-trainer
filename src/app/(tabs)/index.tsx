import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Accelerometer, Gyroscope } from 'expo-sensors'
import { Subscription } from 'expo-sensors/build/Pedometer'
import { Button } from '@/components/button'

export default function Home() {
  const [accelerationData, setAccelerationData] = useState({
    x: 0,
    y: 0,
    z: 0
  })
  const [accelerationSub, setAccelerationSub] = useState<Subscription | null>(null)
  const [gyroscopeData, setGyroscopeData] = useState({
    x: 0,
    y: 0,
    z: 0
  })
  const [gyroscopeSub, setGyroscopeSub] = useState<Subscription | null>(null)

  const _accelerometerSlow = () => Accelerometer.setUpdateInterval(1000)
  const _accelerometerFast = () => Accelerometer.setUpdateInterval(16)
  const _gyroscopeSlow = () => Gyroscope.setUpdateInterval(1000)
  const _gyroscopeFast = () => Gyroscope.setUpdateInterval(16)

  const _accelerometerSubscribe = () => {
    setAccelerationSub(Accelerometer.addListener(setAccelerationData))
  }

  const _accelerometerUnsubscribe = () => {
    accelerationSub && accelerationSub.remove()
    setAccelerationSub(null)
  }

  const _gyroscopeSubscribe = () => {
    setGyroscopeSub(
      Gyroscope.addListener(gyroscopeData => {
        setGyroscopeData(gyroscopeData)
      })
    )
  }

  const _gyroscopeUnsubscribe = () => {
    gyroscopeSub && gyroscopeSub.remove()
    setGyroscopeSub(null)
  }

  useEffect(() => {
    _accelerometerSubscribe()
    _gyroscopeSubscribe()
    return () => {
      _accelerometerUnsubscribe()
      _gyroscopeUnsubscribe()
    }
  }, [])

  return (
    <View className="flex-1 gap-4 justify-center items-center">
      <View className="gap-2">
        <Text>Acceleration Data:</Text>
        <Text>X: {accelerationData.x.toFixed(2)}</Text>
        <Text>Y: {accelerationData.y.toFixed(2)}</Text>
        <Text>Z: {accelerationData.z.toFixed(2)}</Text>
        <View className="flex flex-row gap-2 justify-between">
          <Button onPress={accelerationSub ? _accelerometerUnsubscribe : _accelerometerSubscribe}>
            {accelerationSub ? 'On' : 'Off'}
          </Button>
          <Button onPress={_accelerometerSlow}>Slow</Button>
          <Button onPress={_accelerometerFast}>Fast</Button>
        </View>
      </View>
      <View className="gap-2">
        <Text>Gyroscope Data:</Text>
        <Text>X: {gyroscopeData.x.toFixed(2)}</Text>
        <Text>Y: {gyroscopeData.y.toFixed(2)}</Text>
        <Text>Z: {gyroscopeData.z.toFixed(2)}</Text>
        <View className="flex flex-row gap-2 justify-between">
          <Button onPress={gyroscopeSub ? _gyroscopeUnsubscribe : _gyroscopeSubscribe}>
            {gyroscopeSub ? 'On' : 'Off'}
          </Button>
          <Button onPress={_gyroscopeSlow}>Slow</Button>
          <Button onPress={_gyroscopeFast}>Fast</Button>
        </View>
      </View>
    </View>
  )
}
