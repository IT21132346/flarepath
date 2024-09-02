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
    <div>
      
    </div>

  )
}

export default UserHome
