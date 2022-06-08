import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { Text, Button } from "@chakra-ui/react";
import Nav from "../../components/navbar";

import useSWR from "swr";

import axios from "../../lib/axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const product = () => {
  const router = useRouter();
  const { id, name } = router.query;

  const { data: product, error } = useSWR(`/api/products/${id}`, fetcher);
  if (error) return <div>failed to load product</div>;

  if (!product) return <div>loading...</div>;
  return (
    <div>
      <Nav />
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
        <div className={styles.productInfo}>
          <Text fontSize="4xl">{product.name}</Text>
          <Text fontSize="md">{product.description}</Text>
          <Text fontSize="xl">${product.price}</Text>
          <Button>add to cart</Button>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>HIT326 | Coded by Meng</p>
      </footer>
    </div>
  );
};

export default product;
