import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, TextInput, Button} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const Header = ({onChange, onOrientation, onColor}) => {
    const [query, setQuery] = useState('');

    function onChangeText(value) {
        setQuery(value);
    }

    function onClickButton () {
        onChange(query);
    }

    function onChangeOrientation (selectedItem, index) {
        onOrientation(selectedItem);
    }

    function onChangeColor (selectedItem, index) {
        onColor(selectedItem)
    }

    return <View style={styles.container}>
        <View style={styles.row}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={query}
            />
            <Button title="Search" onPress={onClickButton} />
        </View>
        <View style={styles.row}>
            <SelectDropdown
                data={['any color', 'black_and_white', 'black', 'white', 'yellow', 'orange', 'red', 'purple', 'magenta', 'green', 'teal', 'blue']}
                onSelect={onChangeColor}
                defaultButtonText='color'
            />
            <SelectDropdown
                data={['any orientation', 'landscape', 'portrait', 'squarish']}
                onSelect={onChangeOrientation}
                defaultButtonText='orientation'
            />
        </View>
    </View>
}

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        width: deviceWidth,
        height: 160,
        backgroundColor: '#baa',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        flexDirection: 'column',
        gap: 10,
    },
    row: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 10px',
    },
    input: {
        height: 50,
        width: deviceWidth * .7,
        borderWidth: 1,
        backgroundColor: '#fff',
        paddingLeft: 10,
    },
})

export default Header;
