import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.scss'
import Hero from '../../layout/hero/Hero'
import { useNavigate, useLocation } from 'react-router-dom'
import { apiInstance } from '../../api'
import { Container } from '../../utils/Util'
import { AiFillEye } from 'react-icons/ai'


const Home = () => {
  // const [page, setPage] = useState(+new URLSearchParams(location.search).get("offset") || 1)
  const [tableData, setTableData] = useState([])
  const [page, setPage] = useState(1)
  const [ search, setSearch] = useState('')


  const navigate = useNavigate();
  const location = useLocation()
  console.log(location);

  useEffect(() => {
    apiInstance(`/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=${page * 10}&sparkline=false&price_change_percentage=24h`)
    .then(res => {
      console.log(res.data)
      setTableData(res.data)
    })
    .catch(error => console.log(error))
  }, [])

  const filteredCoins = tableData.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
);


  return (
    <div>
        <Hero/>
        <Container>
          <h2 className="table-name">Cryptocurrency Prices by Market Cap</h2>
            <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search For a Crypto Currency..' />
            <table>
              <thead>
                <tr>
                  <th>Coin</th>
                  <th>Price</th>
                  <th>24h Change</th>
                  <th>Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredCoins.map((info, i) => 
                    <tr key={i}>
                      <td>
                        <Link className='table-link' to={`single/${info.id}`}>
                          <img src={info.image} alt="" />
                          <div>
                            <p>{info.symbol}</p>
                            <strong>{info.name}</strong>
                          </div>
                        </Link>
                      </td>
                      <td>{info.current_price}</td>
                      <td>
                        <div className="table-price">
                          <i className='eye-icon'><AiFillEye/></i>
                          <p style={{color: info.price_change_24h > 0 ? '#0ECB81' : '#F00'}}>{info.price_change_24h.toFixed(2)}%</p>
                        </div>
                      </td>
                      <td>{info.market_cap}</td>
                    </tr>  
                  )
                }
              </tbody>
          </table>
        </Container>
    </div>
  )
}

export default Home