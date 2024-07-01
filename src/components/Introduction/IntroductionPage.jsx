import '../../css/Introduction/IntroductionPage.css';

const IntroductionPage = () => {
  return (
    <div className="container1">
      <div className="intro-textBox">
        <div>
          <h1>뮷즈 소개페이지</h1>
        </div>
        <div>
          <p>박물관을 좀 더 특별하게 보기 위한 방법!
          </p>
          <p>뮷즈를 통해 재탄생한 전시작품을 찾아보세요.
          </p>
        </div>
      </div>

      <div className="intro-moveArea">
        <div className='moveArea1'>
          <div className='move-img1'>
            img1
          </div>
          <div>
            <p>상품을 통한 국립박물관 유산의 인식 확산</p>
          </div>
        </div>
        <div className='moveArea2'>
          <div>
            <p>박물관의 미래가치 확산을 위한 매개체의 역할을 통해 국립박물관의 문화유산 컨텐츠 발굴

            </p>
          </div>
          <div className='move-img2'>
            img2
          </div>
        </div>  <div className='moveArea2'>
          <div className='move-img3'>
            img3
          </div>
          <div>
            <p>굿즈를 통해 국립박물관 문화유산을 통해 우리 일상에 가치를 더함.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
};

export default IntroductionPage;