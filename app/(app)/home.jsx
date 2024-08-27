import { View, Text} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useRouter } from 'expo-router'
import { Drawer } from 'expo-router/drawer'
import * as Location from 'expo-location';
import { HomeIcon } from 'lucide-react-native'



const UserHome = () => {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [ad,setAd]=useState('')

  const router = useRouter()


   useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      try {
        const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY}`)

        setAd(res.data.results[0].formatted_address.split(',')[1])
      } catch (e) {
        setErrorMsg('Error in fetching location')
      }

      
      
    })();
  }, []);
  
  
  return (

    <View className={`flex flex-col bg-gray-100 p-4`}>

      <Drawer.Screen options={{
        
        
        headerTitle: () => (
          <View className={`flex flex-row items-center`}>
            <Text className='font-bold text-2xl'>FLARE</Text>
            <Text className='text-red-800 text-2xl font-bold ml-3'>PATH</Text>
          </View>
        )
      }} />
      <View className={`flex flex-row justify-between items-center border my-4 p-6`}>
        <Text className={`text-xl`}>Current Tempearture</Text>
        <Text className={`text-xl`}>32 c</Text>
      </View>
      <View className={`flex flex-row justify-between items-center border my-4 p-6`}>
        <Text className={`text-xl`}>Current Location</Text>
        <Text className={`text-xl`}>{ad}</Text>
      </View>
      <View className={`flex flex-col pt-4 space-y-4`}>
        <View className={`flex flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md`}>
          <Text className={`text-xl font-bold`}>My Profile</Text>
          <Text className={`font-bold text-blue-500`} onPress={() => {
            router.push('profile')
          }}>Go</Text>
        </View>
        <View className={`flex flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md`}>
          <Text className={`text-xl font-bold`}>My Vehicles</Text>
          <Text className={`font-bold text-blue-500`} onPress={()=>router.push('vehicals')}>Go</Text>
        </View>
        <View className={`flex flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md`}>
          <Text className={`text-xl font-bold`}>Add Vehicle</Text>
          <Text className={`font-bold text-blue-500`} onPress={()=>router.push('vehical-reg')}>Go</Text>
        </View>
      </View>
    </View>

  )
}

export default UserHome
