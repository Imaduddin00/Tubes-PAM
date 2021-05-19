import React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';

const HomeScreen = (props) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ACF8FF'}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <TouchableOpacity 
            style={{
              backgroundColor: '#307ecc',
              borderWidth: 3,
              padding: 35,
              marginBottom: 10,
              borderColor: '#307ecc'
            }}
            onPress={() => {props.navigation.replace('AddEmployee')}}
          >
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
                color: 'white',
                fontWeight: 'bold'
              }}
            >
            Tambah Pegawai
          </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#307ecc',
              borderWidth: 3,
              padding: 35,
              borderColor: '#307ecc'
            }}
            onPress={() => {props.navigation.replace('EmployeeDetail')}}
          >
            <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}>
              Daftar Pegawai
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;