export const colorPack = {
    primary: '#00A5FF',
    primaryDark: '#215191',
    light: '#FFF',
    textPrimary: '#525966',
    placeholderTextColor: '#cccccc',
    danger: '#C62828',
    borderColor: '#e9e9e9',
    backgroundColor: '#b1b1b1',
};

export default {
    footerWrapper: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    footerWrapperNC: {
        width: 320,
        flexDirection: 'column',
    },
    subSection: {
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderColor: colorPack.borderColor,
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    greyButton: {
        height: 40,
        borderRadius: 5,
        elevation: 0,
        backgroundColor: colorPack.backgroundColor,
    },
    indicator: {
        fontSize: 24,
        color: colorPack.placeholderTextColor,
        height: 20,
    },
    selectedItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingTop: 3,
        paddingRight: 3,
        paddingBottom: 3,
        margin: 3,
        borderRadius: 20,
        borderWidth: 2,
    },
    button: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: colorPack.light,
        fontSize: 14,
    },
    selectorView: (fixedHeight) => {
        const style = {
            flexDirection: 'column',
            marginBottom: 10,
            elevation: 2,
        };
        if (fixedHeight) {
            style.height = 250;
        }
        return style;
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        backgroundColor: 'transparent',
        height: 40,
    },
    dropdownView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        marginBottom: 10,
    },
};