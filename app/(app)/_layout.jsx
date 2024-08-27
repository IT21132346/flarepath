
import React from 'react'
import { Redirect, useRouter} from 'expo-router'
import { useAuth } from '../../context/authContext'
import {Drawer} from 'expo-router/drawer'
import { Alert, Text, TouchableOpacity,View } from 'react-native'
import { AlertCircle, CarFrontIcon, ExternalLink, HomeIcon, Plus, User } from 'lucide-react-native'
import { signOut } from 'firebase/auth'
import { auth } from '../../utils/firebaseConfig'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const AppLayout = () => {
  const router = useRouter()
  const {user,isAuthenticated,setUser,setAuthenticated}=useAuth()

  async function logout() {

    try {
      await signOut(auth)
      setUser(null)
      setAuthenticated(false)
      
    } catch (error) {
      Alert.alert('Error', error.message)
    }
    
    
  }

  
 
  if(!isAuthenticated || !user){
    return <Redirect href={'/login'}/>
  }

  return <GestureHandlerRootView style={{ flex: 1 }}>
     <Drawer initialRouteName='home' screenOptions={{

headerRight: () => {
  
  return (
    <TouchableOpacity className='m-4' onPress={() => {
      logout()
    }}>
      <ExternalLink size={25} color={'#000'} />
    </TouchableOpacity>
  )
}
}}>
<Drawer.Screen name='home' options={{
  drawerIcon:()=><HomeIcon size={25} color={'#000'} />,
  title: 'Home',
}} />
<Drawer.Screen name='vehicals' options={{
  title: 'My Vehicals',
    headerTitle: "My Vehicals",
    drawerIcon:()=><CarFrontIcon size={25} color={'#000'} />,
    headerRight: () => (
      <View className='mr-5'>
        <TouchableOpacity onPress={() => router.push('/vehical-reg')}>
          <Plus size={25} color={'black'} />
        </TouchableOpacity>
      </View>
    )
}}/>
<Drawer.Screen name='vehical-reg' options={{
  title: 'Add Vehicle',
  drawerIcon:()=><Plus size={25} color={'#000'}/>
}} />
<Drawer.Screen name='profile' options={{
  title: 'Profile',
  drawerIcon:()=><User size={25} color={'#000'}/>
}} />
<Drawer.Screen name='alert-recived' options={{
  title: 'Alert',
  drawerIcon:()=><AlertCircle size={25} color={'#000'}/>
}}/>
</Drawer>
  </GestureHandlerRootView>
}

export default AppLayout
