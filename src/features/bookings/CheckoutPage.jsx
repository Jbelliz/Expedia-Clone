import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import API_URL from "../../services/api";

const CheckoutPage = () => {
  const toast = useToast();

  const [item] = useState(() => {
    const savedItem = localStorage.getItem("checkoutItem");

    return savedItem ? JSON.parse(savedItem) : null;
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");

  const [bookingComplete, setBookingComplete] =
    useState(null);

  const handleBooking = async () => {
    if (!firstName || !lastName || !mobile) {
      toast({
        title: "Please complete all traveler information.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });

      return;
    }

    try {
      const bookingType = item.bookingType;

      const booking = {
        type: bookingType,

        traveler: {
          firstName,
          lastName,
          mobile,
        },

        item: {
          ...item,
          bookingType: undefined,
        },

        total: Number(item.price) || 0,

        status: "confirmed",

        createdAt: new Date().toISOString(),
      };

      const response = await axios.post(
        `${API_URL}/bookings`,
        booking
      );

      const cartEndpoint =
        bookingType === "hotel"
          ? "hotelcart"
          : "flightcart";

      await axios.delete(
        `${API_URL}/${cartEndpoint}/${item.id}`
      );

      localStorage.removeItem("checkoutItem");

      setBookingComplete(response.data);

      toast({
        title: "Booking confirmed!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Booking error:", error);

      toast({
        title: "Booking failed",
        description: "Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!item && !bookingComplete) {
    return (
      <Box width="70%" margin="40px auto">
        <Heading>No item selected</Heading>

        <Text mt={3}>
          Please select a hotel or flight from your cart.
        </Text>
      </Box>
    );
  }

  if (bookingComplete) {
    return (
      <Box
        width="60%"
        margin="50px auto"
        padding="30px"
        borderWidth="1px"
        borderRadius="10px"
      >
        <Heading color="green.500">
          Booking Confirmed
        </Heading>

        <Text mt={4}>
          Booking ID: {bookingComplete.id}
        </Text>

        <Text>
          Type: {bookingComplete.type}
        </Text>

        <Text>
          Status: {bookingComplete.status}
        </Text>

        <Text fontWeight="bold">
          Total: ₹
          {Number(
            bookingComplete.total
          ).toLocaleString()}
        </Text>

        <Button
          mt={5}
          colorScheme="blue"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Return Home
        </Button>
      </Box>
    );
  }

  return (
    <Box width="70%" margin="30px auto">
      <Heading>Review and Book</Heading>

      <Box
        mt={5}
        padding="20px"
        borderWidth="1px"
        borderRadius="10px"
      >
        <Heading size="md">
          {item.bookingType === "hotel"
            ? item.name
            : item.airline}
        </Heading>

        {item.bookingType === "hotel" ? (
          <>
            <Text>{item.place}</Text>
            <Text>Rating: {item.rating}</Text>
          </>
        ) : (
          <>
            <Text>
              {item.from} → {item.to}
            </Text>

            <Text>
              {item.departure} - {item.arrival}
            </Text>
          </>
        )}

        <Text mt={2} fontWeight="bold">
          Total: ₹{Number(item.price).toLocaleString()}
        </Text>
      </Box>

      <Box
        mt={5}
        padding="20px"
        borderWidth="1px"
        borderRadius="10px"
      >
        <Heading size="md" mb={4}>
          Traveler Information
        </Heading>

        <Input
          mb={3}
          placeholder="First Name"
          value={firstName}
          onChange={(event) =>
            setFirstName(event.target.value)
          }
        />

        <Input
          mb={3}
          placeholder="Last Name"
          value={lastName}
          onChange={(event) =>
            setLastName(event.target.value)
          }
        />

        <Input
          mb={3}
          placeholder="Mobile Number"
          value={mobile}
          onChange={(event) =>
            setMobile(event.target.value)
          }
        />

        <Button
          width="100%"
          colorScheme="orange"
          onClick={handleBooking}
        >
          Complete Booking
        </Button>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
