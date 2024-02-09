import {Select, FormControl, CheckIcon, Box, Center} from 'native-base'
import {useState} from 'react'
const Selector = ({items, choose}) => {
  var chooser = `Escolha o ${choose}`

  const [service, setService] = useState("");
  return <Center>
        <FormControl  mb={1}>
        <Select selectedValue={service} minW={370} minH={58} accessibilityLabel={chooser} placeholder={chooser} _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
      }} mt={1} onValueChange={itemValue => setService(itemValue)}>
          {items.map((item, index) => (
                <Select.Item key={index} label={item} value={item} />
              ))}
        </Select>
      </FormControl>
    </Center>;
  }

  export default Selector;

