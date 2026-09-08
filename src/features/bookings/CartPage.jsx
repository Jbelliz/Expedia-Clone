import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../services/api";

const CartPage = () => {
  const [hotelCart, setHotelCart] = useState([]);
  const [flightCart, setFlightCart] = useState([]);

  const navigate = useNavigate();

  const loadCart = async () => {
    try {
      const [hotelResponse, flightResponse] = await Promise.all([
        axios.get(`${API_URL}/hotelcart`),
        axios.get(`${API_URL}/flightcart`),
      ]);

      setHotelCart(hotelResponse.data);
      setFlightCart(flightResponse.data);
    } catch (error) {
      console.error("Cart loading error:", error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (type, id) => {
    try {
      const endpoint =
        type === "hotel" ? "hotelcart" : "flightcart";

      await axios.delete(`${API_URL}/${endpoint}/${id}`);

      loadCart();
    } catch (error) {
      console.error("Remove cart item error:", error);
    }
  };

  const checkout = (type, item) => {
    localStorage.setItem(
      "checkoutItem",
      JSON.stringify({
        ...item,
        bookingType: type,
      })
    );

    navigate("/checkout");
  };

  const cartIsEmpty =
    hotelCart.length === 0 && flightCart.length === 0;

  return (
    <Box width="85%" margin="30px auto">
      <Heading mb={6}>Your Cart</Heading>

      {cartIsEmpty && (
        <Text fontSize="20px">
          Your cart is currently empty.
        </Text>
      )}

      {hotelCart.length > 0 && (
        <>
          <Heading size="md" mb={4}>
            Hotels
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {hotelCart.map((hotel) => (
              <Box
                key={hotel.id}
                borderWidth="1px"
                borderRadius="10px"
                padding="15px"
              >
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  height="180px"
                  width="100%"
                  objectFit="cover"
                />

                <Heading size="sm" mt={3}>
                  {hotel.name}
                </Heading>

                <Text>{hotel.place}</Text>

                <Text fontWeight="bold">
                  ₹{Number(hotel.price).toLocaleString()}
                </Text>

                <Button
                  mt={3}
                  colorScheme="blue"
                  onClick={() => checkout("hotel", hotel)}
                >
                  Checkout
                </Button>

                <Button
                  mt={3}
                  ml={2}
                  colorScheme="red"
                  variant="outline"
                  onClick={() =>
                    removeItem("hotel", hotel.id)
                  }
                >
                  Remove
                </Button>
              </Box>
            ))}
          </SimpleGrid>
        </>
      )}

      {flightCart.length > 0 && (
        <>
          <Heading size="md" mt={8} mb={4}>
            Flights
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {flightCart.map((flight) => (
              <Box
                key={flight.id}
                borderWidth="1px"
                borderRadius="10px"
                padding="15px"
              >
                <Heading size="sm">
                  {flight.airline}
                </Heading>

                <Text>
                  {flight.from} → {flight.to}
                </Text>

                <Text>
                  {flight.departure} - {flight.arrival}
                </Text>

                <Text>
                  Duration: {flight.totalTime}
                </Text>

                <Text fontWeight="bold">
                  ₹{Number(flight.price).toLocaleString()}
                </Text>

                <Button
                  mt={3}
                  colorScheme="blue"
                  onClick={() =>
                    checkout("flight", flight)
                  }
                >
                  Checkout
                </Button>

                <Button
                  mt={3}
                  ml={2}
                  colorScheme="red"
                  variant="outline"
                  onClick={() =>
                    removeItem("flight", flight.id)
                  }
                >
                  Remove
                </Button>
              </Box>
            ))}
          </SimpleGrid>
        </>
      )}
    </Box>
  );
};

export default CartPage;
