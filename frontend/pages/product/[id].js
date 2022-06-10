import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { Text, Button, Flex } from "@chakra-ui/react";
import Nav from "../../components/navbar";
import Context from "../../context/context";

import useSWR from "swr";

import axios from "../../lib/axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const product = () => {
  const router = useRouter();
  const { id, name } = router.query;

  const addToCart = () => {
    console.log("add to cart");
  };

  const { data: product, error } = useSWR(`/api/products/${id}`, fetcher);
  if (error) return <div>failed to load product</div>;

  if (!product) return <div>loading...</div>;

  if (!product.is_active) return <div>Product is not available</div>;

  return (
    <>
      <Nav />
      <Context.Consumer>
        {(context) => (
          <main
            className={styles.main}
            style={{ flexDirection: "row", alignItems: "flex-start" }}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              className={styles.image}
            />
            <Flex flexDirection={"column"}>
              <Text fontSize="4xl">{product.name}</Text>
              <Text fontSize="md">{product.description}</Text>
              <Text fontSize="xl">${product.price}</Text>
              <Button
                onClick={() => {
                  context.addProductToCart(product);
                }}
              >
                Add to cart
              </Button>
            </Flex>
          </main>
        )}
      </Context.Consumer>

      <footer className={styles.footer}>
        <p>HIT326 | Coded by Meng</p>
      </footer>
    </>
  );
};

export default product;
