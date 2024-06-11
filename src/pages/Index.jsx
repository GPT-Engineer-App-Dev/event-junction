import { useState } from "react";
import { Container, VStack, Heading, Box, FormControl, FormLabel, Input, Button, List, ListItem, Text, IconButton, HStack } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from "../integrations/supabase/index.js";

const Index = () => {
  
  const [eventName, setEventName] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const { data: events, isLoading, isError } = useEvents();
  const addEventMutation = useAddEvent();
  const updateEventMutation = useUpdateEvent();
  const deleteEventMutation = useDeleteEvent();

  const handleAddEvent = () => {
    if (eventName.trim() !== "") {
      if (editingEvent) {
        updateEventMutation.mutate({ ...editingEvent, name: eventName });
        setEditingEvent(null);
      } else {
        addEventMutation.mutate({ name: eventName });
      }
      setEventName("");
    }
  };

  const handleEditEvent = (event) => {
    setEventName(event.name);
    setEditingEvent(event);
  };

  const handleDeleteEvent = (id) => {
    deleteEventMutation.mutate(id);
  };

  const viewEventDetails = (id) => {
    navigate(`/event/${id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading events</div>;
  }

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={8} width="100%">
        <Heading as="h1" size="xl">Events Management</Heading>
        
        <Box width="100%">
          <FormControl id="event-name">
            <FormLabel>Event Name</FormLabel>
            <Input 
              type="text" 
              value={eventName} 
              onChange={(e) => setEventName(e.target.value)} 
              placeholder="Enter event name" 
            />
          </FormControl>
          <Button mt={4} colorScheme="teal" onClick={handleAddEvent}>
            {editingEvent ? "Update Event" : "Add Event"}
          </Button>
        </Box>

        <Box width="100%">
          <Heading as="h2" size="lg" mb={4}>Event List</Heading>
          <List spacing={3}>
            {events.map((event) => (
              <ListItem key={event.id} p={2} borderWidth="1px" borderRadius="md" onClick={() => viewEventDetails(event.id)} cursor="pointer">
                <HStack justify="space-between">
                  <Text>{event.name}</Text>
                  <HStack>
                    <IconButton 
                      icon={<FaEdit />} 
                      aria-label="Edit Event" 
                      onClick={(e) => { e.stopPropagation(); handleEditEvent(event); }} 
                    />
                    <IconButton 
                      icon={<FaTrash />} 
                      aria-label="Delete Event" 
                      onClick={(e) => { e.stopPropagation(); handleDeleteEvent(event.id); }} 
                    />
                  </HStack>
                </HStack>
              </ListItem>
            ))}
          </List>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;