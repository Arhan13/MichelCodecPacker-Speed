import React, { useState } from "react";
import { TezosToolkit } from "@taquito/taquito";

function WithoutPacker() {
  const [timeDiff, setTimeDiff] = useState(0);
  const fetchFarmBalance = async (
    connectNetwork,
    addressOfUser,
    tokenContractAddress
  ) => {
    try {
      //Contract Call
      const Tezos = new TezosToolkit(connectNetwork);
      Tezos.setProvider(connectNetwork);
      const contract = await Tezos.contract.at(tokenContractAddress);
      console.log(contract);
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

  const BalanceFetcher = async () => {
    const connectedNetwork = "https://mainnet-tezos.giganode.io/";
    let addressOfUser = "tz1SX5jmPpdWvJrMjqG5LiYN75Wq9Tdrp6Dc";
    const tokenContractAddress = "KT1BfQLAsQNX8BjSBzgjTLx3GTd3qhwLoWNz";

    try {
      const promises = [];
      promises.push(
        fetchFarmBalance(connectedNetwork, addressOfUser, tokenContractAddress)
      );
      addressOfUser = "tz1e5FGbCRqYmKPr5BEz6dqpytKMjGt3HheU";
      promises.push(
        fetchFarmBalance(connectedNetwork, addressOfUser, tokenContractAddress)
      );
      addressOfUser = "tz1eQvSaRojZxZKRqzDJvJCKDNZji2Mzs16e";
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

export default WithoutPacker;
