import { Table } from 'antd';
import {useCrypto} from "../context/crypto-context.jsx";


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Price, $',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    sorter: (a, b) => a.amount - b.amount,
  },
];

export default function AssetsTable() {
  const {cryptoAssets} = useCrypto()
  
  let data = cryptoAssets.map((asset) => {
    return {
      key: asset.id,
      name: asset.name,
      price: asset.price,
      amount: asset.amount,
    }
  }) 
  
  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={data}
    />
  )
}