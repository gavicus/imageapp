import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

const IconLabel = ({name, label, color}) => {
    return (
        <View style={styles.container}>
            <Icon
                name={name}
                type="ionicon"
                size={14}
                color={color}
                style={styles.iconStyle}
            />
            <Text style={styles.labelStyle}>{label}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
    },
    labelStyle: {
        fontSize: 12,
    },
    iconStyle: {
    },
})

export default IconLabel;
