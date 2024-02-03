import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Platform } from 'react-native';

const Perfis = () => {
    const [perfil, setPerfil] = useState();  
    return (
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={perfil}
            onValueChange={(itemValue, itemIndex) =>
              setPerfil(itemValue)
            }>
            <Picker.Item label="Selecione o perfil" value="" />
            <Picker.Item label="Zelador" value="perfil1" />
            <Picker.Item label="Morador" value="perfil2" />
            <Picker.Item label="Sindico" value="perfil3" />
            <Picker.Item label="Visitante" value="perfil4" />
          </Picker>
        </View>
      </View>
    );
  }

  export default Perfis;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    },
    pickerContainer: {
      width: '80%',
      padding: 10,
      margin: 10,
      borderWidth: 1,
      borderColor: '#CCC',
      borderRadius: 5,
    },
  });