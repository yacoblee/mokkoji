import '../../css/Introduction/IntroductionPage4.css';

const IntroductionPage4 = () => {
  return (
    <div className="container4">


      <h1>위치 및 운영시간</h1>

      <div className='rowArea'>
        <div className='mapArea'>
        <div className='mapifram'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22038.530132662116!2d126.95190098800315!3d37.52083248112476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2c74aeddea1%3A0x55b41a368bfe0901!2z6rWt66a967CV66y86rSA66y47ZmU7J6s64uo!5e0!3m2!1sko!2skr!4v1719910774570!5m2!1sko!2skr" width="600px" height="500px" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>

        </div>

        <div className='hourArea'>
        <div className='operatinghours'>
          <div>
            <h2>관람시간</h2>
            <p><span className='highlight'>월, 화, 목, 금, 일</span> 10:00 ~ 18:00 (입장 마감: 17:30)</p>
            <p><span className='highlight'>수, 토</span> 10:00 ~ 21:00 (입장 마감: 20:30)</p>
          </div>
          <hr />

          <div>
            <h2>휴관일 및 휴실일</h2>
            <p><span className='highlight'>휴관일</span> 1월1일, 설날(2.10.), 추석(9.17.)</p>
            <p><span className='highlight'>상설전시관 정기휴실일</span> 매년 4월, 11월(첫째 월요일)</p>
            <p><span className='highlight'>2024년 휴실일</span> 4.1.(월), 11.4.(월)</p>
          </div>
          <hr />
          <div>
            <h2>관람료</h2>
            <p><span className='highlight'> 무료</span> 상설전시관, 어린이박물관, 무료 특별전시 해당</p>
            <p><span className='highlight'>유료</span> 유료 특별전시 해당</p>
            <p><span className='highlight'>2024년 휴실일</span> 4.1.(월), 11.4.(월)</p>
          </div>
        </div>

        </div>
      </div>


    </div>
  )
};

export default IntroductionPage4;