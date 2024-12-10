import React, {useEffect} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {requestApiCall} from '../redux/reducers/requestSlice';
import {useNavigation} from '@react-navigation/native';
import {RootState, useAppDispatch} from '../redux/store';
import {RootStackParamList} from '../../App';
import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Home', 'Todos'>;

const RequestScreen = (props: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const storeData = useSelector((state: RootState) => state);
  useEffect(() => {
    if (storeData.ReducerApi.isData === false) {
      navigation.navigate('Home');
    } else {
        navigation.navigate('Todos');
    }
  }, [storeData.ReducerApi.isData, navigation]);

  const onPressGetData = async () => {
    dispatch(await requestApiCall());
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.getData} onPress={onPressGetData}>
        <Text>Get Todos</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
  },
  getData: {
    backgroundColor: 'lightgreen',
    padding: 15,
    borderRadius: 12,
    alignSelf: 'center',
  },
});

export default RequestScreen;
