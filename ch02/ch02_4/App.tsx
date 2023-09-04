import React from 'react'
import {SafeAreaView, Alert, Button} from 'react-native'
import { TouchableOpacity, TouchableHighlight, Text } from 'react-native'
import { TextInput } from 'react-native'

//버튼 구현
// export default function App() {
//   return (
//     <SafeAreaView>
//       <Button title='home'
//         onPress={() => Alert.alert('home pressed', 'message')}/>
//     </SafeAreaView>
//   )
// }


//Touchable로 버튼 구현
//const onPress = () => Alert.alert('home pressed', 'message')
// export default function App() {
//   return (
//     <SafeAreaView>
//       <Button title='Home' onPress={onPress} />
//       <TouchableOpacity onPress={onPress}>
//         <Text>TouchableOpacity</Text>
//       </TouchableOpacity>
//       <TouchableHighlight onPress={onPress}>
//         <Text>TouchableHighlight</Text>
//       </TouchableHighlight>
//     </SafeAreaView>
//   )
// }


//그냥 Text를 버튼처럼
// export default function App() {
//   return (
//     <SafeAreaView>
//       <Text onPress={onPress}>Press me</Text>
//     </SafeAreaView>
//   )
// }

//함수 시그니쳐
const onPress = () => Alert.alert('home pressed', 'message')

export default function App() {
  return (
    <SafeAreaView>
      <Button title='Home' onPress={onPress} />
      <TouchableOpacity onPress={onPress}>
        <Text>TouchableOpacity</Text>
      </TouchableOpacity>
      <TouchableHighlight onPress={onPress}>
        <Text>TouchableHighlight</Text>
      </TouchableHighlight>
      <TextInput
        placeholder='enter your name'
        onChangeText={(text: string) => console.log(text)}
        onFocus={() => console.log('onFocus')}
        onBlur={() => console.log('onBlur')}
        onEndEditing={() => console.log('onEndEditing')}
      />
    </SafeAreaView>
  )
}