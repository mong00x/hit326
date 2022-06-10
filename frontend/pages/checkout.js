import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Nav from "../components/navbar";
import React, { useState, useContext, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import Context from "../context/context";

import {
  Text,
  Flex,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
export default function Home() {
  const context = useContext(Context);
  const [subTotal, setSubTotal] = useState(0);
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postcode, setPostcode] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  typeof window !== "undefined" &&
    window.localStorage.setItem("cart", JSON.stringify(context.cart)); //  set cart to local storage
  console.log(context.cart);

  useEffect(() => {
    let total = 0;
    context.cart.length > 0
      ? context.cart.forEach((item) => {
          total += item.quantity * item.price;
          setSubTotal(total);
        })
      : setSubTotal(0);
  }, [context.cart]);

  if (
    typeof window !== "undefined" &&
    window.localStorage.getItem("cart") !== null
  ) {
    console.log(JSON.parse(window.localStorage.getItem("cart")));
  }

  return (
    <>
      <Nav />
      <main className={styles.main}>
        <h1 className={styles.title}>Checkout</h1>
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
              onClick={context.removeProductFromCart.bind(this, cartItem.id)}
            >
              Remove
            </Button>
          </Flex>
        ))}

        <Text>Sbtotal: ${subTotal}</Text>
        <FormControl>
          <FormLabel htmlFor="first-name">First name</FormLabel>

          <Input
            id="first-name"
            placeholder="First name"
            value={Fname}
            onChange={(e) => setFname(e.target.value)}
          />

          <FormLabel htmlFor="last-name">Last name</FormLabel>

          <Input
            id="last-name"
            placeholder="Last name"
            value={Lname}
            onChange={(e) => setLname(e.target.value)}
          />

          <FormLabel htmlFor="email">
            Email
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormLabel>
          <FormLabel htmlFor="address">Address</FormLabel>
          <Input
            id="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <FormLabel htmlFor="city">City</FormLabel>
          <Input
            id="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <FormLabel htmlFor="state">State</FormLabel>
          <Input
            id="state"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <FormLabel htmlFor="postcode">Postcode</FormLabel>
          <Input
            id="postcode"
            placeholder="Postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
          <FormLabel htmlFor="phone">Phone</FormLabel>
          <Input
            id="phone"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button
            mt={4}
            isLoading={loading}
            onClick={async () => {
              setLoading(true);
              try {
                const res = await fetch("/api/checkout", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    Fname,
                    Lname,
                    email,
                    address,
                    city,
                    state,
                    postcode,
                    phone,
                  }),
                });
                const data = await res.json();
                if (data.error) {
                  setError(data.error);
                } else {
                  setError("");
                  setFname("");
                  setLname("");
                  setEmail("");
                  setAddress("");
                  setCity("");
                  setState("");
                  setpostcode("");
                  setPhone("");
                }
              } catch (err) {
                console.log(err);
              }
              setLoading(false);
            }}
          >
            Submit
          </Button>
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
      </main>

      <footer className={styles.footer}>
        <p>HIT326 | Coded by Meng</p>
      </footer>
    </>
  );
}
