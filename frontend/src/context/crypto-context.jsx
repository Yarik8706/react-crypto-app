import {createContext, useContext, useEffect, useState} from "react";
import {fakeFetchCrypto, fakeFetchCryptoAssets} from "../api.js";
import {percentDifference} from "../utils.js";

const CryptoContext = createContext({
  crypto: [],
  assets: [],
  loading: false
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [crypto, setCrypto] = useState({});
  const [cryptoAssets, setCryptoAssets] = useState([]);
  
  function mapAssets(assets, result){
    return assets.map(asset => {
      const coin = result.find(coin => coin.id === asset.id)

      return {
        grow: asset.price < coin.price,
        growPercent: percentDifference(coin.price, asset.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * (coin.price - asset.price),
        name: coin.name,
        ...asset
      }
    })
  }

  useEffect(() => {
    async function preload() {
      setLoading(true)
      const {result} = await fakeFetchCrypto();
      const assets = await fakeFetchCryptoAssets();
      
      setCrypto(result)
      setCryptoAssets(mapAssets(assets, result))
      setLoading(false)
    }

    preload()
  }, []);
  
  function addAsset(newAsset) {
    const newAssets = cryptoAssets.filter((asset) => asset.id !== newAsset.id)
    setCryptoAssets((prev) => mapAssets([...newAssets, newAsset], crypto))
  }
  
  return <CryptoContext.Provider value={{ loading, crypto, cryptoAssets, addAsset }}>{children}</CryptoContext.Provider>
}

export default CryptoContext

export function useCrypto() {
  return useContext(CryptoContext)
}