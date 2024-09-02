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

    pickupButton: {
        width: '75%',
        height: '15%',
    },
    cancelButton: {
    },
    cancelButtonGradient: {
        elevation: 10,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'center',
    },
    cancelButtonGradientPressed: {
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'center',
    },
    cancelButtonText:
    {
        color: 'white',
        fontStyle: 'Bold',
        fontSize: 18,
        textAlign: 'center',
    },
    scoreButton: {
        width: '75%',
        height: '10%',
    },
    scoreButtonGradient: {
        elevation: 10,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    scoreButtonGradientPressed: {
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    scoreButtonText:
    {
        color: 'white',
        fontStyle: 'Bold',
        fontSize: 18,
        textAlign: 'center',
    },
    pickupButtonGradient: {
        elevation: 10,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    pickupButtonGradientPressed: {
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    pickupButtonText:
    {
        color: 'white',
        fontStyle: 'Bold',
        fontSize: 22,
        textAlign: 'center',
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
    horizontalLine: {
        backgroundColor: 'lightgray',
        height: 2,
        width: '100%',
        marginVertical: 10,
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
        padding: 12,
        marginLeft: 10,
    },

    // Radio button styles
    radioStyle: {
        padding: 3,
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
    vstackFullWidth: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    hstack: {
        width: '100%',
        padding: 2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    hstackcenter: {
        width: '100%',
        padding: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    vstackcenter: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
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
