import { TuliProvider } from '../components/TuliProvider';

import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <TuliProvider>
      <Component {...pageProps} />
    </TuliProvider>
  );
}
