import {Select, FormControl, CheckIcon, Box, Center} from 'native-base'

const Selector = ({ items, choose, value, onChange }) => {
  var chooser = `Escolha o ${choose}`;
  console.log(items[0])

  return (
    <Center>
      <FormControl mb={1}>
        <Select
          selectedValue={items[0]} 
          minWidth="100%"
          placeholder={chooser}
          accessibilityLabel={chooser}
          onValueChange={(itemValue) => {
            const item = items.find(i => i.value === itemValue);
            onChange(item ? item.value : null); 
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

