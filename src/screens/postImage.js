import React, { Component } from 'react'
import { Image, View, TextInput, TouchableOpacity, Text, SafeAreaView, ScrollView, Dimensions, Modal, Platform, ActivityIndicator, Alert } from 'react-native'
import Colors from '../utils/colors';
import styles from '../style/styles';
import ImageCropPicker from 'react-native-image-crop-picker';
import { ModalBox, } from '../components'
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import configs from '../Configs'

const window = Dimensions.get("screen");
//Provided options while capturing or selecting images
const imagePickerOptions = {
    width: window.width,
    height: 420,
    cropping: false,
    multiple: false,
    includeExif: false,
    avoidEmptySpaceAroundImage: true,
    mediaType: configs.SELECTFILETYPE,
    freeStyleCropEnabled: false,
    cropperCircleOverlay: false,
    hideBottomControls: true,
    enableRotationGesture: false,
    compressImageQuality: 0.8
}
export default class PostImage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            image: this.props.navigation.state.params && this.props.navigation.state.params.image ? this.props.navigation.state.params.image : null,
            title: '',
            details: '',
            showChooseImageModal: false,
            isLoading: false
        }
    }
    onChangeTitle = title => {
        this.setState({ title })
    }
    onChangeDetails = details => {
        this.setState({ details })
    }

    /*
     * Upload image to firebase storage and save its path to firestore
     */

    uploadImage = async () => {
        this.setState({ isLoading: true })
        const filename = this.state.image.substring(this.state.image.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? this.state.image.replace('file://', '') : this.state.image;
        const task = storage()
            .ref(filename)
            .putFile(uploadUri);
        task.on('state_changed', snapshot => {
        });

        try {
            //Uploading of image is finished
            await task;
        } catch (e) {
            console.error(e);
        }
        //Get url of uploaded image to store in firestore
        const url = await storage()
            .ref(filename)
            .getDownloadURL();

        //Store details and path of image in firestore
        firestore()
            .collection(configs.DATABASENAME)
            .add({
                imagePath: url,
                title: this.state.title,
                details: this.state.details,
                createdAt: new Date()
            })
            .then(() => {
                console.log('Image added!');
                this.setState({ isLoading: false })
                Alert.alert(
                    "Image added!",
                    "Image added successfully",
                    [
                        { text: "Ok", onPress: () => this.props.navigation.goBack() }
                    ],
                    { cancelable: false }
                );
            });
    };

    /*
     * Capture image to upload
     */

    openCamera = () => {
        ImageCropPicker.openCamera(imagePickerOptions)
            .then(response => {
                if (response.didCancel) {
                    console.warn("User cancelled image picker");
                } else if (response.error) {
                    console.warn("ImagePicker Error: ", response.error);
                } else if (response.customButton) {
                    console.warn("User tapped custom button: ", response.customButton);
                } else {
                    this.setState({ showChooseImageModal: false }, () => {
                        //Send selected image to edit screen
                        this.props.navigation.navigate('editimage', {
                            onGoBack: this.refresh,
                            photoPath: response.path.replace('file://', '')
                        });
                    })

                }
            })
            .catch(error => {
                console.warn("cropper error");
                console.warn(error);
            });
    }
    /*
     * Select image from gallery to upload
     */

    openGallery = () => {
        ImageCropPicker.openPicker(imagePickerOptions)
            .then(response => {
                if (response.didCancel) {
                    console.warn("User cancelled image picker");
                } else if (response.error) {
                    console.warn("ImagePicker Error: ", response.error);
                } else if (response.customButton) {
                    console.warn("User tapped custom button: ", response.customButton);
                } else {
                    this.setState({ showChooseImageModal: false }, () => {
                        //Send selected image to edit screen
                        this.props.navigation.navigate('editimage', {
                            onGoBack: this.refresh,
                            photoPath: response.path.replace('file://', '')
                        });
                    })
                }
            })
            .catch(error => {
                console.warn("cropper error");
                console.warn(error);
            });
    }
    /*
     * Get edited image from edit image screen
     */

    refresh = (image) => {
        this.setState({ image: image })
    }

    render() {
        const spinner = this.state.isLoading ? <View style={{ flex: 1 }}>
            <ActivityIndicator size='small' color={Colors.lightTextColor} />
        </View> : null;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.postImageContainer}>
                        <View>
                            {this.state.image ? (
                                <Image
                                    source={{ uri: this.state.image }}
                                    style={styles.postImageImage}
                                    resizeMode={'stretch'}
                                />
                            ) : null}
                        </View>
                        <View style={styles.postImageDetailsContainer}>
                            {this.state.image
                                ?
                                <View>
                                    <Text style={styles.postImageBoldText}>{"Image Details"}</Text>
                                    <TextInput
                                        placeholder='Enter title of the image'
                                        style={styles.input}
                                        value={this.state.title}
                                        maxLength={15}
                                        onChangeText={title => this.onChangeTitle(title)}
                                    />
                                    <TextInput
                                        placeholder='Enter details of the image'
                                        style={styles.input}
                                        value={this.state.details}
                                        maxLength={35}
                                        onChangeText={details => this.onChangeDetails(details)}
                                    />
                                </View>
                                :
                                null}
                            {this.state.image
                                ?
                                <TouchableOpacity
                                    style={styles.postImageButton}
                                    onPress={() => { this.uploadImage() }}
                                >
                                    {this.state.isLoading ? spinner : <Text style={styles.postImageButtonText}>{"Upload Image"}</Text>}
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    style={styles.postImageButton}
                                    onPress={() => { this.setState({ showChooseImageModal: true }) }}
                                >
                                    <Text style={styles.postImageButtonText}>{"Add a Image"}</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                    <Modal
                        animationType="none"
                        transparent={true}
                        style={{ flex: 1, margin: 0 }}
                        visible={this.state.showChooseImageModal}
                        onRequestClose={() => { this.setState({ showChooseImageModal: false }) }}
                    >
                        <ModalBox
                            position={'center'}
                            isOpen={this.state.showChooseImageModal}
                            style={styles.postImageModal}
                            ref={'modal1'}
                            swipeToClose={this.state.swipeToClose}
                            onClosed={() => { this.setState({ showChooseImageModal: false }) }}
                            onOpened={this.onOpen}
                            onClosingState={() => { this.setState({ showChooseImageModal: false }) }}>

                            <Text style={styles.postImageModalTitleText}>{'Choose Image'}</Text>

                            <TouchableOpacity
                                onPress={() => this.openCamera()}
                                style={styles.postImageModalItemContainer}>
                                <Image
                                    style={styles.image25}
                                    source={require('../assets/images/cameraIcon.png')}
                                    resizeMode={"contain"}
                                />
                                <Text style={styles.postImageItemText}>Camera</Text>

                            </TouchableOpacity>


                            <View style={styles.postImageItemSeparator}>
                            </View>
                            <TouchableOpacity
                                onPress={() => this.openGallery()}
                                style={styles.postImageModalItemContainer}>
                                <Image
                                    style={styles.image25}
                                    source={require('../assets/images/galleryIcon.png')}
                                    resizeMode={"contain"}
                                />
                                <Text style={styles.postImageItemText}>Pickup from gallery</Text>

                            </TouchableOpacity>
                            <View>
                                <Text onPress={() => this.setState({ showChooseImageModal: false })} style={styles.postImageModalCancelText}>Cancel</Text>
                            </View>
                        </ModalBox>
                    </Modal>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

