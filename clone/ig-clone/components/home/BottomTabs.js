import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Divider } from 'react-native-elements'

export const bottomTabIcons = [
    {
        name: 'Home',
        inactive: '../../assets/icons/bottom-home-inactive.png',
        active: '../../assets/icons/bottom-home-active.png'
    },
    {
        name: 'Search',
        inactive: '../../assets/icons/bottom-search-inactive.png',
        active: '../../assets/icons/bottom-search-active.png'
    },
    {
        name: 'Reels',
        inactive: '../../assets/icons/bottom-igreel-inactive.png',
        active: '../../assets/icons/bottom-igreel-active.png'
    },
    {
        name: 'Shop',
        inactive: '../../assets/icons/bottom-shopping-inactive.png',
        active: '../../assets/icons/bottom-shopping-active.png',
    },    
    {
        name: 'Profile',
        inactive: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg',
        active: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'
    },    
]

const BottomTabs = ({icons}) => {
    const [activeTab, setActiveTab] = useState('Home')

    const Icon = ({icon}) => {
        <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
            <Image source={activeTab === icon.active ? icon.inactive : icon.active}
                   style={[ styles.icon,
                    icon.name === 'Profile' ? styles.profilePic() : null,
                    activeTab === 'Profile' && icon.name === activeTab ?
                    styles.profilePic(activeTab) : null ]} />
        </TouchableOpacity>
    }
    return (
        <View style={styles.wrapper}>
            <Divider width={1} orientation='vertical' />
            <View style={styles.container}>
                {icons.map((icon, idx) => (
                    <Icon key={idx} icon={icon} />
                ))}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute', 
        width: '100%', 
        bottom: '3%',
        zIndex: 999, 
        backgroundColor: '#000',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
        paddingTop: 10,
    },
    icon:{
        width: 30, 
        height: 30,
    },
    profilePic: (activeTab = '') => ({
        borderRadius: 50,
        borderWidth: activeTab === 'Profile' ? 2 : 0,
        borderColor: '#000'
    }),
})

export default BottomTabs