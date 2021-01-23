import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    Modal,
} from 'react-native';

import styles from '../style/styles';
import { ModalBox, FAB, } from '../components'
import firestore from '@react-native-firebase/firestore';
import Colors from '../utils/colors';
import configs from '../Configs'


class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    _onPress = () => {
        this.props.onPressItem(this.props.item);
    }


    render = () => {
        const item = this.props.item;
        return (
            <View>
                <TouchableOpacity activeOpacity={0.7} onPress={() => this._onPress()}>
                    <View style={styles.cardContainer}>
                        <View style={styles.cardItemContainer}>
                            <View style={styles.cardImage}>

                                <Image
                                    style={styles.image100}
                                    source={{ uri: item.imagePath }}
                                    resizeMode={'stretch'}
                                />

                            </View>
                            <View style={styles.cardText}>
                                <Text style={styles.cardTitleText}>{item.title}</Text>
                                <View>
                                    <Text style={styles.cardDetailText}>{item.details}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.listSeparator} />
            </View>
        );

    }
}

export default class Dashboard extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            imageData: [],
            isLoading: true,
            isRefreshing: false,
            showImageModal: false,
            selectedImage: {}
        };

    }
    /*
     * Fetch images whenever user visits dashboard
     */
    componentDidMount() {

        this.props.navigation.addListener('willFocus', (payload) => {
            this.fetchimages();
        });
    }

    /*
     * Fetch Images that are stored on firestore
     */

    fetchimages = () => {
        firestore()
            .collection(configs.DATABASENAME)
            .orderBy('createdAt', 'desc')
            .get()
            .then(querySnapshot => {
                var arr = [];
                querySnapshot.forEach(documentSnapshot => {
                    arr.push(documentSnapshot.data());
                });
                this.setState({
                    imageData: arr,
                    isLoading: false,
                    isRefreshing: false
                })
            });
    }

    /*
     * Fetch Images after user pull to refresh
     */

    onRefresh = () => {
        this.setState({
            isRefreshing: true,
        },
            () => {
                this.fetchimages();
            });
    }

    /*
     * Show selected image in modal for better view
     */

    _onPressItem = (item) => {
        this.setState({
            selectedImage: item,
            showImageModal: true
        })
    };


    _keyExtractor = (item, index) => index.toString();

    _renderItem = ({ item, index }) => (
        <ListItem
            item={item}
            index={index}
            onPressItem={this._onPressItem}
        />
    );

    render = () => {
        const spinner = this.state.isLoading ? <View style={{ flex: 1, padding: 2 }}>
            <ActivityIndicator size="large" color={Colors.lightGreen} />
        </View> : null;

        return (
            <View style={styles.container}>
                {spinner}
                <View style={styles.dashboardListContainerPadding}>
                    <FlatList
                        data={this.state.imageData}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        removeClippedSubviews
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        onEndReachedThreshold={0.5}
                        ListEmptyComponent={!this.state.isLoading
                            ? <View style={{ alignSelf: 'center', paddingTop: '45%' }}>
                                <Text style={styles.exploreTitleText}>No records found.</Text>
                            </View>
                            : null}
                        refreshControl={
                            <RefreshControl
                                onRefresh={this.onRefresh}
                                title="Loading.."
                                tintColor={Colors.lightGreen}
                                titleColor={Colors.lightGreen}
                                colors={[Colors.lightGreen, Colors.backgroundColor]}
                                refreshing={this.state.isRefreshing}
                            />}
                    />
                </View>
                <FAB buttonColor={Colors.lightGreen} iconTextColor={Colors.lightTextColor} onClickAction={() => { this.props.navigation.navigate('postimage'); }} visible={true} />


                <Modal
                    animationType={"none"}
                    transparent={true}
                    style={{ flex: 1, margin: 0 }}
                    visible={this.state.showImageModal}
                    onRequestClose={() => { this.setState({ showImageModal: false }) }}
                >
                    <ModalBox
                        position={'center'}
                        isOpen={this.state.showImageModal}
                        style={styles.dashboardModal}
                        ref={'modal1'}
                        swipeToClose={false}
                        onClosed={() => { this.setState({ showImageModal: false }) }}
                        onOpened={this.onOpen}
                        onClosingState={() => { this.setState({ showImageModal: false }) }}>


                        <View>
                            <View style={styles.dashboardModalUpperPart}>
                                <View style={{ flex: 1 }}>
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ showImageModal: false })
                                    }}
                                    style={styles.dashboardModalCloseButton}>

                                    <Image
                                        style={styles.image25}
                                        source={require('../assets/images/closeIcon.png')}
                                        resizeMode={"contain"}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.dashboardModalMainImageContainer}>
                                <Image
                                    style={styles.dashboardModalMainImage}
                                    source={{ uri: this.state.selectedImage.imagePath }}
                                    resizeMode={'contain'}
                                />
                                <View style={styles.dashboardModalTextContainer}>
                                    <Text style={styles.cardTitleText}>{this.state.selectedImage.title}</Text>
                                    <View>
                                        <Text style={styles.cardDetailText}>{this.state.selectedImage.details}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </ModalBox>
                </Modal>
            </View>
        );
    }
}
