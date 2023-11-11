import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiInstance } from '../../api'
import './Single.scss'
import Linechart from '../../components/chart/Linechart'


const Single = () => {
  const [singleData, setSingleData] = useState({})
  const params = useParams()
  //   const [apiResult, setApiResult] = useState({
  //     data: null,
  //     loading: true,
  //     error: false
  // })

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${params.id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setSingleData(data)
      })
      .catch(error => console.log(error))
  }, [])
  return (
    <div className='single'>
          <div className='single-info'>
            <div className="logo">
              <img src={singleData?.image?.large} alt="" />
              <h2>{singleData?.id}</h2>
            </div>
            <strong className='description'>{singleData?.description?.ar.slice(0, 400)}</strong>
            <p>Rank: <strong>{singleData?.coingecko_rank}</strong></p>
            <p>Current Price: <strong>₹ {singleData?.community_score}</strong></p>
            <p>Market Cap: <strong>₹ {singleData?.coingecko_score}</strong></p>
          </div>
          <div className='chart'><Linechart apiData={params?.id} /></div>
    </div>
  )
}

export default Single