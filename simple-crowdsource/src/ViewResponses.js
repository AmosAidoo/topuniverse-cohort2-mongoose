import { DeleteIcon } from '@chakra-ui/icons'
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Stack,
    Box,
    Spacer,
    Text,
    Flex,
    IconButton,
    useToast,
} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'

function ViewResponses(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [responses, setResponses] = useState([])
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    useEffect(() => {
        async function getData() {
            try {
                const res = await axios({
                    method: "GET",
                    url: `http://localhost:4000/response?paragraph_id=${props.paragraph_id}`
                })
                setResponses(res.data.data)
            } catch (err) {
                console.log(err)
            }
        }

        getData()
    }, [])

    const deleteResponse = async (response_id) => {
        setLoading(true)
        try {
            const res = await axios({
                method: "DELETE",
                url: `http://localhost:3001/response/${response_id}`
            })
            setResponses(responses.filter(r => r._id != response_id))
            toast({
                title: 'Success',
                description: "Deleted Successfully",
                status: "success",
                isClosable: true,
            })
        } catch (err) {
            toast({
                title: 'Error',
                description: "An error occured whilst deleting response",
                status: "error",
                isClosable: true,
            })
        }
        setLoading(false)
    }
    

    return (
        <>
            <Button onClick={onOpen} variant='solid' colorScheme='teal'>View Responses</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Responses</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack direction="column">
                            {
                                responses.length > 0 ?
                                    responses.map(r => (
                                        <Flex rounded="md" width="full" bg="gray.800" p="5px" color="white" mb="10px">
                                            <Box><Text p="2">{r.value}</Text></Box>
                                            <Spacer />
                                            <Box>
                                                <IconButton
                                                    colorScheme='red'
                                                    aria-label='Delete response'
                                                    icon={<DeleteIcon />}
                                                    onClick={() => deleteResponse(r._id)}
                                                    isLoading={loading}
                                                />
                                            </Box>
                                        </Flex>
                                    )) :
                                    <Text>No responses found</Text>
                            }

                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='teal' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ViewResponses