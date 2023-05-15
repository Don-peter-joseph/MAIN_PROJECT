import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  incomingMsgBox: {
    backgroundColor: '#FFBA2A',
    maxWidth: '70%',
    // borderRadius: 10,
    padding: 5,
    alignSelf: 'flex-start',
    marginVertical: 5,
    marginHorizontal: 5,
    // borderWidth: 0.5,
    borderColor: 'grey',
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    borderBottomRightRadius:10,
  },
  incomingMsgText: {color: 'black', fontSize: 16},

  sentMsgBox: {
    backgroundColor: '#F806CC',
    maxWidth: '70%',
    // borderRadius: 10,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    borderBottomLeftRadius:10,
    padding: 5,
    alignSelf: 'flex-end',
    marginVertical: 5,
    marginHorizontal: 5,
  },

  sentMsgText: {color: '#fff', fontSize: 16},

  typeMsgContainer: {
    flexDirection: 'row',
    marginHorizontal: 5,
    bottom: 5,
  },

  typeMsgBox: {
    borderWidth: 0.8,
    borderColor: '#cc5500',
    padding: 10,
    width: '80%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  sendBtn: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sendTxt: {color: 'white'},
  outline:{
    // borderWidth:1,
    width:"95%",
    alignSelf:'center',
    height:'100%',
    paddingBottom:10
  }
});

export default styles;