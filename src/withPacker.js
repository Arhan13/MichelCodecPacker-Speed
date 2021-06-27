import React, { useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { MichelCodecPacker } from "@taquito/taquito";

function WithPacker() {
  const [timeDiff, setTimeDiff] = useState(0);
  const fetchFarmBalance = async (
    connectNetwork = "https://mainnet-tezos.giganode.io/",
    addressOfUser = "tz1h4H8ic8LEdW8RF45cNJXBgPx7ZrYkFE4S",
    tokenContractAddress = "KT1BfQLAsQNX8BjSBzgjTLx3GTd3qhwLoWNz"
  ) => {
    try {
      //Contract Call
      const Tezos = new TezosToolkit(connectNetwork);
      Tezos.setPackerProvider(new MichelCodecPacker());
      Tezos.setProvider(connectNetwork);
      const contract = await Tezos.contract.at(tokenContractAddress);
      const storage = await contract.storage();
      console.log(storage, "Storage");
      const userDetails = await storage.balances.get(addressOfUser);
      console.log(userDetails, "User Details");
      let userBalance = userDetails.balance;
      userBalance = (userBalance.toNumber() / Math.pow(10, 18)).toFixed(5);
      userBalance = parseFloat(userBalance);
      //return
      return {
        success: true,
        balance: userBalance,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        balance: 0,
        error,
      };
    }
  };

  const BalanceFetcher = async (addressOfUser) => {
    //const connectedNetwork = "https://mainnet-tezos.giganode.io/";
    //const addressOfUser = "tz1h4H8ic8LEdW8RF45cNJXBgPx7ZrYkFE4S";
    //const tokenContractAddress = "KT1BfQLAsQNX8BjSBzgjTLx3GTd3qhwLoWNz";

    try {
      const promises = [];
      promises.push(fetchFarmBalance());
      const response = await Promise.all(promises);
      return {
        success: true,
        response,
      };
    } catch (e) {
      return {
        success: false,
        error: e,
      };
    }
  };

  const getBalanceVal = async () => {
    //const addressOfUser = "tz1h4H8ic8LEdW8RF45cNJXBgPx7ZrYkFE4S";
    var d = new Date();
    var startTime = d.getTime();
    const BALANCE_OF_FARM = await BalanceFetcher();
    console.log(BALANCE_OF_FARM);
    var dd = new Date();
    var endTime = dd.getTime();
    var diff = endTime - startTime;
    console.log(diff);
    setTimeDiff(diff);
  };

  return (
    <div>
      <button onClick={getBalanceVal}>Without Packer</button>
      <h2>{timeDiff} ms</h2>
    </div>
  );
}

export default WithPacker;
