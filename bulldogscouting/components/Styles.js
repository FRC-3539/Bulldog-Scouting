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
    //Buttons
    buttonDisabled: {
        borderRadius: 20,
        paddingHorizontal: 30,
        paddingVertical: 2,
    },
    plusButton: {
        elevation: 10,
        borderRadius: 20,
        paddingHorizontal: 30,
        paddingVertical: 2,
    },
    plusButtonPressed: {
        borderRadius: 20,
        paddingHorizontal: 30,
        paddingVertical: 2,
    },
    minusButton: {
        elevation: 10,
        borderRadius: 20,
        paddingHorizontal: 30,
        paddingVertical: 2,
    },
    minusButtonPressed: {
        borderRadius: 20,
        paddingHorizontal: 30,
        paddingVertical: 2,
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
        padding:12,
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
