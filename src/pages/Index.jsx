import { useState } from "react";
import { Container, VStack, Heading, Box, FormControl, FormLabel, Input, Button, List, ListItem, Text, IconButton, HStack } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState("");

  const [editingIndex, setEditingIndex] = useState(null);

  const addEvent = () => {
    if (eventName.trim() !== "") {
      if (editingIndex !== null) {
        const updatedEvents = [...events];
        updatedEvents[editingIndex] = eventName;
        setEvents(updatedEvents);
        setEditingIndex(null);
      } else {
        setEvents([...events, eventName]);
      }
      setEventName("");
    }
  };

  const editEvent = (index) => {
    setEventName(events[index]);
    setEditingIndex(index);
  };

  const deleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

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
          <Button mt={4} colorScheme="teal" onClick={addEvent}>
            {editingIndex !== null ? "Update Event" : "Add Event"}
          </Button>
        </Box>

        <Box width="100%">
          <Heading as="h2" size="lg" mb={4}>Event List</Heading>
          <List spacing={3}>
            {events.map((event, index) => (
              <ListItem key={index} p={2} borderWidth="1px" borderRadius="md">
                <HStack justify="space-between">
                  <Text>{event}</Text>
                  <HStack>
                    <IconButton 
                      icon={<FaEdit />} 
                      aria-label="Edit Event" 
                      onClick={() => editEvent(index)} 
                    />
                    <IconButton 
                      icon={<FaTrash />} 
                      aria-label="Delete Event" 
                      onClick={() => deleteEvent(index)} 
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