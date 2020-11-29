import {StyleSheet, Dimensions} from 'react-native'

screenwidth = Dimensions.get('window').width;
screenheight = Dimensions.get('window').height;
export default StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paragraph: {
        margin: 10,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
    textContainer: {
        flex: 2,
    },
    imgbackground: {
        width: screenwidth,
        height: screenwidth,
    },
    mainContainer: {
        flex: 10,
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'flex-end',
        flex: 1,
    },
    buttonProp: {
        backgroundColor: '#575554',
        borderColor: 'black',
        borderWidth: 2,
        width: '50%',
        height: screenheight/19,
        //marginBottom: screenheight/100,
    },
    buttonText: {
        fontSize: screenheight/30,
        color: 'white',
    },
    parent: {
        display: "flex",
        flexDirection: "row",
        borderWidth:1,
        borderRadius: 80,
        borderColor: "#694966",
        backgroundColor: '#694966',
        paddingLeft: "8%",
        paddingRight: "8%",
        paddingTop: ".5%",
        paddingBottom: ".5%",
    },
    parentView: {
        flex: 2,
    },
    numberView: {
        flex: 6,
    },
    child: {
        fontSize: 40,
        color: "#C89933",
    },

    buttonParent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: "12%",
        flex: 3,
    },

    button: {
        backgroundColor: "#694966",
        paddingTop: "5%",
        paddingBottom: "5%",
        paddingLeft: "5%",
        paddingRight: "5%",
        display: "flex",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#694966",
        height: 60,
    },
    textTableHead: {
        color: 'black',
        fontWeight: 'bold'
    },
    textTableRow: {
        color: 'black',
        margin: 6,
    },
    tableRows: {
        height: 30,
    },
    tableHead: {
        height: 50,
        backgroundColor: '#f1f8ff',
    },
    tableinput: {
        flexDirection: 'row',
        width: screenwidth
    },
    textInput: {
        width: screenwidth/5 - 2,
        height: 35,
        borderColor:"black",
        borderWidth: 1,
        marginLeft: 1,
        marginRight: 1,
    }
});