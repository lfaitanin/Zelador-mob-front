import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet ,Platform, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

const DateInput = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dateOfBirth, setDateOfBirth ] = useState();
 
    const onChange = ({type}, selectedDate) => {
    if(type == "set") {
        const currentDate = selectedDate;
        setDate(currentDate);

        if(Platform.OS === "android") {
            toggleDatePicker();
            setDateOfBirth(formatDate(currentDate));
        }
    } else {
        toggleDatePicker();
    }    
  };

const toggleDatePicker = () =>{
    setShow(!show);
}
const dateInputIcon = (
    <Ionicons name="calendar" size={24} color="black" style={styles.icon} />
  );
const confirmIosDate = () => {
    setDateOfBirth(formatDate(date))
    toggleDatePicker();
}

const onCanceling = () => {
  toggleDatePicker()
  setDateOfBirth("")
}

const formatDate = (rawDate) => {
  let date = new Date(rawDate);
  let year = date.getFullYear();
  let month = date.toLocaleString('pt-BR', { month: 'long' });
  let day = date.getDate();

  return `${day} de ${month} de ${year}`;
}

  return (
    <View style={styles.container}>
      <View>
      {show &&
            <DateTimePicker
                locale="pt-BR"
                mode ="date"
                value={date}
                display="spinner"
                onChange={onChange}
                style={[styles.pickerContainer]}/>
        }   
        {show && Platform.OS === "ios" && (
        <View style={{flexDirection: "row", justifyContent: "space-around"}}>
            <TouchableOpacity style={[ styles.button, styles.pickerButton, {backgroundColor: "11182711"}]} onPress={onCanceling}>
                <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[ styles.button, styles.pickerButton, {backgroundColor: "11182711"}]} onPress={confirmIosDate}>
                <Text>Confirmar</Text>
            </TouchableOpacity>
        </View>)}
        {
        <Pressable onPress={toggleDatePicker}  style={styles.input}>
        <TextInput 
          value={dateOfBirth} 
          onChangeText={setDateOfBirth} 
          editable={false} 
          placeholder="Data de Nascimento"
          onPressIn={toggleDatePicker}
          placeholderTextColor="#11182744"
        />
        {dateInputIcon}
      </Pressable>
        }   
      </View>
    </View>
  );
}
export default DateInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f5',
  },
  input: {
    width: '100%',
    padding: 19,
    marginTop: 4.5,
    borderWidth: 0.2,
    borderColor: '#000',
    borderRadius: 5,
    alignSelf: 'center',
  },
  button: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: "#075985",
    flex: 1
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",

    color: "#fff"
  },
  icon: {
    position: 'absolute',
    right: 8,
    bottom: 18
  },
});