
import React from 'react'
import {
    View, Text, StyleSheet, Dimensions, Image, Pressable,
    Button,
} from 'react-native';

import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

function ImageDetail ({data, onPress}) {
    function onPressImage() {
        onPress();
    }

    async function onPressDownload() {
        const { uri } = await FileSystem.downloadAsync(
            data.item.urls.full,
            `${FileSystem.documentDirectory}${data.item.slug}.jpg`
          ).catch((e) =>
            console.log('share failed', JSON.stringify(e), url)
          )
          const permission = await MediaLibrary.requestPermissionsAsync()
          if (permission.granted) {
            try {
              const asset = await MediaLibrary.createAssetAsync(uri)
              MediaLibrary.createAlbumAsync('Images', asset, false)
                .then(() => {
                  console.log('File Saved Successfully!')
                  Toast.show('image save success!!', {
                    duration: 1000,
                  });
                })
                .catch(() => {
                  console.log('Error In Saving File!')
                })
            } catch (error) {
              console.log(error)
            }
          } else {
            console.log('Need Storage permission to save file')
          }
    }

    return (
        <View>
            <Pressable onPress={onPressImage}>
                <Image
                    style={{height: deviceHeight, width: deviceWidth}}
                    source={{uri: data.item.urls.full}}
                />
            </Pressable>
            <View style={styles.overlay}>
                <Text style={styles.username}>{data.item.user.name}</Text>
                {
                    data.item.description &&
                    <Text>{data.item.description}</Text>
                }
                {
                    data.item.alt_description &&
                    <Text>{data.item.alt_description}</Text>
                }
                {
                    data.item.tags && data.item.tags.length > 0 &&
                    <Text>tags: {
                        data.item.tags
                        .map(t => t.title)
                        .join(", ")
                    }</Text>
                }
                <Text>likes: {data.item.likes}</Text>
                <Button title="Download" onPress={onPressDownload} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        padding: 20,
        paddingTop: 40,
        backgroundColor: "rgba(255,255,255,0.5)",
        borderBottomEndRadius: 20,
        width: deviceWidth * 0.7,
    },
    username: {
        fontWeight: '500',
        marginBottom: 10,
    },
});

export default ImageDetail;
