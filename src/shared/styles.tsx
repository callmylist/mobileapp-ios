import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    dialogContainer: {
        padding: 16,
        backgroundColor: '#000000cc',
        paddingBottom: 32,
        borderRadius: 16
    },
    dialogTitle: {
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 20
    },
    dialogSwitchContainer: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    borderBottom: {
        borderBottomColor: 'white',
        borderBottomWidth: 1
    },
    dialogTimeContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        paddingVertical: 8,
        flexDirection: 'row'
    },
    dialogTimePlaceholder: {
        color: 'white',
        fontSize: 10,
        marginTop: 12
    },
    dialogDescription: {
        color: 'white',
        fontWeight: '500',
        fontSize: 10,
        marginTop: 8
    },
    dialogSmallTitle: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
        marginTop: 24
    },
    panelSwitchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    panelOptionText: {
        color: '#6a6a6a',
        fontSize: 12,
        marginLeft: 8
    },
})

export default styles