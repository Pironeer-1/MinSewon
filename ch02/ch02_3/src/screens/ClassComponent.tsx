//클래스 방식으로 구현하는 법
import React, {Component} from 'react'
import { Text } from 'react-native'
import * as D from '../data'

const person = D.CreateRandomPerson()
export default class ClassComponent extends Component {
    render() {
        return <Text>{JSON.stringify(person, null, 2)}</Text>
    }
}