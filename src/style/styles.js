import { StyleSheet } from 'react-native';
import {
    Dimensions,
} from 'react-native'
import Colors from '../utils/colors';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    //Common Styles
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },

    // Dashboard Screen Styles
    cardContainer: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        elevation: 2,
        borderRadius: 2
    },
    cardItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardImage: {
        flex: 0.55,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: "center",
        margin: '1%'
    },
    image150: {
        width: 150,
        height: 150,
        borderRadius: 1
    },
    cardText: {
        flex: 0.40,
        flexDirection: 'column',
        alignSelf: 'center',
        margin: '1%'
    },
    cardTitleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.darkTextColor
    },
    cardDetailText: {
        fontSize: 14,
        color: Colors.darkTextColor
    },
    listSeparator: {
        height: 7,
    },
    dashboardListContainerPadding: {
        paddingTop: 15,
        paddingLeft: 7,
        paddingRight: 7,
    },
    dashboardModal: {
        height: null,
        width: '90%',
        borderRadius: 6,
    },
    dashboardModalUpperPart: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 12,
        height: 35
    },
    dashboardModalCloseButton: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingRight: 12
    },
    image25: {
        width: 25,
        height: 25,
        borderRadius: 1
    },
    dashboardModalMainImageContainer: {
        width: '100%',
        height: height / 1.4
    },
    dashboardModalMainImage: {
        height: height / 1.7
    },
    dashboardModalTextContainer: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        margin: '1%',
        paddingLeft: 15
    },


    //PostImage Screen Styles

    postImageContainer: {
        flex: 1,
        marginTop: 20
    },
    postImageImage: {
        width: '100%',
        height: height / 1.7
    },
    postImageDetailsContainer: {
        marginTop: 25,
        alignItems: 'center'
    },
    postImageBoldText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.darkTextColor,
        alignSelf: 'center'
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: Colors.lightGreen,
        borderWidth: 1,
        color: Colors.darkTextColor,
    },
    postImageButton: {
        width: '60%',
        padding: 12,
        alignSelf: 'center',
        backgroundColor: Colors.lightGreen,
        borderRadius: 6,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightGreen,
        borderColor: Colors.lightGreen,
        borderWidth: 1,
        shadowColor: '#ccc',
        shadowOffset: {
            width: 6,
            height: 6,
        },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 3,
    },
    postImageButtonText: {
        fontSize: 18,
        color: Colors.lightTextColor
    },
    postImageModal: {
        height: 220,
        width: '80%',
        borderRadius: 8,
    },
    postImageModalTitleText: {
        fontSize: 20,
        color: Colors.blackTextColor,
        margin: 16,
        fontWeight: 'bold',
    },
    postImageModalItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16
    },
    postImageItemText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 8,
        color: Colors.blackTextColor
    },
    postImageItemSeparator: {
        borderColor: '#ccc',
        borderWidth: 0.5,
        marginHorizontal: 16
    },
    postImageModalCancelText: {
        margin: 16,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'right',
        color: Colors.blackTextColor
    },

    //EditImage Screen Styles
    editImageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor,
    },
    strokeColorButton: {
        marginHorizontal: 2.5,
        marginVertical: 8,
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    strokeWidthButton: {
        marginHorizontal: 2.5,
        marginVertical: 8,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightGreen
    },
    functionButton: {
        marginHorizontal: 2.5,
        marginVertical: 8,
        height: 30,
        width: 55,
        backgroundColor: Colors.lightGreen,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    editImageTextColor: {
        color: Colors.lightTextColor
    },


    //FAB component style

    addButton: {
        borderRadius: 50,
        alignItems: 'stretch',
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0,
        },
        elevation: 2,
    },
    fabContainer: {
        position: 'absolute',
        bottom: 17,
        right: 17,
        height: 62,
        width: 62,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    addButtonInnerContainer: {
        flex: 1,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    //ModalBox component style

    wrapper: {
        backgroundColor: 'white'
    },
    transparent: {
        zIndex: 2,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    absolute: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

});

export default styles;
