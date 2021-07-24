import { Fragment } from 'react';
import Head from 'next/head';

import { Container, Header, Footer } from '../components/Layout';
import { MintForm } from '../components/MintForm';

export default function Mint() {
  return (
    <Fragment>
      <Head>
        <title>Tuli Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Header />
        <main>
          <section className="py-24 text-center space-y-8">
            <h1 className="text-8xl font-bold">Mint</h1>
            <p className="text-2xl text-gray-400 max-w-2xl mx-auto">Use the form below to mint a TULI NFT</p>
          </section>
          <section className="max-w-3xl mx-auto">
            <MintForm />
          </section>
        </main>
        <Footer />
      </Container>
    </Fragment>
  );
}
