import React, { useState } from "react";
import { TezosToolkit } from "@taquito/taquito";

function WithoutPacker() {
  const [timeDiff, setTimeDiff] = useState(0);
  const connectedNetwork = "https://mainnet-tezos.giganode.io/";
  const Tezos = new TezosToolkit(connectedNetwork);
  const fetchFarmBalance = async (
    connectNetwork,
    addressOfUser,
    tokenContractAddress
  ) => {
    try {
      //Contract Call
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
      promises.push(
        fetchFarmBalance(connectedNetwork, addressOfUser, tokenContractAddress)
      );
      addressOfUser = "tz1RmXjKJJqzRehdMz1DWhcRQYbhiaLYtrRN";
      promises.push(
        fetchFarmBalance(connectedNetwork, addressOfUser, tokenContractAddress)
      );
      addressOfUser = "tz1cD31qUc7Vz5g3ThFb3yvUkcj2e3wcetsB";
      promises.push(
        fetchFarmBalance(connectedNetwork, addressOfUser, tokenContractAddress)
      );
      addressOfUser = "tz1hxp6TZfZ8bApX8dZ3fyn4wz6bd2Cmiy84";
      promises.push(
        fetchFarmBalance(connectedNetwork, addressOfUser, tokenContractAddress)
      );
      addressOfUser = "tz1aag4xQfh1FKAupcMQeQMHtYPfejzeKkW9";
      promises.push(
        fetchFarmBalance(connectedNetwork, addressOfUser, tokenContractAddress)
      );

      addressOfUser = "tz1eeq85Mq5Ypi19RsCWgc3QtzHKE4NnkjKR";
      promises.push(
        fetchFarmBalance(connectedNetwork, addressOfUser, tokenContractAddress)
      );
      addressOfUser = "tz1NpEydtnL7777kMufqh4ujMjJm1fBaN42C";
      promises.push(
        fetchFarmBalance(connectedNetwork, addressOfUser, tokenContractAddress)
      );
      addressOfUser = "tz1Q1LWn8wCK77L4xetjbH3Ar7sDaSANezZx";
      promises.push(
        fetchFarmBalance(connectedNetwork, addressOfUser, tokenContractAddress)
      );
      addressOfUser = "tz1VJ8sFCaqqkYVwPVUs8V3yxg7WsAz8M8RM";
      promises.push(
        fetchFarmBalance(connectedNetwork, addressOfUser, tokenContractAddress)
      );
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
