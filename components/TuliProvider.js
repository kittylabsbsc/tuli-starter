import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { providers } from 'ethers';
import Web3Modal from 'web3modal';

const TuliContext = createContext();

export const useTuli = () => useContext(TuliContext);

export function TuliProvider({ children }) {
  const [tuli, setTuli] = useState();
  const [web3Modal, setWeb3Modal] = useState();
  const [address, setAddress] = useState();
  const [signer, setSigner] = useState();

  const authenticate = useCallback(async () => {
    if (web3Modal) {
      const { Tuli } = await import('@tulilabs/tdk');
      const web3Provider = await web3Modal.connect();
      await web3Provider.enable();
      const provider = new providers.Web3Provider(web3Provider);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setSigner(signer);
      setAddress(address.toLocaleLowerCase()); // Note: Not sure  why does tuli lowercase addresses?
      setTuli(new Tuli(signer, 4));
    }
  }, [web3Modal]);

  useEffect(() => {
    (async () => {
      setWeb3Modal(
        new Web3Modal({
          network: 'rinkeby',
          cacheProvider: true,
          providerOptions: {
            walletconnect: {
              package: await import('@walletconnect/web3-provider'),
              options: {
                rpc: 'https://rinkeby.infura.io/v3/dfffb74a739545c9a8d7e4e54acf7f7f',
              },
            },
          },
        })
      );
    })();
  }, []);

  return <TuliContext.Provider value={{ tuli, address, authenticate, signer }} children={children} />;
}
