import { View, Text,Image } from 'react-native'
import React, { useState } from 'react'

const AlertRecived = () => {

  const [type,setType]=useState(0)
  return (
    <View>
      <View className=' border p-5 flex items-center flex-row justify-between m-5'>

          <View>
            <Text className='text-2xl font-bold text-red-800 text-center'>Alert Recived!</Text>
            
          </View>
          <Text className='font-bold text-blue-500'>Go</Text>

      </View>
      <View className='flex m-5 items-center justify-center'>
        {
          type === 0 && (
            <Image  source={require('../../assets/images/car1.png')} style={{
              width: 300,
              height: 300,
              objectFit:'contain',
            }}/>
          )
        }
      </View>
    </View>
  )
}

export default AlertRecived
