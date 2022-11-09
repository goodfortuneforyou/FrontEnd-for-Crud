import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Crud from "../components/Crud";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>CRUD smart contract</title>
        <meta name="description" content="Crud contracat" />
      </Head>
      <Header />
      <br />
      <Crud />
      <Footer />
    </div>
  );
}
