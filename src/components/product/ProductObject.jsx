const GoodsItems = [
    {
        name : '롱롱타임플라워 초충도 에디션2', 
        category : 'interiorGoods',
        slideSrc : [
            './productIMG/pictureFlower1.jpg',
            './productIMG/pictureFlower2.jpg',
            './productIMG/pictureFlower3.jpg',
            './productIMG/pictureFlower4.jpg',
            './productIMG/pictureFlower5.jpg',
        ],
        productSrc : [
            './productIMG/pictureFlower2_1.jpg',
            './productIMG/pictureFlower2_2.jpg',
            './productIMG/pictureFlower2_3.jpg',
            './productIMG/pictureFlower2_4.jpg',
            './productIMG/pictureFlower2_5.jpg',
            './productIMG/pictureFlower2_6.jpg',
        ],
        count : 120,
        price : 65000,
        size :`상품 크기 : (꽃, 잎) 100~170mm 이내
        (두께) 약1mm
        패키지 크기 : 338x400mm
        상품 소재 : 종이
        상품 구성 : 1세트에 7개입(꽃,잎,곤충),
        패키지, opp봉투`,
        guideLine : '* 해당 제품은 한정 상품으로 현재는 구매 불가합니다. (재입고 예정없음)',
        mainGuide : 
        `국립박물관문화재단 상품 브랜드 <뮷즈>와
        <나난> 작가의 콜라보 상품입니다.
        네이버 쇼핑 '뮤지엄숍'에서 판매 중입니다.`,
        sideGuide :
        `국립중앙박물관 소장품 '초충도'를 활용하여
        나난 작가와
        국립박물관 상품 브랜드 '뮷즈(MU:DS)'가
        협업하여 제작한 상품입니다.`,

    },
    {
        name : '흑자 달항아리', 
        category : 'handicraftGoods',
        slideSrc : [
            './productIMG/moonJar1.jpg',
            './productIMG/moonJar2.jpg',
            './productIMG/moonJar3.jpg',
            './productIMG/moonJar4.jpg',

        ],
        productSrc : [
            './productIMG/moonJar1.jpg',
            './productIMG/moonJar2_1.jpg',
            './productIMG/moonJar2_2.jpg',
  
        ],
        count : 23,
        price : 224000,
        size :`상품 크기 :(소)140x140x150mm, (중)200X200X220mm, (대)300X300X320mm
        상품 소재 : 도자기
        상품 구성 : 달항아리 1개(3종 택1), 패키지`,
        guideLine : '중, 대 크기는 수도권 내 퀵 발송만 가능합니다.(택배 발송 불가, 퀵비 별도부과)',
        mainGuide : 
        `짙은 흙을 바탕으로 작업한 흑자 귀얄 달항아리는
        표면에 분청사기 장식 기법 중 하나인
        '귀얄기법'을 응용하여 작품을 완성하였습니다.`,
        sideGuide :
        `기존의 백자달항아리와는 달리
        표면에 자연스러운 붓터치감이 특징이 작품이며
        공간의 무게감을 줌으로써 오브제나 화기로 사용이 가능합니다.`,
        option : 
        ['소','중(+220000) 퀵 발송,별도 부가','대(+722000) 퀵발송,별도 부가'],

    },
    {
        name : '반가사유상 캐릭터 스프링 수첩', 
        category : 'stationeryGoods',
        slideSrc : [
            './productIMG/characterNote1.jpg',
            './productIMG/characterNote2.jpg',
            './productIMG/characterNote3.jpg',
            './productIMG/characterNote4.jpg',
            './productIMG/characterNote5.jpg',
        ],
        productSrc : [
            './productIMG/characterNote2_1.jpg',
            './productIMG/characterNote2_2.jpg',
            './productIMG/characterNote2_3.jpg',
            './productIMG/characterNote2_4.jpg',
            './productIMG/characterNote2_5.jpg',
        ],
        count : 59,
        price : 3000,
        size :`상품 크기 : 75x120mm
        상품 구성 : 스프링수첩 1개(2종 택1), opp 봉투, 약 70장(1,2장 오차 있음)`,
        mainGuide : 
        `국립중앙박물관 대표 유물 '반가사유상'이
        귀엽고 친근한 캐릭터로 재탄생하였습니다.
        반가사유상 캐릭터의 잔잔한 미소와
        존재감 있는 색상이 특징인 상품입니다.`,
        sideGuide :
        `수첩의 내부는 무선이며
        반가사유상 캐릭터가 은은하게
        프린트 되어있어
        다양하게 사용하기 좋습니다.`,
        option : 
        ['하트 뿅뿅(블루)', '좋은 생각(퍼플)'],
    },
    {
        name : '박물관 키링(신라의 미소)', 
        category : 'fashionGoods',
        slideSrc : [
            './productIMG/sillaKeyring1.jpg',
            './productIMG/sillaKeyring2.jpg',
            './productIMG/sillaKeyring3.jpg',

        ],
        productSrc : [
            './productIMG/sillaKeyring2_1.jpg',
            './productIMG/sillaKeyring2_2.jpg',
            './productIMG/sillaKeyring2_3.jpg',
        ],
        count : 90,
        price : 20000,
        size :`상품 크기 :포장크기: 85X170X30mm
        상품 구성 : 키링 1개`,
        mainGuide : 
        `국립 경주박물관 주요 유물
        <얼굴무늬 수막새>를 주제로 한
        박물관 기념 키링입니다.
        유물의 형태를 구현하고 
        섬세한 자수가 어우러진 키링입니다. 
        키링을 가방, 파우치 등의 
        소지품에 장식하여 
        재미있게 소장해보세요.`,
        sideGuide :
        `국립박물관 유물의 아름다움을
        일상에서 마주할 수 있도록
        활용도 높은 문구 및 생활소품으로
        기획했습니다. `,
        option : 
        ['박물관 키링(신라의 미소)'],
    },
    {
        name : '취객선비 3인방 변색 잔세트', 
        category : 'kitchGoods',
        slideSrc : [
            './productIMG/seonbiSojuCup1.jpg',
            './productIMG/seonbiSojuCup2.jpg',
            './productIMG/seonbiSojuCup3.jpg',
            './productIMG/seonbiSojuCup4.jpg',
        ],
        productSrc : [
            './productIMG/seonbiSojuCup2_1.jpg',
        ],
        count : 220,
        price : 26000,
        size :`상품 크기 :윗면 지름 46mm, 바닥면 지름 44mm, 높이 58mm
        상품 소재 : 유리
        상품 구성 : 유리잔 낱개 3개, 패키지`,
        guideLine : '* 해당 제품은 품절로 현재는 구매 불가합니다. (재입고 7/4)',
        mainGuide : 
        `국립박물관문화재단 소장품 번호 5769
        [전 김홍도 필 평안감사향연도]에 등장하는.
        취객 선비 3인방을 모티브로 디자인된 변색 소주잔 입니다.`,
        sideGuide :
        `온도에 반응하는 시온 안료 프린팅으로,
        잔에 차가운 술이 담기면
        선비들의 얼굴이 붉게 물들며 
        즐거운 술자리 분위기를 연출합니다.`,
        option : 
        ['취객선비 3인방 변색 잔세트'],

    },
]

export default GoodsItems ;

