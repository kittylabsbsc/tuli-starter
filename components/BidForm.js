import { approveERC20, constructBid, Decimal } from '@tulilabs/tdk';
import { utils } from 'ethers';
import { useCallback, useState, useRef } from 'react';

import { useTuli } from './TuliProvider';

export function BidForm({ id }) {
  const { address, signer, tuli } = useTuli();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState(false);

  const amountRef = useRef();
  const sellOnShareRef = useRef();

  const handleFormSubmit = useCallback(
    async event => {
      event.preventDefault();
      setErrors(false);
      setIsSubmitting(true);
      try {
        // TODO This doesn't work at the moment
        const currency = '0x5b4963B964bAc5C2Db83e53ffFe46E0cb83a1346'; // KITTY;
        const amount = parseInt(amountRef.current.value);
        const sellOnShare = parseInt(sellOnShareRef.current.value);

        // await approveERC20(signer, currency, address, utils.parseUnits(amount));

        const bid = constructBid(
          currency,
          Decimal.new(amount).value,
          address, // bidder address
          address, // recipient address (address to receive Media if bid is accepted)
          parseInt(sellOnShare)
        );

        // const tx = await tuli.setBid(id, bid);
        // await tx.wait(8); // 8 confirmations to finalize

        setErrors(false);
      } catch (e) {
        console.log(e);
        setErrors(true);
      } finally {
        setIsSubmitting(false);
      }
    },
    [id, tuli, address, signer]
  );

  return (
    <div className="space-y-8">
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <label className="block space-y-1">
          <span>Amount (ETH)</span>
          <input type="number" className="block w-full" ref={amountRef} />
        </label>
        <label className="block space-y-1">
          <span>Sell-on share (%)</span>
          <input
            placeholder="One-time fee current owner will earn from next sale"
            type="number"
            className="block w-full"
            ref={sellOnShareRef}
            min={1}
            max={100}
          />
        </label>
        <button
          disabled={isSubmitting}
          className="block w-full bg-blue-500 text-white leading-6 py-2 px-4 border border-transparent font-normal focus:outline-black"
          type="submit"
        >
          {isSubmitting ? 'Placing Bid ... ' : 'Place Bid'}
        </button>
        {isSubmitting && (
          <div className="bg-blue-100 border border-blue-300 p-3 text-gray-700">Bidding... Please wait.</div>
        )}
        {errors && (
          <div className="bg-red-100 border border-red-300 p-3 text-gray-700">
            An error has occurred while bidding. Please check the console for more information.
          </div>
        )}
      </form>
    </div>
  );
}
