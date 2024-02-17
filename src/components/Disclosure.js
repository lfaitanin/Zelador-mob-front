import React from "react";
import { Button, Actionsheet, useDisclose, Text, Box, Center, NativeBaseProvider, Icon } from "native-base";

function Disclosure() {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  return 
  <NativeBaseProvider>
    <Center flex={1} px="3">
        <Center>
                <Button onPress={onOpen}>Actionsheet</Button>
                <Actionsheet isOpen={isOpen} onClose={onClose}>
                    <Actionsheet.Content>
                    <Box w="100%" h={60} px={4} justifyContent="center">
                        <Text startIcon={<Icon as={Ionicons} name="plus" size="6" />} fontSize="16" color="gray.500" _dark={{
                        color: "gray.300"
                    }}>
                        Atalhos
                        </Text>
                    </Box>
                    <Actionsheet.Item>Menu 1</Actionsheet.Item>
                    <Actionsheet.Item>Menu 2</Actionsheet.Item>
                    <Actionsheet.Item>Menu 3</Actionsheet.Item>
                    <Actionsheet.Item>Menu 4</Actionsheet.Item>
                    <Actionsheet.Item>Menu 5</Actionsheet.Item>
                    </Actionsheet.Content>
                </Actionsheet>
            </Center>
        </Center>
    </NativeBaseProvider>;
}

    export default Disclosure;
    