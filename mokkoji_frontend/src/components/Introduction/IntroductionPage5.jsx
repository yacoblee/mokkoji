import { useEffect, useRef } from 'react';
import '../../css/Introduction/IntroductionPage5.css';
import MudsInfo from './MudsInfo';
const IntroductionPage5 = () => {

  const RenderMudsImg = () => {
    return (
      <p className='imgBox'>
        {MudsInfo.map((img) => (
          <img src={img.src} alt={`img-${img.index}`} key={img.index} />
        ))}
      </p>
    )
  }

  const RenderMudsInfo = () => {
    return (
      <div className='renderinfo'>
        {MudsInfo.map((it) => (
          <div key={it.index} className='inforow'>
            <p>위치 : {it.area}</p>
            <p>매장 이름 : {it.name}</p>
            <p>매장 위치 : {it.location}</p>
            <p>전화번호 : {it.tel}</p>
            <p>운영시간 : {it.inforone}</p>
            <p>휴무일 : {it.closingDay}</p>
          </div>
        ))}
      </div>
    )
  }




  return (
    <div className='cotainer5'>
      <div className='outContainer'>

        <div className='sText'>
          <RenderMudsInfo />
        </div>
        <div className='sImg'>
          <RenderMudsImg />
        </div>
      </div>
    </div>
  )
};

export default IntroductionPage5;