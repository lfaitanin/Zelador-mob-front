import {Select, FormControl, CheckIcon, Box, Center} from 'native-base'
import {useState} from 'react'
const Selector = ({ items, choose, value, onChange }) => {
  var chooser = `Escolha o ${choose}`;

  return (
    <Center>
      <FormControl mb={1}>
        <Select
          selectedValue={value} // Usa o valor passado por props
          minWidth={370}
          minHeight={58}
          accessibilityLabel={chooser}
          onValueChange={(itemValue) => {
            // Encontre o item correspondente
            const item = items.find(i => i.value === itemValue);
            onChange(item ? item.value : null); // Passe o id para o onChange
          }}
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
        >
          {items.map((item, index) => (
            <Select.Item key={index} label={item.label} value={item.value} />
          ))}
        </Select>
      </FormControl>
    </Center>
  );
};

  export default Selector;

