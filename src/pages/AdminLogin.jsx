import { useState } from "react";
import { Container, VStack, Heading, Box, FormControl, FormLabel, Input, Button, Alert, AlertIcon } from "@chakra-ui/react";
import { useSupabaseAuth, SupabaseAuthUI } from "../integrations/supabase/auth.jsx";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { session, loading } = useSupabaseAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (session) {
    navigate("/jobs-management");
    return null;
  }

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={8} width="100%">
        <Heading as="h1" size="xl">Admin Login</Heading>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <Box width="100%">
          <SupabaseAuthUI />
        </Box>
      </VStack>
    </Container>
  );
};

export default AdminLogin;