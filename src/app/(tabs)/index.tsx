import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Accelerometer, Gyroscope } from "expo-sensors";
import { Subscription } from "expo-sensors/build/Pedometer";

export default function Home() {
  const [accelerationData, setAccelerationData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [accelerationSub, setAccelerationSub] = useState<Subscription | null>(
    null
  );
  const [gyroscopeData, setGyroscopeData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [gyroscopeSub, setGyroscopeSub] = useState<Subscription | null>(null);

  const _accelerometerSlow = () => Accelerometer.setUpdateInterval(1000);
  const _accelerometerFast = () => Accelerometer.setUpdateInterval(16);
  const _gyroscopeSlow = () => Gyroscope.setUpdateInterval(1000);
  const _gyroscopeFast = () => Gyroscope.setUpdateInterval(16);

  const _accelerometerSubscribe = () => {
    setAccelerationSub(Accelerometer.addListener(setAccelerationData));
  };

  const _accelerometerUnsubscribe = () => {
    accelerationSub && accelerationSub.remove();
    setAccelerationSub(null);
  };

  const _gyroscopeSubscribe = () => {
    setGyroscopeSub(
      Gyroscope.addListener((gyroscopeData) => {
        setGyroscopeData(gyroscopeData);
      })
    );
  };

  const _gyroscopeUnsubscribe = () => {
    gyroscopeSub && gyroscopeSub.remove();
    setGyroscopeSub(null);
  };

  useEffect(() => {
    _accelerometerSubscribe();
    _gyroscopeSubscribe();
    return () => {
      _accelerometerUnsubscribe();
      _gyroscopeUnsubscribe();
    };
  }, []);

  return (
    <View className="flex-1 gap-4 justify-center items-center">
      <View className="gap-2">
        <Text>Acceleration Data:</Text>
        <Text>X: {accelerationData.x.toFixed(2)}</Text>
        <Text>Y: {accelerationData.y.toFixed(2)}</Text>
        <Text>Z: {accelerationData.z.toFixed(2)}</Text>
        <View className="flex flex-row gap-2 justify-between">
          <TouchableOpacity
            onPress={
              accelerationSub
                ? _accelerometerUnsubscribe
                : _accelerometerSubscribe
            }
            className=""
          >
            <Text>{accelerationSub ? "On" : "Off"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_accelerometerSlow} className="">
            <Text>Slow</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_accelerometerFast} className="">
            <Text>Fast</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="gap-2">
        <Text>Gyroscope Data:</Text>
        <Text>X: {gyroscopeData.x.toFixed(2)}</Text>
        <Text>Y: {gyroscopeData.y.toFixed(2)}</Text>
        <Text>Z: {gyroscopeData.z.toFixed(2)}</Text>
        <View className="flex flex-row gap-2 justify-between">
          <TouchableOpacity
            onPress={gyroscopeSub ? _gyroscopeUnsubscribe : _gyroscopeSubscribe}
            className=""
          >
            <Text>{gyroscopeSub ? "On" : "Off"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_gyroscopeSlow} className="">
            <Text>Slow</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_gyroscopeFast} className="">
            <Text>Fast</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
