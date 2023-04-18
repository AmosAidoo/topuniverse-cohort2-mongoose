import { 
  ChakraProvider, 
  Container,
  Stack,
  Button,
  Center,
  Box,
  Text,
  AbsoluteCenter,
  useToast
} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ViewResponses from './ViewResponses'

function App() {
  const [text, setText] = useState("")
  const [paragraphId, setParagraphId] = useState("")
  const toast = useToast()
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios({
          url: "http://localhost:4000/paragraph"
        })
  
        setText(res.data.data.text)
        setParagraphId(res.data.data._id)
      } catch (err) {
        toast({
          title: 'Error',
          description: "An error occured whilst fetching data",
          status: "error",
          isClosable: true,
        })
      }
    }

    getData()
    
  }, [])

  const submitResponse = async (value) => {
    try {
      await axios({
        method: "POST",
        url: `http://localhost:4000/response?paragraph_id=${paragraphId}`,
        data: {
          value: value
        }
      })

      const res = await axios({
        url: "http://localhost:4000/paragraph"
      })

      setText(res.data.data.text)
      setParagraphId(res.data.data._id)
    } catch (err) {
      toast({
        title: 'Error',
        description: "An error occured whilst submitting response",
        status: "error",
        isClosable: true,
      })
    }
  }

  return (
    <ChakraProvider>
      <Box height="100vh">
        <AbsoluteCenter>
          <Container boxShadow='dark-lg' p='6' rounded='md' bg='white'>
            {/* Text Display */}
            <Box bg='gray.800' width="full" height="40" rounded='md' overflowY="scroll" pt="20px" pb="20px" px="20px">
            <Text 
              fontSize='4xl' 
              color="white" 
              textAlign="center"
              fontWeight="extrabold"
            >
              { text }
            </Text>
            </Box>

            <Center mt="10">
              <Stack direction='row' spacing={4} align='center'>
                <Button colorScheme='green' variant='solid' onClick={() => submitResponse("positive")}>
                  Positive
                </Button>
                <Button colorScheme='gray' variant='solid' onClick={() => submitResponse("neutral")}>
                  Neutral
                </Button>
                <Button colorScheme='red' variant='solid' onClick={() => submitResponse("negative")}>
                  Negative
                </Button>
              </Stack>
            </Center>

            <Center mt="20px">
             <ViewResponses paragraph_id={paragraphId} />
            </Center>
            
          </Container>
        </AbsoluteCenter>
      </Box>
      
    </ChakraProvider>
    
  );
}

export default App;
