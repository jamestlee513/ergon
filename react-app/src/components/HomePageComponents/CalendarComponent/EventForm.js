import { InfoIcon, TimeIcon } from '@chakra-ui/icons';
import { Box, Button, FormControl, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React, { useState } from 'react';


function EventForm({ isOpen, onOpen, onClose }) {

    const [newEventTitle, setNewEventTitle] = useState('');
    const [newEventStartTime, setNewEventStartTime] = useState()
    
    
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>New Event</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl isRequired>
                        <InputGroup>
                            <InputLeftElement children={<InfoIcon />} />
                            <Input
                                type="title"
                                placeholder="Add event title"
                                value={newEventTitle}
                                onChange={e => setNewEventTitle(e.target.value)}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl isRequired>
                        <InputGroup display="flex" justifyContent="space-between" alignItems="center">
                            <Box w="120px">Start time:</Box>
                            <Input
                                type="time"
                                value={newEventStartTime}
                                onChange={e => setNewEventStartTime(e.target.value)}
                            />
                        </InputGroup>
                    </FormControl>
                    {/* <FormControl isRequired>
                        <InputGroup>
                            <InputLeftElement children={<InfoIcon />} />
                            <Input
                                type="name"
                                placeholder="Last name"
                                value={lastname}
                                onChange={e => setLastname(e.target.value)}
                            />
                        </InputGroup>
                    </FormControl> */}
                        
                </ModalBody>

                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default EventForm;