import { Box, Button, Divider, Flex, FormControl, Input, InputGroup, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, UnorderedList } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postEvent } from '../../../reducers/eventReducer';


function EventForm({ isOpen, onOpen, onClose }) {

    const currentUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [color, setColor] = useState('blue.400');
    const [errors, setErrors] = useState([]);
    const [eventSubmitLoading, setEventSubmitLoading] = useState(false);

    const handleClose = () => {
        onClose();
        setTitle('');
        setStartTime('');
        setEndTime('');
    }

    const handleSubmit = async e => {
        e.preventDefault();
        // Front-end error handling
        if (endTime <= startTime) {
            setErrors(['End time cannot be before start time!']);
            return;
        }

        setEventSubmitLoading(true);
        const startDateTime = new Date();
        const startTimeSplit = startTime.split(":");
        startDateTime.setHours(startTimeSplit[0]);
        startDateTime.setMinutes(startTimeSplit[1]);

        const endDateTime = new Date();
        const endTimeSplit = endTime.split(":");
        endDateTime.setHours(endTimeSplit[0]);
        endDateTime.setMinutes(endTimeSplit[1]);

        console.log(startDateTime);
        console.log(endDateTime);

        await dispatch(postEvent(currentUser.id, title, startDateTime, endDateTime, description, color));
        onClose();
        setEventSubmitLoading(false);
    }

    // const loadEvents = async () => {
    //     await dispatch(loadEvents(currentUser.id));
    // }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>New Event</ModalHeader>
                <ModalCloseButton onClick={handleClose} />
                <ModalBody>
                    {errors && <UnorderedList mb={3} color="red.500">
                        {errors.map((error, idx) => <ListItem key={idx}>{error}</ListItem>)}
                    </UnorderedList>}
                    <form type="submit" onSubmit={handleSubmit}>
                            <FormControl isRequired mb={2}>
                                <InputGroup display="flex" justifyContent="space-between" alignItems="center">
                                    <Box w="120px">Event title:</Box>
                                    <Input
                                        type="title"
                                        placeholder="Add event title"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl mb={2}>
                                <InputGroup display="flex" justifyContent="space-between" alignItems="center">
                                    <Box w="120px">Description:</Box>
                                    <Input
                                        type="text"
                                        placeholder="Add event description (optional)"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl isRequired mb={2}>
                                <InputGroup display="flex" justifyContent="space-between" alignItems="center">
                                    <Box w="120px">Start time:</Box>
                                    <Input
                                        type="time"
                                        value={startTime}
                                        onChange={e => setStartTime(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl isRequired mb={2}>
                                <InputGroup display="flex" justifyContent="space-between" alignItems="center">
                                    <Box w="120px">End time:</Box>
                                    <Input
                                        type="time"
                                        value={endTime}
                                        onChange={e => setEndTime(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl isRequired mb={2}>
                                <InputGroup display="flex" justifyContent="space-between" alignItems="center">
                                    <Box w="115px">Event color:</Box>
                                    <Select backgroundColor={color} value={color} onChange={e => setColor(e.target.value)}>
                                        <option value="blue.400">Blue</option>
                                        <option value="red.400">Red</option>
                                        <option value="yellow.300">Yellow</option>
                                        <option value="orange.400">Orange</option>
                                        <option value="purple.300">Purple</option>
                                        <option value="green.400">Green</option>
                                        <option value="pink.300">Pink</option>
                                    </Select>
                                </InputGroup>
                            </FormControl>
                            <Divider mt={2} />
                            <Flex width="100%" justifyContent="flex-end">
                                <Button m={2} type="submit" isLoading={eventSubmitLoading}>Create event</Button>
                            </Flex>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default EventForm;