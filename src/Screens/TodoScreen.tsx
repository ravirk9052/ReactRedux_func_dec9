import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {addTodo, updateTodo, deleteTodo} from '../redux/reducers/requestSlice';
import Icons from 'react-native-vector-icons/FontAwesome6';
import { AppDispatch, RootState } from '../redux/store';

interface IProps {
  storeData: {};
  isVisible: boolean;
}

export interface ITodoName {
    id: number,
    completed: boolean,
    todo: string,
    userId: number,
}

const todayDate = new Date();

const TodoScreen = () => {
  const [isVisible, setModalVisible] = useState(false);
  const [updateVisible, updateSetVisible] = useState(false);
  const [text, onChangeText] = useState('');
  const [updateText, onChangeUpdateText] = useState('');
  const [updateObject, setUpdateObject] = useState({});

  const todoData = useSelector((state: RootState) => state.ReducerApi.todoArray);
  const dispatch = useDispatch();
  const onPressUpdateTodo = (todoName: ITodoName) => {
    onChangeUpdateText(todoName.todo);
    setUpdateObject(todoName);
    updateSetVisible(!updateVisible);
  };

  const onPressTrash = (todoName: ITodoName) => {
    // console.log('45-store', todoData.length);
    if (todoData.length > 0) {
    //   console.log('45', todoName);
      dispatch(deleteTodo(todoName));
    }
  };




  const renderItem = ({item, index} : {item: ITodoName, index: number}) =>{
    // console.log('59',index)
    return (
        <View style={styles.item}>

        <View>
          <View style={styles.itemDesign}>
            <TouchableOpacity
              style={styles.textClick}
              onPress={() => onPressUpdateTodo(item)}>
              <Text style={styles.title}>
                {index+1}. {item.todo}
              </Text>
            </TouchableOpacity>
  
            <TouchableOpacity onPress={() => onPressTrash(item)}>
              <Icons name="trash-can" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  } 


//     (
//     <Item todoName={item} index={index} />
//   );

  const onPressAddButton = () => {
    // console.log('74', isVisible);
    setModalVisible(!isVisible);
  };

  const onPressUpdateButton = () => {
    if (updateText){
        // console.log('92', updateText);
        // console.log('93', updateObject);
        setUpdateObject(prevState => ({
          ...prevState,
          todo: updateText,
        }));
        // console.log('98', updateObject);
        dispatch(updateTodo({updateObject, updateText}));
        updateSetVisible(!updateVisible);
    } else {
        Alert.alert('Empty Input', 'Please Fill the Input');
    }
    
  };
  //   console.log("96",updateObject);
  const onPressBackModal = () => {
    console.log('117')
  } 

  const onPressSubmitButton = () => {
    if (text) {
    //   console.log('83', text);
      const todoObj = {
        id: todoData.length + 1,
        todo: text,
        completed: true,
      };
      dispatch(addTodo(todoObj));
      setModalVisible(false);
      onChangeText('')

      //   const newTodo = {
      //     id: todoObjArray.length + 1,
      //     status: false,
      //     todoName: text,
      //   };
      //   setTodoObjArray([...todoObjArray.map((item, index) => item), newTodo]);
      //   onChangeText('');
      //   setModalVisible(!modalVisible);
    } else {
      Alert.alert('Empty Input', 'Please Fill the Input');
    }
  };

  //   <Item todoName={item} />;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.contentToday]}>Today</Text>
      <Text style={styles.contentDate}>{todayDate.toLocaleDateString()}</Text>
      {/* <View>
        <TextInput style={styles.textInputStyle} placeholder='Add Todo...'/>
      </View> */}
      <FlatList
        data={todoData}
        renderItem={renderItem}
        keyExtractor={(item,index) => `${item.id}- ${index}`}
      />
      <TouchableOpacity style={styles.imageStyle} onPress={onPressAddButton}>
        <Image style={styles.logo} source={require('../Images/plus.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.modalbackClick} onPress={onPressBackModal}>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!isVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                placeholder="Add Todo..."
                style={styles.input}
                value={text}
                onChangeText={onChangeText}
              />
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={onPressSubmitButton}>
                <Text style={styles.textStyle}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={updateVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            updateSetVisible(!updateVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                placeholder="Edit Todo..."
                style={styles.input}
                value={updateText}
                onChangeText={onChangeUpdateText}
              />
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={onPressUpdateButton}>
                <Text style={styles.textStyle}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: 15,
    fontSize: 18,
    textAlign: 'center',
    height: '95%',
    color: 'white',
  },
  item: {
    backgroundColor: '#343434',
    padding: 12,
    marginVertical: 5,
    marginHorizontal: 8,
    marginLeft: 0,
    borderWidth: 0,
    borderColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  logo: {
    width: 50,
    height: 50,
    // marginTop: '55%',
    borderRadius: 50,
  },
  imageStyle: {
    margin: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    // top: '50%',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    // borderWidth: 5,
    // borderColor: 'red'
  },
  modalView: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    width: 200,
    height: 35,
    paddingLeft: 10,
  },
  circle: {
    height: 15,
    width: 15,
    borderRadius: 100,
    color: 'white',
    borderWidth: 1,
    backgroundColor: 'grey',
    marginTop: 5,
  },
  circleTrue: {
    backgroundColor: 'white',
  },
  itemDesign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth: 1,
    padding: 0,
    width: '98%',
    marginLeft: 7,
  },
  itemDesignTrue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 0,
    width: '95%',
    marginLeft: 7,
  },
  title: {
    fontSize: Platform.OS === 'android' ? 16 : 18,
    color: 'white',
    // width: '60%',
    // maxWidth: '95%',
  },
  textClick: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: '90%'
  },
  titleTrue: {
    fontSize: 16,
    color: 'grey',
    textDecorationLine: 'line-through',
  },
  contentTrue: {
    color: 'grey',
  },
  contentFalse: {
    color: 'white',
  },
  contentToday: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
    color: 'white',
  },
  contentDate: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 6,
    color: 'grey',
  },
  textInputStyle: {
    width: '97%',
    borderWidth: 1,
    borderColor: 'white',
    height: 40,
    marginBottom: 20,
  },
  modalbackClick: {
    // borderWidth: 2,
    // borderColor: 'red'
  }
});

export default TodoScreen;
