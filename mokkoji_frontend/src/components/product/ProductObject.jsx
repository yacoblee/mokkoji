const GoodsItems = [
    // 새로운 상품 1
    {
        name: '한국 전통 무늬 러그',
        id: 19,
        category: 'interiorGoods',
        description: '인테리어 소품',
        slideSrc: [
            '/images/product/pictureFlower1.jpg',
            '/images/product/pictureFlower2.jpg',
            '/images/product/pictureFlower3.jpg',
        ],
        productSrc: [
            '/images/product/pictureFlower1.jpg',
            '/images/product/pictureFlower2.jpg',
            '/images/product/pictureFlower3.jpg',
            '/images/product/pictureFlower4.jpg',
        ],
        count: 40,
        price: 75000,
        size: '상품 크기 : 2000x3000mm',
        guideLine: '* 세탁기 사용 불가, 손세탁 권장',
        mainGuide: `한국 전통 무늬가 들어간 고급 러그입니다.`,
        sideGuide: `인테리어 소품으로 훌륭한 제품입니다.`,
        option: [
            '소', '중', '대'
        ],
        reviews: [
            {
                reviewsSrc: '/images/product/pictureFlower1.jpg',
                userName: 'User1',
                content: "디자인이 너무 예뻐서 방 분위기가 확 달라졌어요.",
                day: '20230325'
            },
            {
                reviewsSrc: null,
                userName: 'User2',
                content: "고급스럽고 튼튼한 러그입니다. 아주 만족해요.",
                day: '20230326'
            },
            {
                reviewsSrc: '/images/product/pictureFlower3.jpg',
                userName: 'User3',
                content: "한국 전통 무늬가 너무 아름다워요. 거실에 잘 어울립니다.",
                day: '20230327'
            }
        ],
    },
    // 새로운 상품 2
    {
        name: '전통 문양 에코백',
        id: 18,
        category: 'fashionGoods',
        description: '패션/생활',
        slideSrc: [
            '/images/product/characterNote4.jpg',
            '/images/product/characterNote5.jpg',
            '/images/product/characterNote3.jpg',
        ],
        productSrc: [
            '/images/product/characterNote4.jpg',
            '/images/product/characterNote5.jpg',
            '/images/product/characterNote3.jpg',
            '/images/product/characterNote2.jpg',
        ],
        count: 50,
        price: 30000,
        size: '상품 크기 : 380x420mm',
        guideLine: '* 세탁기 사용 가능',
        mainGuide: `한국 전통 문양이 새겨진 고급 에코백입니다.`,
        sideGuide: `패션 아이템으로도 훌륭한 제품입니다.`,
        option: [
            '흰색', '검정색'
        ],
        reviews: [
            {
                reviewsSrc: '/images/product/characterNote3.jpg',
                userName: 'User1',
                content: "에코백 디자인이 정말 예뻐요. 가볍고 실용적입니다.",
                day: '20230401'
            },
            {
                reviewsSrc: null,
                userName: 'User2',
                content: "고급스럽고 튼튼한 에코백입니다. 선물용으로도 좋아요.",
                day: '20230402'
            },
            {
                reviewsSrc: '/images/product/characterNote5.jpg',
                userName: 'User3',
                content: "한국 전통 문양이 너무 아름다워요. 매일 사용하고 있습니다.",
                day: '20230403'
            }
        ],
    },
    // 새로운 상품 3
    {
        name: '한복 패턴 담요',
        id: 17,
        category: 'interiorGoods',
        description: '인테리어 소품',
        slideSrc: [
            '/images/product/pictureFlower1.jpg',
            '/images/product/pictureFlower2.jpg',
            '/images/product/pictureFlower3.jpg',
        ],
        productSrc: [
            '/images/product/pictureFlower1.jpg',
            '/images/product/pictureFlower2.jpg',
            '/images/product/pictureFlower3.jpg',
            '/images/product/pictureFlower4.jpg',
        ],
        count: 30,
        price: 50000,
        size: '상품 크기 : 1500x2000mm',
        guideLine: '* 손세탁 권장',
        mainGuide: `전통 한복 패턴이 들어간 고급 담요입니다.`,
        sideGuide: `인테리어 소품으로 훌륭한 제품입니다.`,
        option: [
            '소', '중', '대'
        ],
        reviews: [
            {
                reviewsSrc: '/images/product/pictureFlower1.jpg',
                userName: 'User1',
                content: "담요 디자인이 정말 예뻐요. 따뜻하고 부드럽습니다.",
                day: '20230410'
            },
            {
                reviewsSrc: null,
                userName: 'User2',
                content: "고급스럽고 튼튼한 담요입니다. 만족해요.",
                day: '20230411'
            },
            {
                reviewsSrc: '/images/product/pictureFlower3.jpg',
                userName: 'User3',
                content: "전통 패턴이 너무 아름다워요. 거실에 잘 어울립니다.",
                day: '20230412'
            }
        ],
    },
    // 새로운 상품 4
    {
        name: '한국 전통 무늬 쿠션 커버',
        id: 16,
        category: 'interiorGoods',
        description: '인테리어 소품',
        slideSrc: [
            '/images/product/pictureFlower1.jpg',
            '/images/product/pictureFlower2.jpg',
            '/images/product/pictureFlower3.jpg',
        ],
        productSrc: [
            '/images/product/pictureFlower1.jpg',
            '/images/product/pictureFlower2.jpg',
            '/images/product/pictureFlower3.jpg',
            '/images/product/pictureFlower4.jpg',
        ],
        count: 40,
        price: 20000,
        size: '상품 크기 : 450x450mm',
        guideLine: '* 손세탁 권장',
        mainGuide: `한국 전통 무늬가 새겨진 고급 쿠션 커버입니다.`,
        sideGuide: `인테리어 소품으로 훌륭한 제품입니다.`,
        option: [
            '청색', '적색'
        ],
        reviews: [
            {
                reviewsSrc: '/images/product/pictureFlower1.jpg',
                userName: 'User1',
                content: "디자인이 너무 예뻐서 방 분위기가 달라졌어요.",
                day: '20230420'
            },
            {
                reviewsSrc: null,
                userName: 'User2',
                content: "고급스럽고 튼튼한 쿠션 커버입니다. 만족해요.",
                day: '20230421'
            },
            {
                reviewsSrc: '/images/product/pictureFlower3.jpg',
                userName: 'User3',
                content: "전통 무늬가 너무 아름다워요. 매일 사용하고 있습니다.",
                day: '20230422'
            }
        ],
    },
    // 새로운 상품 5
    {
        name: '한국 전통 문양 우산',
        id: 15,
        category: 'fashionGoods',
        description: '패션/생활',
        slideSrc: [
            '/images/product/sillaKeyring1.jpg',
            '/images/product/sillaKeyring2.jpg',
            '/images/product/sillaKeyring3.jpg',
        ],
        productSrc: [
            '/images/product/sillaKeyring1.jpg',
            '/images/product/sillaKeyring2.jpg',
            '/images/product/sillaKeyring3.jpg',
            '/images/product/sillaKeyring4.jpg',
        ],
        count: 60,
        price: 35000,
        size: '상품 크기 : 1000mm',
        guideLine: '* 손세탁 권장',
        mainGuide: `한국 전통 문양이 새겨진 고급 우산입니다.`,
        sideGuide: `패션 아이템으로도 훌륭한 제품입니다.`,
        option: [
            '흰색', '검정색'
        ],
        reviews: [
            {
                reviewsSrc: '/images/product/sillaKeyring1.jpg',
                userName: 'User1',
                content: "디자인이 정말 예뻐서 우산을 펼치고 다니는 게 즐겁습니다.",
                day: '20230501'
            },
            {
                reviewsSrc: null,
                userName: 'User2',
                content: "고급스럽고 튼튼한 우산입니다. 비 오는 날이 기다려져요.",
                day: '20230502'
            },
            {
                reviewsSrc: '/images/product/sillaKeyring2.jpg',
                userName: 'User3',
                content: "한국 전통 문양이 너무 아름다워요. 매일 사용하고 있습니다.",
                day: '20230503'
            }
        ],
    },
    {
        name: '한글 디자인 머그컵',
        id: 14,
        category: 'kitchGoods',
        description: '주방/식기',
        slideSrc: [
            '/images/product/sillaKeyring1.jpg',
            '/images/product/sillaKeyring2.jpg',
            '/images/product/sillaKeyring3.jpg',
        ],
        productSrc: [
            '/images/product/sillaKeyring1.jpg',
            '/images/product/sillaKeyring2.jpg',
            '/images/product/sillaKeyring3.jpg',
            '/images/product/sillaKeyring2.jpg',

        ],
        count: 80,
        price: 20000,
        size: '상품 크기 : 90x100mm',
        guideLine: '* 식기세척기 사용 가능',
        mainGuide: `한글 디자인이 새겨진 머그컵입니다.`,
        sideGuide: `선물용으로 좋은 패키지에 담겨 있습니다.`,
        option: [
            '흰색', '검정색'
        ],
        reviews: [
            {
                reviewsSrc: '/images/product/sillaKeyring1.jpg',
                userName: 'User1',
                content: "디자인이 너무 예뻐서 매일 사용하고 있어요.",
                day: '20230320'
            },
            {
                reviewsSrc: null,
                userName: 'User2',
                content: "고급스럽고 튼튼한 머그컵입니다. 선물용으로도 좋아요.",
                day: '20230321'
            },
            {
                reviewsSrc: '/images/product/sillaKeyring2.jpg',
                userName: 'User3',
                content: "한글 디자인이 너무 아름다워요. 매일 사용하고 있습니다.",
                day: '20230322'
            }
        ],
    },
    {
        name: '한국 전통 문양 베개 커버',
        id: 13,
        category: 'interiorGoods',
        description: '인테리어 소품',
        slideSrc: [
            '/images/product/pictureFlower1.jpg',
            '/images/product/pictureFlower2.jpg',
            '/images/product/pictureFlower3.jpg',
        ],
        productSrc: [
            '/images/product/pictureFlower1.jpg',
            '/images/product/pictureFlower2.jpg',
            '/images/product/pictureFlower3.jpg',
            '/images/product/pictureFlower2.jpg',

        ],
        count: 60,
        price: 25000,
        size: '상품 크기 : 450x450mm',
        guideLine: '* 손세탁 권장',
        mainGuide: `한국 전통 문양이 새겨진 고급 베개 커버입니다.`,
        sideGuide: `인테리어 소품으로 좋은 패키지에 담겨 있습니다.`,
        option: [
            '청색', '적색'
        ],
        reviews: [
            {
                reviewsSrc: '/images/product/pictureFlower1.jpg',
                userName: 'User1',
                content: "디자인이 너무 예뻐서 방 분위기가 달라졌어요.",
                day: '20230310'
            },
            {
                reviewsSrc: null,
                userName: 'User2',
                content: "고급스럽고 튼튼한 베개 커버입니다. 선물용으로 좋아요.",
                day: '20230311'
            },
            {
                reviewsSrc: '/images/product/pictureFlower3.jpg',
                userName: 'User3',
                content: "한국 전통 문양이 너무 아름다워요. 매일 사용하고 있습니다.",
                day: '20230312'
            }
        ],
    },
    {
        name: '전통 문양 접시 세트',
        id: 12,
        category: 'kitchGoods',
        description: '주방/식기',
        slideSrc: [
            '/images/product/seonbiSojuCup1.jpg',
            '/images/product/seonbiSojuCup2.jpg',
            '/images/product/seonbiSojuCup3.jpg',
        ],
        productSrc: [
            '/images/product/seonbiSojuCup1.jpg',
            '/images/product/seonbiSojuCup2.jpg',
            '/images/product/seonbiSojuCup3.jpg',
            '/images/product/seonbiSojuCup2.jpg',

        ],
        count: 40,
        price: 55000,
        size: '상품 크기 : 200x200mm',
        guideLine: '* 전자레인지 사용 가능',
        mainGuide: `한국 전통 문양이 새겨진 고급 접시 세트입니다.`,
        sideGuide: `선물용으로 좋은 패키지에 담겨 있습니다.`,
        option: [
            '청자색', '백자색'
        ],
        reviews: [
            {
                reviewsSrc: '/images/product/seonbiSojuCup2.jpg',
                userName: 'User1',
                content: "디자인이 너무 예뻐서 집안 분위기를 바꿔줍니다.",
                day: '20230301'
            },
            {
                reviewsSrc: null,
                userName: 'User2',
                content: "고급스럽고 튼튼한 접시입니다. 손님 접대용으로 좋아요.",
                day: '20230302'
            },
            {
                reviewsSrc: '/images/product/seonbiSojuCup3.jpg',
                userName: 'User3',
                content: "한국 전통 문양이 너무 아름다워요. 매일 사용하고 있습니다.",
                day: '20230303'
            }
        ],
    },
    {
        name: '한복 인형',
        id: 11,
        category: 'fashionGoods',
        description: '패션/생활',
        slideSrc: [
            '/images/product/characterNote4.jpg',
            '/images/product/characterNote5.jpg',
            '/images/product/characterNote3.jpg',
        ],
        productSrc: [
            '/images/product/characterNote4.jpg',
            '/images/product/characterNote5.jpg',
            '/images/product/characterNote3.jpg',
            '/images/product/characterNote5.jpg',

        ],
        count: 30,
        price: 40000,
        size: '상품 크기 : 250mm',
        guideLine: '* 손세탁 권장',
        mainGuide: `전통 한복을 입은 인형입니다.`,
        sideGuide: `한국의 아름다운 전통 의상을 재현한 인형입니다.`,
        option: [
            '남아', '여아'
        ],
        reviews: [
            {
                reviewsSrc: '/images/product/characterNote3.jpg',
                userName: 'User1',
                content: "인형이 정말 예뻐요! 전통 한복이 너무 아름답습니다.",
                day: '20230201'
            },
            {
                reviewsSrc: null,
                userName: 'User2',
                content: "딸이 너무 좋아합니다. 예쁜 한복 인형이라 소장 가치가 높아요.",
                day: '20230202'
            },
            {
                reviewsSrc: '/images/product/characterNote5.jpg',
                userName: 'User3',
                content: "고급스러운 디자인과 마감이 인상적입니다.",
                day: '20230203'
            }
        ],
    },
    {
        name: '한국 전통 문양 컵',
        id: 10,
        category: 'kitchGoods',
        description: '주방/식기',
        slideSrc: [
            '/images/product/seonbiSojuCup1.jpg',
            '/images/product/seonbiSojuCup2.jpg',
            '/images/product/seonbiSojuCup3.jpg',
        ],
        productSrc: [
            '/images/product/seonbiSojuCup1.jpg',
            '/images/product/seonbiSojuCup2.jpg',
            '/images/product/seonbiSojuCup3.jpg',
            '/images/product/seonbiSojuCup3.jpg',

        ],
        count: 50,
        price: 30000,
        size: '상품 크기 : 80x100mm',
        guideLine: '* 식기세척기 사용 가능',
        mainGuide: `한국 전통 문양이 새겨진 고급 컵입니다.`,
        sideGuide: `선물용으로 좋은 패키지에 담겨 있습니다.`,
        option: [
            '단일 색상'
        ],
        reviews: [
            {
                reviewsSrc: '/images/product/seonbiSojuCup1.jpg',
                userName: 'User1',
                content: "디자인이 너무 예뻐서 인테리어 소품으로도 훌륭해요.",
                day: '20230117'
            },
            {
                reviewsSrc: '/images/product/seonbiSojuCup2.jpg',
                userName: 'User2',
                content: "고급스럽고 튼튼한 컵입니다. 선물용으로도 좋아요.",
                day: '20230118'
            },
            {
                reviewsSrc: null,
                userName: 'User3',
                content: "한국 전통 문양이 너무 아름다워요. 매일 사용하고 있습니다.",
                day: '20230119'
            }
        ],
    },
    //기존데이터
    {
        name: '훈민정음 티셔츠',
        id: 9,
        category: 'fashionGoods',
        description: '패션/생활',
        slideSrc: [
            '/images/product/characterNote3.jpg',
            '/images/product/characterNote4.jpg',
            '/images/product/characterNote5.jpg',
        ],
        productSrc: [
            '/images/product/characterNote2_1.jpg',
            '/images/product/characterNote2_1.jpg',
            '/images/product/characterNote3.jpg',
            '/images/product/characterNote4.jpg',

        ],
        count: 70,
        price: 45000,
        size: '상품 크기 : S, M, L, XL',
        guideLine: '* 세탁 시 뒤집어서 세탁하세요.',
        mainGuide: `훈민정음의 글자를 디자인한 한정판 티셔츠입니다.`,
        sideGuide: `고급 원단을 사용하여 편안한 착용감을 제공합니다.`,
        option: [
            'S', 'M', 'L', 'XL'
        ],
        reviews: [
            {
                reviewsSrc: '/images/product/characterNote4.jpg',
                userName: 'User1',
                content: "티셔츠 디자인이 정말 독특하고 예뻐요. 훈민정음의 글자 디자인이 마음에 들어요.",
                day: '20230304'
            },
            {
                reviewsSrc: null,
                userName: 'User2',
                content: "고급 원단을 사용해서 착용감이 아주 편안합니다. 세탁 시에도 변형이 없어서 좋습니다.",
                day: '20230305'
            },
            {
                reviewsSrc: '/images/product/characterNote2.jpg',
                userName: 'User3',
                content: "한정판이라 더 특별하게 느껴져요. S 사이즈를 샀는데 딱 맞아서 만족스럽습니다.",
                day: '20230306'
            }
        ],
    },
    {
        name: '전통 문양 고급 펜 세트',
        id: 8,
        category: 'stationeryGoods',
        description: '문구/사무',
        slideSrc: [
            '/images/product/sillaKeyring3.jpg',
            '/images/product/sillaKeyring1.jpg',
            '/images/product/sillaKeyring2.jpg',
        ],
        productSrc: [
            '/images/product/sillaKeyring2_1.jpg',
            '/images/product/sillaKeyring2_2.jpg',
            '/images/product/sillaKeyring2.jpg',
            '/images/product/sillaKeyring3.jpg',

        ],
        count: 100,
        price: 50000,
        size: '상품 크기 : 펜 길이 140mm',
        guideLine: '* 잉크 리필 가능',
        mainGuide: `한국 전통 문양이 새겨진 고급 펜 세트입니다.`,
        sideGuide: `선물용으로 좋은 패키지에 담겨 있습니다.`,
        option: [
            '청동', '은색', '금색'
        ],
        reviews: [
            {
                reviewsSrc: '/images/product/sillaKeyring1.jpg',
                userName: 'User1',
                content: "정말 고급스러운 펜 세트입니다. 디자인도 멋지고 필기감도 좋아요.",
                day: '20230102'
            },
            {
                reviewsSrc: null,
                userName: 'User2',
                content: "전통 문양이 새겨져 있어서 독특하고 예쁩니다. 선물용으로 딱이에요.",
                day: '20230103'
            },
            {
                reviewsSrc: '/images/product/sillaKeyring1.jpg',
                userName: 'User3',
                content: "펜의 무게감이 적당해서 쓰기 편합니다. 잉크 리필도 가능해서 오래 쓸 수 있겠어요.",
                day: '20230104'
            },
            {
                reviewsSrc: '/images/product/sillaKeyring1.jpg',
                userName: 'User4',
                content: "청동색 펜을 구매했는데 색상이 아주 고급스럽고 마음에 들어요.",
                day: '20230105'
            },
            {
                reviewsSrc: null,
                userName: 'User5',
                content: "가격은 조금 비싸지만 그만한 가치가 있는 제품입니다. 강력 추천합니다.",
                day: '20230106'
            },
            {
                reviewsSrc: '/images/product/sillaKeyring1.jpg',
                userName: 'User6',
                content: "패키지가 너무 예쁘게 잘 되어 있어서 선물 받는 사람이 정말 좋아했어요.",
                day: '20230107'
            },
            {
                reviewsSrc: null,
                userName: 'User7',
                content: "필기감이 부드럽고 잉크 번짐도 없어서 만족스럽습니다.",
                day: '20230108'
            },
            {
                reviewsSrc: null,
                userName: 'User8',
                content: "전통 문양이 세련되고 독특해서 사용할 때마다 기분이 좋아요.",
                day: '20230109'
            },
            {
                reviewsSrc: '/images/product/sillaKeyring1.jpg',
                userName: 'User9',
                content: "금색 펜이 너무 예쁘고 고급스러워서 자주 사용하고 있습니다.",
                day: '20230110'
            },
            {
                reviewsSrc: null,
                userName: 'User10',
                content: "펜의 디자인과 품질이 매우 뛰어나서 다른 색상도 추가로 구매할 예정입니다.",
                day: '20230111'
            }
        ],
    },
    {
        name: '조선 왕조 의궤 노트북',
        id: 7,
        category: 'stationeryGoods',
        description: '문구/사무',
        slideSrc: [
            '/images/product/pictureFlower3.jpg',
            '/images/product/pictureFlower4.jpg',
            '/images/product/pictureFlower5.jpg',
            '/images/product/pictureFlower1.jpg',

        ],
        productSrc: [
            '/images/product/pictureFlower2_2.jpg',
            '/images/product/pictureFlower2_1.jpg',
            '/images/product/pictureFlower3.jpg',
            '/images/product/pictureFlower5.jpg',

        ],
        count: 200,
        price: 18000,
        size: '상품 크기 : 150x210mm',
        guideLine: '* 표지가 물에 젖으면 변형될 수 있습니다.',
        mainGuide: `조선 왕조의 의궤를 참고하여 디자인된 노트북입니다.`,
        sideGuide: `튼튼한 제본과 두꺼운 종이로 오랫동안 사용할 수 있습니다.`,
        option: [
            'A5', 'A6', 'B5'
        ],
        reviews: [
            {
                reviewsSrc: '/images/product/pictureFlower4.jpg',
                userName: 'User1',
                content: "노트북의 디자인이 정말 독특하고 아름다워요. 조선 왕조의 의궤를 모티브로 한 것이 마음에 듭니다.",
                day: '20230112'
            },
            {
                userName: 'User2',
                content: "종이가 두껍고 튼튼해서 필기감이 아주 좋아요. 제본도 견고합니다.",
                day: '20230113'
            },
            {
                reviewsSrc: null,
                userName: 'User3',
                content: "가격 대비 품질이 훌륭해요. 오래 사용할 수 있을 것 같아 만족합니다.",
                day: '20230114'
            },
            {
                reviewsSrc: '/images/product/pictureFlower4.jpg',
                userName: 'User4',
                content: "A5 사이즈를 샀는데 크기가 적당해서 들고 다니기 편리해요. 다른 사이즈도 구매하고 싶어요.",
                day: '20230115'
            },
            {
                reviewsSrc: null,
                userName: 'User5',
                content: "표지가 물에 젖으면 변형될 수 있다고 해서 걱정했지만, 관리만 잘하면 문제 없을 것 같아요. 전체적으로 매우 만족합니다.",
                day: '20230116'
            }
        ],
    },
    {
        name: '고려청자 모티브 아로마 캔들',
        id: 6,
        category: 'interiorGoods',
        description: '인테리어 소품',
        slideSrc: [
            '/images/product/seonbiSojuCup3.jpg',
            '/images/product/seonbiSojuCup2.jpg',
            '/images/product/seonbiSojuCup1.jpg',
        ],
        productSrc: [
            '/images/product/seonbiSojuCup1.jpg',
            '/images/product/seonbiSojuCup2.jpg',
            '/images/product/seonbiSojuCup3.jpg',
            '/images/product/seonbiSojuCup1.jpg',

        ],
        count: 50,
        price: 35000,
        size: '상품 크기 : 90x120mm',
        guideLine: '* 향의 강도는 개인에 따라 다를 수 있습니다.',
        mainGuide: `고려청자의 고유한 디자인과 색감을 반영한 아로마 캔들입니다.`,
        sideGuide: `천연 성분만을 사용하여 제작되었습니다.`,
        option: [
            '연꽃 향', '백단 향', '매화 향'
        ],
        reviews: [
            {
                reviewsSrc: '/images/product/seonbiSojuCup1.jpg',
                userName: 'User1',
                content: "정말 향이 좋아요! 은은한 연꽃 향이 방 안을 가득 채워줍니다.",
                day: '20230117'
            },
            {
                reviewsSrc: '/images/product/seonbiSojuCup1.jpg',
                userName: 'User2',
                content: "디자인이 너무 예뻐서 인테리어 소품으로도 훌륭해요.",
                day: '20230118'
            },
            {
                reviewsSrc: null,
                userName: 'User3',
                content: "천연 성분이라 안심하고 사용할 수 있어서 좋아요. 백단 향도 마음에 듭니다.",
                day: '20230119'
            },
            {
                reviewsSrc: '/images/product/seonbiSojuCup1.jpg',
                userName: 'User4',
                content: "고려청자 디자인이 독특하고 고급스러워요. 매화 향도 아주 좋습니다.",
                day: '20230120'
            },
            {
                reviewsSrc: '/images/product/seonbiSojuCup1.jpg',
                userName: 'User5',
                content: "향의 강도가 딱 적당해서 기분이 좋아져요. 추천합니다!",
                day: '20230121'
            },
            {
                reviewsSrc: '/images/product/seonbiSojuCup1.jpg',
                userName: 'User6',
                content: "선물용으로 샀는데 받는 사람이 너무 좋아했어요. 다음에도 또 구매할게요.",
                day: '20230122'
            },
            {
                reviewsSrc: null,
                userName: 'User7',
                content: "디테일이 살아있고, 캔들 켜놓으면 정말 힐링이 되는 느낌이에요.",
                day: '20230123'
            }
        ],
    },
    {
        name: '롱롱타임플라워 초충도 에디션2',
        id: 5,
        category: 'interiorGoods',
        description: '인테리어 소품',
        slideSrc: [
            '/images/product/pictureFlower1.jpg',
            '/images/product/pictureFlower2.jpg',
            '/images/product/pictureFlower3.jpg',
            '/images/product/pictureFlower4.jpg',
            '/images/product/pictureFlower5.jpg',
        ],
        productSrc: [
            '/images/product/pictureFlower2_1.jpg',
            '/images/product/pictureFlower2_2.jpg',
            '/images/product/pictureFlower2_3.jpg',
            '/images/product/pictureFlower2_4.jpg',
            // '/images/product/pictureFlower2_5.jpg',
            // '/images/product/pictureFlower2_6.jpg',
        ],
        count: 120,
        price: 65000,
        size: `상품 크기 : (꽃, 잎) 100~170mm 이내

        (두께) 약1mm

        패키지 크기 : 338x400mm

        상품 소재 : 종이

        상품 구성 : 1세트에 7개입(꽃,잎,곤충), 패키지, opp봉투`,
        guideLine: '* 해당 제품은 한정 상품으로 현재는 구매 불가합니다. (재입고 예정없음)',
        mainGuide:
            `국립박물관문화재단 상품 브랜드 <뮷즈>와
        <나난> 작가의 콜라보 상품입니다.
        네이버 쇼핑 '뮤지엄숍'에서 판매 중입니다.`,
        sideGuide:
            `국립중앙박물관 소장품 '초충도'를 활용하여
        나난 작가와
        국립박물관 상품 브랜드 '뮷즈(MU:DS)'가
        협업하여 제작한 상품입니다.`,
        option:
            ['소', '중(+220000원) 퀵 발송,별도 부가', '대(+722000원) 퀵발송,별도 부가'],
        reviews: [
            {
                reviewsSrc: '/images/product/pictureFlower5.jpg',
                userName: 'User1',
                content: "정말 아름다운 인테리어 소품이에요. 방이 화사해졌어요!",
                day: '20230124'
            },
            {
                reviewsSrc: null,
                userName: 'User2',
                content: "디자인이 너무 예쁘고 고급스러워요. 구매하길 잘했어요.",
                day: '20230125'
            },
            {
                reviewsSrc: null,
                userName: 'User3',
                content: "선물용으로 샀는데 받는 사람이 너무 좋아했어요. 강력 추천합니다.",
                day: '20230126'
            },
            {
                reviewsSrc: '/images/product/pictureFlower5.jpg',
                userName: 'User4',
                content: "고객 서비스도 좋고 제품도 훌륭해요. 재구매 의사 100%입니다.",
                day: '20230127'
            },
            {
                reviewsSrc: '/images/product/pictureFlower5.jpg',
                userName: 'User5',
                content: "생각보다 더 예쁜 색감에 놀랐어요. 사진보다 실물이 훨씬 나아요.",
                day: '20230128'
            },
            {
                reviewsSrc: null,
                userName: 'User6',
                content: "퀄리티가 정말 좋아요. 디테일이 살아있어서 감동받았어요.",
                day: '20230129'
            },
            {
                reviewsSrc: null,
                userName: 'User7',
                content: "가격이 좀 비싸다고 생각했지만, 받아보고 나니 그만한 가치가 있네요.",
                day: '20230130'
            },
            {
                reviewsSrc: '/images/product/pictureFlower5.jpg',
                userName: 'User8',
                content: "초충도의 아름다움을 일상에서 느낄 수 있어서 너무 좋아요.",
                day: '20230131'
            },
            {
                reviewsSrc: null,
                userName: 'User9',
                content: "패키지도 너무 예쁘게 잘 되어 있어서 선물용으로도 딱입니다.",
                day: '20230201'
            },
            {
                reviewsSrc: '/images/product/pictureFlower5.jpg',
                userName: 'User10',
                content: "작가와의 콜라보라서 더 의미가 있는 것 같아요. 집안 분위기가 확 바뀌었어요.",
                day: '20230202'
            },
            {
                reviewsSrc: null,
                userName: 'User11',
                content: "한정 상품이라 구매 못할까 봐 걱정했는데, 다행히 살 수 있었어요. 매우 만족합니다.",
                day: '20230203'
            },
            {
                reviewsSrc: null,
                userName: 'User12',
                content: "섬세한 디자인이 정말 마음에 듭니다. 방에 하나 두니까 확실히 분위기가 살아요.",
                day: '20230204'
            }
        ],
    },
    {
        name: '흑자 달항아리',
        id: 4,
        category: 'handicraftGoods',
        description: '공예품',
        slideSrc: [
            '/images/product/moonJar1.jpg',
            '/images/product/moonJar2.jpg',
            '/images/product/moonJar3.jpg',
            '/images/product/moonJar4.jpg',

        ],
        productSrc: [
            '/images/product/moonJar1.jpg',
            '/images/product/moonJar2_1.jpg',
            '/images/product/moonJar2_2.jpg',
            '/images/product/moonJar4.jpg',


        ],
        count: 23,
        price: 224000,
        size: `상품 크기 :(소)140x140x150mm, (중)200X200X220mm, (대)300X300X320mm

        상품 소재 : 도자기

        상품 구성 : 달항아리 1개(3종 택1), 패키지`,
        guideLine: '중, 대 크기는 수도권 내 퀵 발송만 가능합니다.(택배 발송 불가, 퀵비 별도부과)',
        mainGuide:
            `짙은 흙을 바탕으로 작업한 흑자 귀얄 달항아리는
        표면에 분청사기 장식 기법 중 하나인
        '귀얄기법'을 응용하여 작품을 완성하였습니다.`,
        sideGuide:
            `기존의 백자달항아리와는 달리
        표면에 자연스러운 붓터치감이 특징이 작품이며
        공간의 무게감을 줌으로써 오브제나 화기로 사용이 가능합니다.`,
        option:
            ['소', '중(+220000원) 퀵 발송,별도 부가', '대(+722000원) 퀵발송,별도 부가'],
        reviews: [
            {
                reviewsSrc: '/images/product/moonJar1.jpg',
                userName: 'User1',
                content: "이 흑자 달항아리는 정말 아름답습니다. 공간에 무게감을 주어 인테리어에 아주 좋습니다.",
                day: '20230228'
            },
            {
                reviewsSrc: '/images/product/moonJar1.jpg',
                userName: 'User2',
                content: "작품의 퀄리티가 정말 훌륭합니다. 자연스러운 붓터치감이 특히 마음에 듭니다.",
                day: '20230301'
            },
            {
                reviewsSrc: '/images/product/moonJar1.jpg',
                userName: 'User3',
                content: "퀵 발송 서비스를 이용했는데 매우 신속하게 배송되었습니다. 상품도 안전하게 잘 도착했습니다.",
                day: '20230302'
            },
            {
                reviewsSrc: null,
                userName: 'User4',
                content: "달항아리의 디자인과 마감이 매우 만족스럽습니다. 고급스러운 느낌을 주어 아주 좋습니다.",
                day: '20230303'
            }
        ],
    },
    {
        name: '반가사유상 캐릭터 스프링 수첩',
        id: 3,
        category: 'stationeryGoods',
        description: '문구/사무',
        slideSrc: [
            '/images/product/characterNote1.jpg',
            '/images/product/characterNote2.jpg',
            '/images/product/characterNote3.jpg',
            '/images/product/characterNote4.jpg',
            '/images/product/characterNote5.jpg',
        ],
        productSrc: [
            '/images/product/characterNote2_1.jpg',
            '/images/product/characterNote2_2.jpg',
            '/images/product/characterNote2_3.jpg',
            '/images/product/characterNote2_4.jpg',
            // '/images/product/characterNote2_5.jpg',
        ],
        count: 59,
        price: 3000,
        size: `상품 크기 : 75x120mm
        상품 구성 : 스프링수첩 1개(2종 택1), opp 봉투, 약 70장(1,2장 오차 있음)`,
        mainGuide:
            `국립중앙박물관 대표 유물 '반가사유상'이
        귀엽고 친근한 캐릭터로 재탄생하였습니다.
        반가사유상 캐릭터의 잔잔한 미소와
        존재감 있는 색상이 특징인 상품입니다.`,
        sideGuide:
            `수첩의 내부는 무선이며
        반가사유상 캐릭터가 은은하게
        프린트 되어있어
        다양하게 사용하기 좋습니다.`,
        option:
            ['하트 뿅뿅(블루)', '좋은 생각(퍼플)'],
        reviews: [
            {
                reviewsSrc: null,
                userName: 'User1',
                content: "정말 귀엽고 실용적인 수첩이에요! 디자인도 예쁘고 품질도 좋아요.",
                day: '20230205'
            },
            {
                reviewsSrc: null,
                userName: 'User2',
                content: "작고 가벼워서 휴대하기 좋아요. 반가사유상 캐릭터가 너무 귀여워요.",
                day: '20230206'
            },
            {
                reviewsSrc: '/images/product/characterNote4.jpg',
                userName: 'User3',
                content: "가격 대비 훌륭한 품질입니다. 종이 질감도 좋고 디자인도 마음에 들어요.",
                day: '20230207'
            },
            {
                reviewsSrc: null,
                userName: 'User4',
                content: "수첩 내부의 캐릭터 프린트가 은은해서 보기 좋아요. 다양한 용도로 사용하기 좋습니다.",
                day: '20230208'
            },
            {
                reviewsSrc: '/images/product/characterNote4.jpg',
                userName: 'User5',
                content: "선물용으로 구매했는데 받는 사람이 매우 좋아했습니다. 추천합니다!",
                day: '20230209'
            },
            {
                reviewsSrc: null,
                userName: 'User6',
                content: "반가사유상 캐릭터가 너무 귀엽고 독특해서 소장 가치가 높습니다.",
                day: '20230210'
            }
        ],
    },
    {
        name: '박물관 키링(신라의 미소)',
        id: 2,
        category: 'fashionGoods',
        description: '패션/생활',
        slideSrc: [
            '/images/product/sillaKeyring1.jpg',
            '/images/product/sillaKeyring2.jpg',
            '/images/product/sillaKeyring3.jpg',

        ],
        productSrc: [
            '/images/product/sillaKeyring2_1.jpg',
            '/images/product/sillaKeyring2_2.jpg',
            '/images/product/sillaKeyring2_3.jpg',
            '/images/product/sillaKeyring3.jpg',

        ],
        count: 90,
        price: 20000,
        size: `상품 크기 :포장크기: 85X170X30mm<br />
        상품 구성 : 키링 1개`,
        mainGuide:
            `국립 경주박물관 주요 유물
        <얼굴무늬 수막새>를 주제로 한
        박물관 기념 키링입니다.
        유물의 형태를 구현하고
        섬세한 자수가 어우러진 키링입니다.
        `,
        sideGuide:
            `국립박물관 유물의 아름다움을
        일상에서 마주할 수 있도록
        활용도 높은 문구 및 생활소품으로
        기획했습니다. `,
        option:
            ['박물관 키링(신라의 미소)'],
        reviews: [
            {
                reviewsSrc: '/images/product/sillaKeyring1.jpg',
                userName: 'User1',
                content: "정말 멋진 제품입니다! 디자인도 예쁘고 사용하기도 편리해요.",
                day: '20230211'
            },
            {
                reviewsSrc: null,
                userName: 'User2',
                content: "가격 대비 품질이 아주 훌륭합니다. 강력 추천합니다.",
                day: '20230212'
            },
            {
                reviewsSrc: '/images/product/sillaKeyring1.jpg',
                userName: 'User3',
                content: "배송도 빠르고 포장도 꼼꼼히 되어 왔어요. 감사합니다.",
                day: '20230213'
            },
            {
                reviewsSrc: '/images/product/sillaKeyring1.jpg',
                userName: 'User4',
                content: "생각보다 크기가 작아서 살짝 실망했어요. 그래도 쓸만합니다.",
                day: '20230214'
            },
            {
                reviewsSrc: null,
                userName: 'User5',
                content: "친구에게 선물했는데 아주 좋아하네요. 다음에도 구매할게요!",
                day: '20230215'
            },
            {
                reviewsSrc: '/images/product/sillaKeyring1.jpg',
                userName: 'User6',
                content: "몇 번 사용해봤는데 매우 만족합니다. 또 구매하고 싶어요.",
                day: '20230216'
            },
            {
                reviewsSrc: null,
                userName: 'User7',
                content: "처음에는 망설였는데 사길 잘한 것 같아요. 대만족입니다.",
                day: '20230217'
            }
        ],
    },
    {
        name: '취객선비 3인방 변색 잔세트',
        id: 1,
        category: 'kitchGoods',
        description: '주방/식기',
        slideSrc: [
            '/images/product/seonbiSojuCup1.jpg',
            '/images/product/seonbiSojuCup2.jpg',
            '/images/product/seonbiSojuCup3.jpg',
            '/images/product/seonbiSojuCup4.jpg',
        ],
        productSrc: [
            // '/images/product/seonbiSojuCup2_1.jpg',
            '/images/product/seonbiSojuCup1.jpg',
            '/images/product/seonbiSojuCup2.jpg',
            '/images/product/seonbiSojuCup3.jpg',
            '/images/product/seonbiSojuCup4.jpg',
        ],
        count: 220,
        price: 26000,
        size: `상품 크기 :윗면 지름 46mm, 바닥면 지름 44mm, 높이 58mm
        상품 소재 : 유리
        상품 구성 : 유리잔 낱개 3개, 패키지`,
        guideLine: '* 해당 제품은 품절로 현재는 구매 불가합니다. (재입고 7/4)',
        mainGuide:
            `국립박물관문화재단 소장품 번호 5769
        [전 김홍도 필 평안감사향연도]에 등장하는.
        취객 선비 3인방을 모티브로 디자인된 변색 소주잔 입니다.`,
        sideGuide:
            `온도에 반응하는 시온 안료 프린팅으로,
        잔에 차가운 술이 담기면
        선비들의 얼굴이 붉게 물들며
        즐거운 술자리 분위기를 연출합니다.`,
        option:
            ['취객선비 3인방 변색 잔세트'],
        reviews: [
            {
                reviewsSrc: '/images/product/seonbiSojuCup1.jpg',
                userName: 'User1',
                content: "정말 멋진 제품입니다! 디자인도 예쁘고 사용하기도 편리해요.",
                day: '20230218'
            },
            {
                reviewsSrc: '/images/product/seonbiSojuCup2.jpg',
                userName: 'User2',
                content: "가격 대비 품질이 아주 훌륭합니다. 강력 추천합니다.",
                day: '20230219'
            },
            {
                reviewsSrc: null,
                userName: 'User3',
                content: "배송도 빠르고 포장도 꼼꼼히 되어 왔어요. 감사합니다.",
                day: '20230220'
            },
            {
                reviewsSrc: '/images/product/seonbiSojuCup1.jpg',
                userName: 'User4',
                content: "생각보다 크기가 작아서 살짝 실망했어요. 그래도 쓸만합니다.",
                day: '20230221'
            },
            {
                reviewsSrc: '/images/product/seonbiSojuCup1.jpg',
                userName: 'User5',
                content: "친구에게 선물했는데 아주 좋아하네요. 다음에도 구매할게요!",
                day: '20230222'
            },
            {
                reviewsSrc: null,
                userName: 'User6',
                content: "제품 설명대로 온도에 따라 색이 변하는 게 너무 신기해요!",
                day: '20230223'
            },
            {
                reviewsSrc: '/images/product/seonbiSojuCup1.jpg',
                userName: 'User7',
                content: "몇 번 사용해봤는데 매우 만족합니다. 또 구매하고 싶어요.",
                day: '20230224'
            },
            {
                reviewsSrc: '/images/product/seonbiSojuCup2.jpg',
                userName: 'User8',
                content: "처음에는 망설였는데 사길 잘한 것 같아요. 대만족입니다.",
                day: '20230225'
            },
            {
                reviewsSrc: '/images/product/seonbiSojuCup1.jpg',
                userName: 'User9',
                content: "색상이 아주 예쁘고 고급스러워 보입니다. 인테리어에도 잘 어울려요.",
                day: '20230226'
            },
            {
                reviewsSrc: null,
                userName: 'User10',
                content: "유리 재질이 견고하고 고급스럽습니다. 오래 쓸 수 있을 것 같아요.",
                day: '20230227'
            }
        ],
    },
]

export default GoodsItems;
