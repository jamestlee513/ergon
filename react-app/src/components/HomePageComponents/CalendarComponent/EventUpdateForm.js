import { Modal, ModalOverlay, ModalHeader, ModalCloseButton, UnorderedList, FormControl, InputGroup, Box, Input, Select, Divider, Flex, ModalContent, ModalBody, ListItem, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent, updateEvent } from '../../../reducers/eventReducer';
import { dateTimeToInputTime, getCurrentTimeNumber } from '../../../services/util';

function EventUpdateForm({ isOpen, onOpen, onClose, event }) {

    const currentUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [title, setTitle] = useState(event.title);
    const [description, setDescription] = useState(event.description);
    const [startTime, setStartTime] = useState(dateTimeToInputTime(event.start_time));
    const [endTime, setEndTime] = useState(dateTimeToInputTime(event.end_time));
    const [color, setColor] = useState(event.background_color);
    const [errors, setErrors] = useState([]);
    const [eventSubmitLoading, setEventSubmitLoading] = useState(false);
    const [eventDeleteLoading, setEventDeleteLoading] = useState(false);


    const handleUpdate = async e => {
        e.preventDefault();
        e.stopPropagation();
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

        await dispatch(updateEvent(event.id, currentUser.id, title, startDateTime, endDateTime, description, color));
        onClose();
        setEventSubmitLoading(false);
    }

    const handleDelete = async e => {
        e.preventDefault();
        e.stopPropagation();
        setEventDeleteLoading(true);


        await dispatch(deleteEvent(event.id));
        onClose();
        setEventDeleteLoading(false);
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Event</ModalHeader>
                <ModalCloseButton onClick={onClose} />
                <ModalBody>
                    {errors && <UnorderedList mb={3} color="red.500">
                        {errors.map((error, idx) => <ListItem key={idx}>{error}</ListItem>)}
                    </UnorderedList>}
                    <form type="submit">
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
                    </form>
                    <Flex width="100%" justifyContent="flex-end">
                        <Button m={2} type="delete" onClick={handleDelete} isLoading={eventDeleteLoading}>Delete event</Button>
                        <Button m={2} type="submit" onClick={handleUpdate}isLoading={eventSubmitLoading}>Update event</Button>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default EventUpdateForm;