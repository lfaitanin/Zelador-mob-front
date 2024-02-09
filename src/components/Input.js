import {Input as NativeBaseInput, FormControl} from 'native-base'

const Input = ({erorMensage = null, isInvalid, ...rest}) => {
    const invalid = !!erorMensage || isInvalid; 
    return (
        <FormControl  mb={1} isInvalid={invalid}>
            <NativeBaseInput  
            fontSize="md"            
            h={16}
            isInvalid={invalid}           
            _focus={{
                bgColor:"white",
                borderWidth: 1,
                borderColor:"darkBlue.900"
            }}
            {...rest}
            />

        <FormControl.ErrorMessage>
            {erorMensage}
        </FormControl.ErrorMessage>
      </FormControl>
    );
  }

  export default Input;

