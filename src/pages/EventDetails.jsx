import { useParams } from "react-router-dom";
import { Container, Heading, Text, Box } from "@chakra-ui/react";
import { useEvent } from "../integrations/supabase/index.js";

const EventDetails = () => {
  const { id } = useParams();
  const { data: event, isLoading, isError } = useEvent(id);

  if (isLoading) {
    return (
      <Container centerContent>
        <Heading as="h2" size="xl" mt={8}>Loading...</Heading>
      </Container>
    );
  }

  if (isError || !event) {
    return (
      <Container centerContent>
        <Heading as="h2" size="xl" mt={8}>Event Not Found</Heading>
      </Container>
    );
  }

  return (
    <Container centerContent maxW="container.md" py={8}>
      <Box width="100%">
        <Heading as="h1" size="xl" mb={4}>{event.name}</Heading>
        <Text fontSize="lg">Details about the event will go here.</Text>
      </Box>
    </Container>
  );
};

export default EventDetails;