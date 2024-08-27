import { View, Text, Alert, TextInput, ActivityIndicator, Modal, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import {  db } from '../../utils/firebaseConfig'
import { useAuth } from '../../context/authContext'
import {  updateEmail } from 'firebase/auth'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { User2 } from 'lucide-react-native'

const Profile = () => {

  const [loading,setLoading]=useState(false)

  const [data, setData] = useState({
    username: '',
    email: '',
    mobile:'',
  })

  const { user } = useAuth()
  


  useEffect(() => {
    
    (async function () {

      setLoading(true)

      try {
        const col = collection(db, 'users')
        const DOC = doc(col, user.uid)
        
        const d = await getDoc(DOC)
        if (d.exists()) {
          
          const userData = d.data()
          setData({
            email: user.email,
            mobile: userData?.mobile,
            username:userData?.username
          })
        }
      } catch (e) {
        Alert.alert("Error Fetching Data",e.message)
      } finally {
        setLoading(false)
      }
      
    })()
  }, [])
  

  async function Save() {


    if(data.username==='' || data.username==='' || data.username===''){
      Alert.alert("Error","All the fields are required!")
      return
    }
    setLoading(true)
    try {
      const col = collection(db, 'users')
      const DOC = doc(col, user.uid)
      await updateEmail(user, data.email)
      await updateDoc(DOC, {
        mobile: data.mobile,
        username: data.username
      })
      Alert.alert("Success","Profile Updated Successfully")
    } catch (e) {
      Alert.alert("Error Updating Profile",e.message)
    } finally {
      setLoading(false)
    }
  }

  return loading ? 
    (
      <View className='flex items-center justify-center mt-20'>
        <ActivityIndicator size="large" color="#00FF00" />
      </View>
    )

  : (
      <View className='flex items-center justify-center'>
        <View className='m-5 flex items-center justify-center'>
          <TouchableOpacity activeOpacity={0.5} className='rounded-full bg-gray-600 p-6'>
            <User2 size={80} color={'white'}/>
          </TouchableOpacity>
          <TextInput className='font-bold mt-4 text-3xl pb-1 border-b-2 border-gray-600'
            value={data.username}
            onChangeText={(e)=>setData({...data,username:e})}
          
          />
        </View>
        <View className=' flex items-center mx-10'>
          
          <View className='flex flex-row items-center justify-between w-full'>
            <Text className='text-2xl font-bold w-1/3'>Email: </Text>
            <TextInput className='text-2xl pb-1 border-b-2 border-gray-600'
              value={data.email}
              onChangeText={(e)=>setData({...data,email:e})}
            
            />
          </View>
          <View className='flex flex-row items-center justify-between mt-5 w-full'>
            <Text className='text-2xl font-bold w-1/3'>Mobile: </Text>
            <TextInput className=' text-2xl pb-1 border-b-2 border-gray-600'
              value={data.mobile}
              onChangeText={(e)=>setData({...data,mobile:e})}
            
            />
          </View>
        </View>
        <View className='flex flex-row gap-4 items-center justify-center mt-20'>
          <TouchableOpacity
            onPress={() => {
              Save()
            }}
            activeOpacity={0.5} className="p-3 rounded-lg" style={{
            backgroundColor: '#000',
          }} >
            <Text style={{
                color:'#FFF'
              }} className=' text-center font-bold text-lg'>Save Changes</Text>
          </TouchableOpacity>
          
        </View>

        

      </View>
  )
  
}

export default Profile
