import {Button as NativeBaseButton, Text} from 'native-base'

const Button = ({title, ...rest}) => {
    return (
      <NativeBaseButton 
      w="full"
      bg="darkBlue.500"
      {...rest} 
      _pressed={{
            bgColor:"darkBlue.400",
        }}
      >
        <Text color="white" fontSize="lg">
            {title}
        </Text>
      </NativeBaseButton>
    );
  }

  export default Button;

