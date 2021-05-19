import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';

const NavigationDrawerHeader = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Icon name='menu' style={{color: '#296F63'}} />
      </TouchableOpacity>
    </View>
  );
};
export default NavigationDrawerHeader;