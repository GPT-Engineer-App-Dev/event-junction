import { useState } from "react";
import { Container, VStack, Heading, Box, FormControl, FormLabel, Input, Button, List, ListItem, Text, IconButton, HStack } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useJobs, useAddJob, useUpdateJob, useDeleteJob } from "../integrations/supabase/index.js";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";

const JobsManagement = () => {
  const { session } = useSupabaseAuth();
  const [jobTitle, setJobTitle] = useState("");
  const [editingJob, setEditingJob] = useState(null);
  const navigate = useNavigate();

  const { data: jobs, isLoading, isError } = useJobs();
  const addJobMutation = useAddJob();
  const updateJobMutation = useUpdateJob();
  const deleteJobMutation = useDeleteJob();

  if (!session) {
    navigate("/admin-login");
    return null;
  }

  const handleAddJob = () => {
    if (jobTitle.trim() !== "") {
      if (editingJob) {
        updateJobMutation.mutate({ ...editingJob, jobs_title: jobTitle });
        setEditingJob(null);
      } else {
        addJobMutation.mutate({ jobs_title: jobTitle });
      }
      setJobTitle("");
    }
  };

  const handleEditJob = (job) => {
    setJobTitle(job.jobs_title);
    setEditingJob(job);
  };

  const handleDeleteJob = (id) => {
    deleteJobMutation.mutate(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading jobs</div>;
  }

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={8} width="100%">
        <Heading as="h1" size="xl">Jobs Management</Heading>
        
        <Box width="100%">
          <FormControl id="job-title">
            <FormLabel>Job Title</FormLabel>
            <Input 
              type="text" 
              value={jobTitle} 
              onChange={(e) => setJobTitle(e.target.value)} 
              placeholder="Enter job title" 
            />
          </FormControl>
          <Button mt={4} colorScheme="teal" onClick={handleAddJob}>
            {editingJob ? "Update Job" : "Add Job"}
          </Button>
        </Box>

        <Box width="100%">
          <Heading as="h2" size="lg" mb={4}>Job List</Heading>
          <List spacing={3}>
            {jobs.map((job) => (
              <ListItem key={job.id} p={2} borderWidth="1px" borderRadius="md">
                <HStack justify="space-between">
                  <Text>{job.jobs_title}</Text>
                  <HStack>
                    <IconButton 
                      icon={<FaEdit />} 
                      aria-label="Edit Job" 
                      onClick={() => handleEditJob(job)} 
                    />
                    <IconButton 
                      icon={<FaTrash />} 
                      aria-label="Delete Job" 
                      onClick={() => handleDeleteJob(job.id)} 
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

export default JobsManagement;