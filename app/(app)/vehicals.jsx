import { View, Text, ScrollView, Alert, ActivityIndicator,} from 'react-native'
import React, { useEffect, useState } from 'react'

import { doc, getDocFromServer, onSnapshot } from 'firebase/firestore'
import { db } from '../../utils/firebaseConfig'
import { useAuth } from '../../context/authContext'

export default function Vehicals() {

  const {user}=useAuth()

  const [loading, setLoading] = useState(false)

  const [vehicals, setVehicals] = useState([])

  useEffect(() => { 
    (async () => {
      setLoading(true)
      try {

        onSnapshot(doc(db, 'users', user.uid), (doc) => {

          if(doc.exists()) {
            const data = doc.data()
            setVehicals(data.vehicals)
          }
        })
        
        const col= doc(db, 'users', user.uid)
        const docs = await getDocFromServer(col)
        if(docs.exists()) {
          const data = docs.data()
          setVehicals(data.vehicals)
          
        }

      }catch(e) {
        Alert.alert('Error', e.message)
      }
      finally {
        setLoading(false)
      
      }
    })()
  }, [])
  
  

  return (
    <ScrollView className='m-5'>
      {
        loading && <View className='h-[100px] w-full flex items-center justify-center'><ActivityIndicator size={'large'} color={'green'}/></View>
      }

      {
        !loading && vehicals.length === 0 && <Text className='text-center text-center'>No Vehicals</Text>
      }

      {!loading && vehicals.map((vehical,index) => (

        <View key={index} className='my-4 border p-5 flex items-center flex-row justify-between'>

          <View>
            <Text className='text-2xl font-bold capitalize'>{vehical.modelName}</Text>
            <Text className='capitalize'>Manufacture: {vehical.manfacture}</Text>
            <Text className='capitalize'>Fuel Type: {vehical.fuelType}</Text>
            <Text className='capitalize'>Number: {vehical.vehicalNumber}</Text>
          </View>
          {/* <Text className='font-bold text-blue-500'>Go</Text> */}

        </View>

      ))}

      
      
    </ScrollView>
  )
}
