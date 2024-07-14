import {
    StyleSheet,
} from 'react-native';

// Define styles
export const styles = StyleSheet.create({
    // General styles
    safeArea: {
        flex: 1,
        backgroundColor: "white",
    },
    generalViewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        flex: 1,
    },

    //Buttons
    plusButton: {
        backgroundColor: 'lime',
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    plusButtonPressed: {
        backgroundColor: 'green',
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    minusButton: {
        backgroundColor: 'red',
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    minusButtonPressed: {
        backgroundColor: 'darkred',
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 20,
    },

    // Input styles
    SingleLineInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
    },
    // Input styles
    MultiLineInput: {
        textAlignVertical: 'top',
        margin: 12,
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
    },

    // Image styles
    setupImage: {
        width: '50%',
        height: undefined,
        aspectRatio: .654, // Maintain aspect ratio
        resizeMode: 'contain',
        borderRadius: 10, // Add rounded corners
    },

    checkboxStyle: {
        marginLeft: 10,
    },

    // Radio button styles
    radioStyle: {
        padding: 0,
        margin: 8,
        borderWidth: 3,
    },
    radioView: {
        flexDirection: 'row',
        padding: 0,
        margin: 8,
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Layout styles
    hstackFullWidth: {
        padding: 2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
    },
    hstack: {
        width: '100%',
        padding: 2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    vstack: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flex: 1,
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        flex: 1,
        aspectRatio: "0.5625",
    },
});
