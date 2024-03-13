import React, { useState } from "react";
import { Box, Heading, Input, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, FormControl, FormLabel } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddCustomer = () => {
    const newCustomer = {
      id: customers.length + 1,
      name,
      email,
    };
    setCustomers([...customers, newCustomer]);
    setName("");
    setEmail("");
    onClose();
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setName(customer.name);
    setEmail(customer.email);
    onOpen();
  };

  const handleUpdateCustomer = () => {
    const updatedCustomers = customers.map((customer) => (customer.id === selectedCustomer.id ? { ...customer, name, email } : customer));
    setCustomers(updatedCustomers);
    setSelectedCustomer(null);
    setName("");
    setEmail("");
    onClose();
  };

  const handleDeleteCustomer = (id) => {
    const updatedCustomers = customers.filter((customer) => customer.id !== id);
    setCustomers(updatedCustomers);
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Customer Relationship Management
      </Heading>
      <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={onOpen} mb={4}>
        Add Customer
      </Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {customers.map((customer) => (
            <Tr key={customer.id}>
              <Td>{customer.name}</Td>
              <Td>{customer.email}</Td>
              <Td>
                <IconButton icon={<FaEdit />} aria-label="Edit" mr={2} onClick={() => handleEditCustomer(customer)} />
                <IconButton icon={<FaTrash />} aria-label="Delete" onClick={() => handleDeleteCustomer(customer.id)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedCustomer ? "Edit Customer" : "Add Customer"}</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={selectedCustomer ? handleUpdateCustomer : handleAddCustomer}>
              {selectedCustomer ? "Update" : "Add"}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
