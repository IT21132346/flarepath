import { View, Text,TextInput,Button, Alert, ActivityIndicator } from 'react-native'
import React,{useState} from 'react'
import { Drawer } from 'expo-router/drawer';
import {  Plus } from 'lucide-react-native';
import { db } from '../../utils/firebaseConfig';
import { addDoc, arrayUnion, collection, doc,setDoc,updateDoc } from 'firebase/firestore';
import { useAuth } from '../../context/authContext';

const VehicalRegistration = () => {

  const [values, setValues] = useState({
    manfacture: '',
    modelName: '',
    fuelType: '',
    vehicalNumber:''
  })

  const [loading, setLoading] = useState(false)

  const {user}=useAuth()

  async function handleSubmit() {

    console.log(values)

    if (values.fuelTypename==='' || values.manfacture==='' ||
      values.modelName==='' || values.vehicalNumber==='') {
      return Alert.alert('Please fill all fields','all the fields are required')
    }

    setLoading(true)
    
    try {
      const col = collection(db, 'users')
      
      const d = doc(col, user.uid)
      
      await updateDoc(d, {
        vehicals: arrayUnion({
          ...values
        })
      })
    

      Alert.alert('Vehical added successfully', "Vehical has been saved successfull!", 
        [
          {
            text: "Ok",
          }
        ]
        
      )
      
    } catch (error) {
      
      Alert.alert('Error adding vehical', error.message);

    } finally {
      setValues({
        fuelType: '',
        manfacture: '',
        modelName: '',
        vehicalNumber:''
      })
      setLoading(false)
    }


  }
  return (
    <View className={`p-4 bg-gray-100 rounded-lg shadow-md m-5`}>
      
      <View className=''>
        <Text className='text-3xl font-light mb-5'>Add your vehicals</Text>
        <TextInput
              value={values.manfacture}
              onChangeText={(e)=>{setValues({...values,manfacture:e})}}
              placeholder="Manufacture"
              className={`border border-gray-300 rounded-md p-2 mb-4`}
          />
        <TextInput
            value={values.modelName}
                onChangeText={(e)=>{setValues({...values,modelName:e})}}
            placeholder="Vehicle Model"
            className={`border border-gray-300 rounded-md p-2 mb-4`}
        />
        <TextInput
            value={values.vehicalNumber}
                onChangeText={(e)=>{setValues({...values,vehicalNumber:e})}}
            placeholder="Vehicle Number"
            className={`border border-gray-300 rounded-md p-2 mb-4`}
        />
        <TextInput
            value={values.fuelType}
                onChangeText={(e)=>{setValues({...values,fuelType:e})}}
            placeholder="Vehicle Fuel Type"
            className={`border border-gray-300 rounded-md p-2 mb-4`}
        />
        {
          loading ? <ActivityIndicator size={'large'} color={'green'}/> : <Button title='Add Vehical' onPress={handleSubmit}/>
          }
      </View>
    </View>
  )
}

export default VehicalRegistration
