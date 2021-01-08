
import React, { Component } from 'react';
import {
    Text,
    View,
    Alert,
} from 'react-native';

import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import styles from '../style/styles';
import Colors from '../utils/colors';
import configs from '../Configs'

export default class EditImage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            color: '#FF0000',
            thickness: 5,
            message: '',
            photoPath: this.props.navigation.state.params.photoPath,
        }
    }
    render() {
        return (
            <View style={styles.editImageContainer}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <RNSketchCanvas
                        localSourceImage={{ filename: this.state.photoPath, mode: 'AspectFit' }}
                        containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
                        canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
                        onStrokeEnd={data => {
                        }}
                        undoComponent={<View style={styles.functionButton}><Text style={styles.editImageTextColor}>Undo</Text></View>}
                        onUndoPressed={(id) => {
                        }}
                        clearComponent={<View style={styles.functionButton}><Text style={styles.editImageTextColor}>Clear</Text></View>}
                        onClearPressed={() => {
                        }}
                        eraseComponent={<View style={[styles.functionButton, { marginLeft: 25 }]}><Text style={styles.editImageTextColor}>Eraser</Text></View>}
                        strokeComponent={color => (
                            <View style={[{ backgroundColor: color }, styles.strokeColorButton]} />
                        )}
                        strokeSelectedComponent={(color, index, changed) => {
                            return (
                                <View style={[{ backgroundColor: color, borderWidth: 2 }, styles.strokeColorButton]} />
                            )
                        }}
                        strokeWidthComponent={(w) => {
                            return (<View style={styles.strokeWidthButton}>
                                <View style={{
                                    backgroundColor: Colors.lightTextColor, marginHorizontal: 2.5,
                                    width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                                }} />
                            </View>
                            )
                        }}
                        defaultStrokeIndex={0}
                        defaultStrokeWidth={5}
                        saveComponent={<View style={[styles.functionButton, { marginRight: 25 }]}><Text style={styles.editImageTextColor}>Save</Text></View>}
                        savePreference={() => {
                            //save edited image to user's phone storage to access it for upload
                            return {
                                folder: configs.SAVEIMAGEFOLDER,
                                filename: configs.SAVEIMAGEFILENAME,
                                transparent: true,
                                imageType: configs.SAVEIMAGETYPE
                            }
                        }}
                        onSketchSaved={(success, path) => {
                            if (success) {
                                //Send image's path back to post image screen
                                this.props.navigation.state.params.onGoBack('file://' + path);
                                this.props.navigation.goBack();
                            } else {
                                Alert.alert('Failed to save image!', path)

                            }
                        }}
                        onPathsChange={(pathsCount) => {
                            console.log('pathsCount', pathsCount)
                        }}
                    />
                </View>

            </View>
        );
    }
}

