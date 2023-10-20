import React from 'react'
import {View, StyleSheet, Dimensions, Image, Pressable} from 'react-native';

const ImageCard = ({data, onPress}) => {
    function onPressImage() {
        onPress(data);
    }

    return (
        <View>
            {data &&
            <>
            { data.item.urls &&
            <Pressable onPress={onPressImage}>
                <Image
                    style={styles.thumbStyle}
                    source={{uri: data.item.urls.thumb}}
                />
            </Pressable>
            }
            </>
            }
        </View>
    );
};

const deviceWidth = Dimensions.get('window').width;
const radius = 20;
const gutter = 20;

const styles = StyleSheet.create({
    thumbStyle: {
        width: deviceWidth * 0.6,
        height: deviceWidth * 0.6,
        marginBottom: 20,
        borderRadius: 20,
    },
})

export default ImageCard;
