import React, { useRef, useState, useContext, useEffect } from "react";
import Context from "../context/context";
import Link from "next/link";
import Image from "next/image";
import {
  useOutsideClick,
  useDisclosure,
  Badge,
  Button,
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Stack,
  Text,
  Input,
} from "@chakra-ui/react";

const Cart = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const context = useContext(Context);

  useEffect(() => {
    typeof window !== "undefined" &&
      window.localStorage.setItem("cart", JSON.stringify(context.cart)); //  set cart to local storage
    console.log(context.cart);
  }, [context.cart]);

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Cart
        <Text ml={2}>
          (
          {context.cart.reduce((count, curItem) => {
            // count the number of items in cart
            return count + curItem.quantity;
          }, 0)}
          )
        </Text>
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>My Cart</DrawerHeader>

          <DrawerBody>
            {context.cart.length <= 0 && <p>No Item in the Cart!</p>}
            <ul>
              {context.cart.map((cartItem) => (
                <Flex
                  key={cartItem.id}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  mt={4}
                >
                  <Image src={cartItem.image} width={50} height={50} />
                  <Flex flexDirection={"column"}>
                    <strong>{cartItem.name}</strong> - ${cartItem.price} (
                    {cartItem.quantity})
                  </Flex>

                  <Button
                    onClick={context.removeProductFromCart.bind(
                      this,
                      cartItem.id
                    )}
                  >
                    Remove
                  </Button>
                </Flex>
              ))}
            </ul>
            <Button mt={12} colorScheme="blue">
              <Link href="/checkout">Checkout</Link>
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Cart;
