//함수 방식 구현
// const ArrowComponent = () => {
//     return null
// }
// export default ArrowComponent

import React from 'react'
import {Text} from 'react-native'
import * as D from '../data'

const person = D.CreateRandomPerson()
const ArrowComponent = () => {
    return <Text>{JSON.stringify(person, null, 2)}</Text>
}
export default ArrowComponent