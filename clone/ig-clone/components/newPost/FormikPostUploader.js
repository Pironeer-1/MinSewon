import { View, Text, Image, TextInput, Button } from 'react-native'
import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useState, useEffect } from 'react'
import { Divider } from 'react-native-elements'
import validUrl from 'valid-url'
import { db, firebase } from '../../firebase'

const PLACEHOLDER_IMG = 'https://fastly.picsum.photos/id/114/200/300.jpg?hmac=RsaHLtW_cVJ2g7oCf2cW_kkIsaHv3QPZgv81ZYH5-aA';

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required('A URL is required'),
    caption: Yup.string().max(2200, 'Caption has reached the character')
})

const FormikPostUploader = ({navigation}) => {
    const [thumbnailUrl, setThumbnailUrl] =useState(PLACEHOLDER_IMG)
    const [currentLogedInUser, setCurrentLogedInUser] = useState(null)

    const getUsername = () => {
        const user = firebase.auth().currentUser 
        const unsubscribe = db.collection('users').where('owner_uid', '===', user,uid).limit(1).onSnashot(
            snapshot => snapshot.docs.map(doc => {
                setCurrentLogedInUser({
                    username: doc.data().username,
                    profilePicture: doc.data().profile_picture
                })
            })
        )
        return unsubscribe
    }

    useEffect(() => {
        getUsername()
    }, [])

    const uploadPostToFirebase = (imageUrl, caption) => {
        const unsubscribe = db.collection('users').doc(firebase.auth().currentUser.email).collection('posts').add({
            imageUrl: imageUrl,
            user: currentLogedInUser.profilePicture,
            owner_uid: firebase.auth().currentUser.uid,
            owner_email: firebase.auth().currentUser.email,
            caption: caption,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            likes_by_users: [],
            comments: [],
        }).then(()=> navigation.goBack())

        return unsubscribe
    }

    return (
        <Formik
            initialValues={{caption: '', imageUrl: ''}}
            onSubmit={(values) => {
                uploadPostToFirebase(values.imageUrl, values.caption)
            }}
            validationSchema={uploadPostSchema}
            validateOnMount={true}
        >
            {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
                <>
                <View style={{margin: 20, justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Image 
                        source={{ uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : PLACEHOLDER_IMG }}
                        style={{width: 100, height: 100}}/>
               
                <View style={{ flex: 1, marginLeft: 12 }}>
                    <TextInput 
                        placeholder='Write a caption...' 
                        placeholderTextColor='gray' 
                        multiline={true}
                        style={{color: 'white', fontSize: 20}}
                        onChangeText={handleChange('caption')}
                        onBlur={handleBlur('caption')}
                        value={values.caption} />
                    </View>
                </View>

                <Divider width={0.2} orientation='vertical' />
                <TextInput
                    onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
                    style = {{ fontSize: 18 }}
                    placeholder='Enter Image Url' placeholderTextColor='gray'
                    onChangeText={handleChange('imageUrl')}
                    onBlur={handleBlur('imageUrl')}
                    value={values.imageUrl}/>
                    {errors.imageUrl && (
                        <Text style={{fontSize: 10, color: 'red'}}>
                            {errors.imageUrl}
                        </Text>
                    )}
                <Button onPress={handleSubmit} title='Share' disabled={!isValid} />
                </>
            )
             
            }
        </Formik>
    )
}

export default FormikPostUploader