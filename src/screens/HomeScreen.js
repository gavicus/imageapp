import React, {useEffect, useState} from 'react'
import {
    StyleSheet,
    View,
    FlatList
} from 'react-native';

import Header from '../components/Header';
import ImageCard from '../components/ImageCard';
import ImageDetail from '../components/ImageDetail';

const HomeScreen = () => {
    const [images, setImages] = useState([]);
    const [query, setQuery] = useState('');
    const [orientation, setOrientation] = useState('any');
    const [color, setColor] = useState('any');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selection, setSelection] = useState(null);

    useEffect(() => {
        const getMenuItems = async () => {
            if (totalPages > 0 && page >= totalPages) { return; }
            let url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}`;
            if (!orientation.startsWith('any')) {
                url = `${url}&orientation=${orientation}`;
            }
            if (!color.startsWith('any')) {
                url = `${url}&color=${color}`;
            }
            try {
                const headers = {
                    'Authorization': 'Client-ID 08nb2gP3yoEVsQxTgDoj9ak8H9QrfmHnxoT2BhZ4fv0'
                }
                const response = await fetch(url, {headers});
                const data = await response.json();
                if (page === 1) { setImages(data.results); }
                else { setImages([...images, ...data.results]); }
                setTotalPages(data.total_pages);
            } catch (error) {
                console.error("error", error);
            }
        }

        getMenuItems();
    }, [page, query, orientation, color])

    function fetchMoreData() {
        setPage(page + 1);
    }

    function onSearchChange(text) {
        setPage(1);
        setQuery(text);
    }

    function onPressThumb(data) {
        setSelection(data);
    }

    function onOrientation(value) {
        setPage(1);
        setOrientation(value);
    }

    function onColor(value) {
        setPage(1);
        setColor(value);
    }

    function showThumbs() {
        return (
            <View style={styles.container}>
                <Header
                    onChange={onSearchChange}
                    onOrientation={onOrientation}
                    value={query}
                    onColor={onColor}
                />
                {
                    images &&
                    <FlatList
                        data={images}
                        keyExtractor={(item) => item.id}
                        renderItem={(item) => <ImageCard data={item} onPress={onPressThumb} />}
                        onEndReached={fetchMoreData}
                    />
                }
            </View>
        );
    }

    function onPressImage() {
        setSelection(null);
    }

    return selection ? <ImageDetail data={selection} onPress={onPressImage} /> : showThumbs();
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#302825',
      alignItems: 'center',
    },
  });
  
export default HomeScreen;
