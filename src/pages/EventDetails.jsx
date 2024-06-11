import { useParams } from "react-router-dom";
import { Container, Heading, Text, Box, Spinner } from "@chakra-ui/react";
import { useEvent, useVenues } from "../integrations/supabase/index.js";

const EventDetails = () => {
  const { id } = useParams();
  const { data: event, isLoading: eventLoading, isError: eventError } = useEvent(id);
  const { data: venues, isLoading: venuesLoading, isError: venuesError } = useVenues();

  if (eventLoading || venuesLoading) {
    return (
      <Container centerContent>
        <Spinner size="xl" mt={8} />
      </Container>
    );
  }

  if (eventError || !event || venuesError || !venues) {
    return (
      <Container centerContent>
        <Heading as="h2" size="xl" mt={8}>Event Not Found</Heading>
      </Container>
    );
  }

  const venue = venues.find(v => v.id === event.venue_id);

  return (
    <Container centerContent maxW="container.md" py={8}>
      <Box width="100%">
        <Heading as="h1" size="xl" mb={4}>{event.name}</Heading>
        <Text fontSize="lg" mb={2}><strong>Date:</strong> {event.date}</Text>
        <Text fontSize="lg" mb={2}><strong>Venue:</strong> {venue ? venue.name : "Unknown"}</Text>
        <Text fontSize="lg" mb={2}><strong>Location:</strong> {venue ? venue.location : "Unknown"}</Text>
        <Text fontSize="lg" mb={2}><strong>Starred:</strong> {event.is_starred ? "Yes" : "No"}</Text>
        <Text fontSize="lg" mb={2}><strong>Private:</strong> {event.private ? "Yes" : "No"}</Text>
        <Text fontSize="lg" mb={2}><strong>Cancelled:</strong> {event.cancelled ? "Yes" : "No"}</Text>
      </Box>
    </Container>
  );
};

export default EventDetails;