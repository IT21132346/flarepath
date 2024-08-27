import { ActivityIndicator, Alert, ScrollView,Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../utils/firebaseConfig'
import { doc, setDoc } from 'firebase/firestore'
import { SafeAreaView } from 'react-native-safe-area-context'

const Register = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [emailError, setEmailError] = React.useState(false)
  const [passwordError, setPasswordError] = React.useState(false)
  const [error, setError] = React.useState()
  const[loading, setLoading] = React.useState(false)
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false)

  const [username, setUsername] = useState('')
  const [usernameError, setusernameError] = useState(false)
  
  const [mobile, setMobile] = useState('')
  const [mobileError,setmobileError]=useState(false)


  const [id,setID]=useState(null)

  async function register_user() {

    setEmailError(false)
    setPasswordError(false)
    setConfirmPasswordError(false)
    setusernameError(false)

    if (username.length == 0) {
      setusernameError(true)
      return
    }

    if (email.length < 1) {
      setEmailError(true)
      return
    }
    if (password.length < 1) {
      setPasswordError(true)
      return
    }
    if (confirmPassword.length < 1) {
      setConfirmPasswordError(true)
      return
    }

    if (mobile.length !== 10) {
      setmobileError(true)
      Alert.alert("Validation Error","Mobile number must be only 10 digits")
      return
    }

    

    if (password !== confirmPassword) {
      setConfirmPasswordError(true)
      return
    }

    setLoading(true)

    try {

      const userCred = await createUserWithEmailAndPassword(auth, email, password)
      const userid = userCred.user.uid


      
      const docs=doc(db,'users',userid)

      await setDoc(docs, {
        username: username,
        mobile:mobile,
        vehicals:[]
      },{merge:true})

      setLoading(false)
      setID(userid)

    } catch (e) {
      setError(e)
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setUsername('')

      setLoading(false)
    }

  }
  
  

  return (

    <SafeAreaView>
    <ScrollView contentContainerStyle={{
      width: '100%',
      paddingBottom: 30,
      paddingTop:50,
    
    }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f2f5',marginHorizontal:30, }}>
        <View className='text-left w-full'>
          <Text className="text-4xl text-black font-bold mb-8 ">Let's Create an account</Text>
          <Text className="text-3xl  text-gray-400 font-semibold mb-4 ">Greate experience ahead</Text>
          {/* <Text className="text-3xl text-gray-400 font-semibold mb-8 ">You've been missed!</Text> */}
        </View>
        <View className='w-full'>
          {
            error && (

              
              <View className='my-2'>
                <Text className='text-red-700 text-center '>{error.message}</Text>
              </View>
            )
            
               
          }
          <View className='w-full mb-4'>
            <Text className="text-lg text-gray-500 font-semibold mb-2">Username</Text>
            <TextInput style={{
              borderColor:usernameError ? 'red' : 'gray'
            }} value={username} onChangeText={(e) => {
              setUsername(e)
            }} inputMode='text' className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Create an username" />
          </View>
          <View className='w-full mb-4'>
            <Text className="text-lg text-gray-500 font-semibold mb-2">Email</Text>
            <TextInput style={{
              borderColor:emailError ? 'red' : 'gray'
            }} value={email} onChangeText={(e) => {
              setEmail(e)
            }} inputMode='email' className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter your email" />
          </View>
          <View className='w-full mb-4'>
            <Text className="text-lg text-gray-500 font-semibold mb-2">Mobile Number</Text>
            <TextInput style={{
              borderColor:mobileError ? 'red' : 'gray'
            }} value={mobile} onChangeText={(e) => {
              setMobile(e)
            }} inputMode='email' className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Your mobile number" />
          </View>
          <View className='w-full mb-4'>
            <Text className="text-lg text-gray-500 font-semibold mb-2">Password</Text>
            <TextInput style={{
              borderColor:passwordError ? 'red' : 'gray'
            }} secureTextEntry value={password} onChangeText={(e) => {
              setPassword(e)
            }} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter your password" />
          </View>
          <View className='w-full mb-4'>
            <Text className="text-lg text-gray-500 font-semibold mb-2">Confirm Password</Text>
            <TextInput style={{
              borderColor:confirmPasswordError ? 'red' : 'gray'
            }} secureTextEntry value={confirmPassword} onChangeText={(e) => {
              setConfirmPassword(e)
            }}  className="w-full p-2 border border-gray-300 rounded-lg" placeholder="confirm your password" />
          </View>

          <View className='w-full my-5'>
            <TouchableOpacity disabled={loading} onPress={register_user} activeOpacity={0.5} className="p-2 rounded-lg bg-black flex flex-row items-center justify-center gap-x-2"  >
              {
                  loading && (
                    <ActivityIndicator color='white' size='large' />
                  )
              }
              <Text className=' text-center font-bold text-lg text-white '>
                
                {
                  !loading && 'Register'
                }
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-center text-gray-500 mt-4">Already have an account?
            <Link asChild href={'login'}>
              <Text className="text-blue-500"> login</Text>
            </Link>
          </Text>
          <Text className="text-center text-gray-500 mt-4">Go to index 
            <Link asChild href={'/'}>
              <Text className="text-blue-500"> index</Text>
            </Link>
          </Text>
        </View>
      </View>
      </ScrollView>
      </SafeAreaView>
  )
}

export default Register
