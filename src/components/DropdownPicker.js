import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const DropdownPicker = ({ label, selectedValue, onValueChange, items, placeholder }) => {
  return (
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        mode="dropdown"
        style={styles.picker}
        enabled={false}
      >
        <Picker.Item label={placeholder} value="" />
        {items.map((item, index) => (
          <Picker.Item key={index} label={item} value={item} />
        ))}
      </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {
    borderWidth: 1, 
    borderColor: '#d5d5d9',  
    backgroundColor: '#eee',
    borderRadius: 40, 
    maxHeight: 250,   // <---- here    
    },
});

export default DropdownPicker;