const userInfo = [
    {
        index: 1,
        name: '김철수',
        birth: '1985-05-15',
        zoneCode: '12345',
        address: '서울시 강남구 테헤란로 123',
        addressDetail: '213동 128호',
        gender: 'M',
        phoneNumber: '01012345678',
        email: 'asljfol',
        emailType: 'gmail.com',
        id: 's1',
        pw: 's1!',
        loginCount: 45,
        totalPurchaseCount: 10,
        totalPurchaseAmount: 500000,
        lastLoginDate: '2024-06-10',
        mypage: {
            history: [
                { date: '2024-06-01', item: [1] },
                { date: '2024-06-05', item: [5, 2, 3] },
            ],
            Reservation: [
                { reserveItem: 1, name: '영롱한 자개소반 미니어처 만들기', date: '2024-07-12', adult: 1, teenager: 1 },
            ],
            review: null,
            isLike: [1, 2, 3],
            basket: [
                {
                    productId: 2,
                    options: {
                        contentSelect: '박물관 키링(신라의 미소)',
                        packagingSelect: '굿즈 기본 포장(+0원)',
                    },
                    count: 1,
                    totalPrice: 20000
                },
                {
                    productId: 6,
                    options: {
                        contentSelect: '연꽃 향',
                        packagingSelect: '굿즈 부직포 가방(+2000원)',
                    },
                    count: 1,
                    totalPrice: 70000
                },
                {
                    productId: 7,
                    options: {
                        contentSelect: 'A5',
                        packagingSelect: '굿즈 천 가방(+4000원)',
                    },
                    count: 1,
                    totalPrice: 18000
                }
            ]
        }
    },
    {
        index: 2,
        name: '박영희',
        birth: '1990-07-20',
        zoneCode: '12345',
        address: '부산시 해운대구 해운대로 456',
        addressDetail: '263동 182호',
        gender: 'F',
        phoneNumber: '01087654321',
        email: 'younghee90',
        emailType: 'daum.net',
        id: 'younghee90',
        pw: 'password2@',
        loginCount: 30,
        totalPurchaseCount: 5,
        totalPurchaseAmount: 250000,
        lastLoginDate: '2024-06-12',
        mypage: {
            history: [
                { date: '2024-06-02', item: [2, 1, 4] },
                { date: '2024-06-06', item: [4] },
            ],
            review: null,
            isLike: [2, 4, 6],
            basket: [
                {
                    productId: 2,
                    options: {
                        contentSelect: '박물관 키링(신라의 미소)',
                        packagingSelect: '굿즈 기본 포장(+0원)',
                    },
                    count: 1,
                    totalPrice: 20000
                },
                {
                    productId: 6,
                    options: {
                        contentSelect: '연꽃 향',
                        packagingSelect: '굿즈 부직포 가방(+2000원)',
                    },
                    count: 1,
                    totalPrice: 37000
                },
                {
                    productId: 7,
                    options: {
                        contentSelect: 'A5',
                        packagingSelect: '굿즈 천 가방(+4000원)',
                    },
                    count: 1,
                    totalPrice: 22000
                }
            ]
        }
    },
    {
        index: 3,
        name: '이민지',
        birth: '1988-08-30',
        zoneCode: '12345',
        address: '대전시 유성구 엑스포로 789',
        addressDetail: '328동 127호',
        gender: 'F',
        phoneNumber: '01098765432',
        email: 'minji88',
        emailType: 'gmail.com',
        id: 'minji88',
        pw: 'password3#',
        loginCount: 50,
        totalPurchaseCount: 15,
        totalPurchaseAmount: 750000,
        lastLoginDate: '2024-06-14',
        mypage: {
            history: [
                { date: '2024-06-03', item: [5] },
                { date: '2024-06-07', item: [7, 6, 4] },
            ],
            review: null,
            isLike: [5, 7, 9],
            basket: [
                {
                    productId: 3,
                    options: {
                        contentSelect: '하트 뿅뿅(블루)',
                        packagingSelect: '굿즈 기본 포장(+0원)'
                    },
                    count: 1,
                    totalPrice: 15000
                },
                {
                    productId: 8,
                    options: {
                        contentSelect: '금색',
                        packagingSelect: '굿즈 부직포 가방(+2000원)'
                    },
                    count: 1,
                    totalPrice: 52000
                },
                {
                    productId: 9,
                    options: {
                        contentSelect: 'M',
                        packagingSelect: '굿즈 천 가방(+4000원)'
                    },
                    count: 1,
                    totalPrice: 49000
                }
            ]
        }
    },
    {
        index: 4,
        name: '최수정',
        birth: '1992-12-12',
        zoneCode: '12345',
        address: '광주시 서구 내방로 987',
        addressDetail: '236동 182호',
        gender: 'F',
        phoneNumber: '01023456789',
        email: 'soojung92',
        emailType: 'hanmail.net',
        id: 'soojung92',
        pw: 'password4!',
        loginCount: 20,
        totalPurchaseCount: 8,
        totalPurchaseAmount: 400000,
        lastLoginDate: '2024-06-13',
        mypage: {
            Reservation: [
                { name: '', date: '', adult: '', teenager: '', reservitem: '' },

            ],
            history: [
                { date: '2024-06-04', item: [6] },
                { date: '2024-06-08', item: [8] },
            ],
            review: null,
            isLike: [3, 5, 7],
            basket: [
                {
                    productId: 4,
                    options: {
                        contentSelect: '소',
                        packagingSelect: '굿즈 기본 포장(+0원)'
                    },
                    count: 1,
                    totalPrice: 224000
                },
                {
                    productId: 5,
                    options: {
                        contentSelect: '소',
                        packagingSelect: '굿즈 부직포 가방(+2000원)'
                    },
                    count: 1,
                    totalPrice: 67000
                },
                {
                    productId: 6,
                    options: {
                        contentSelect: '백단 향',
                        packagingSelect: '굿즈 천 가방(+4000원)'
                    },
                    count: 1,
                    totalPrice: 39000
                }
            ]
        }
    },
    {
        index: 5,
        name: '홍길동',
        birth: '1980-03-01',
        zoneCode: '12345',
        address: '인천시 남구 주안로 654',
        addressDetail: '276동 1728호',
        gender: 'M',
        phoneNumber: '01034567890',
        email: 'gildong80',
        emailType: 'nate.com',
        id: 'gildong80',
        pw: 'password5@',
        loginCount: 15,
        totalPurchaseCount: 12,
        totalPurchaseAmount: 600000,
        lastLoginDate: '2024-06-11',
        mypage: {
            history: [
                { date: '2024-06-09', item: [9] },
                { date: '2024-06-10', item: [1] },
            ],
            review: null,
            isLike: [6, 7, 8],
            basket: [
                {
                    productId: 1,
                    options: {
                        contentSelect: '취객선비 3인방 변색 잔세트',
                        packagingSelect: '굿즈 기본 포장(+0원)'
                    },
                    count: 1,
                    totalPrice: 26000
                },
                {
                    productId: 2,
                    options: {
                        contentSelect: '박물관 키링(신라의 미소)',
                        packagingSelect: '굿즈 부직포 가방(+2000원)'
                    },
                    count: 1,
                    totalPrice: 22000
                },
                {
                    productId: 3,
                    options: {
                        contentSelect: '하트 뿅뿅(블루)',
                        packagingSelect: '굿즈 천 가방(+4000원)'
                    },
                    count: 1,
                    totalPrice: 7000
                }
            ]
        }
    },
    {
        index: 6,
        name: '강다혜',
        birth: '1995-09-23',
        zoneCode: '12345',
        address: '경기 광주시 태재로 133-35 스토리빌 301호',
        addressDetail: '278동 627호',
        gender: 'F',
        phoneNumber: '01036789041',
        email: 'dahye95',
        emailType: 'naver.com',
        id: 'dahye95',
        pw: 'password6#',
        loginCount: 25,
        totalPurchaseCount: 7,
        totalPurchaseAmount: 350000,
        lastLoginDate: '2024-06-15',
        mypage: {
            history: [
                { date: '2024-06-11', item: [2] },
                { date: '2024-06-12', item: [4, 6] },
            ],
            review: null,
            isLike: [2, 3, 4],
            basket: [
                {
                    productId: 5,
                    options: {
                        contentSelect: '소',
                        packagingSelect: '굿즈 기본 포장(+0원)'
                    },
                    count: 1,
                    totalPrice: 65000
                },
                {
                    productId: 6,
                    options: {
                        contentSelect: '연꽃 향',
                        packagingSelect: '굿즈 부직포 가방(+2000원)'
                    },
                    count: 1,
                    totalPrice: 37000
                },
                {
                    productId: 7,
                    options: {
                        contentSelect: 'A5',
                        packagingSelect: '굿즈 천 가방(+4000원)'
                    },
                    count: 1,
                    totalPrice: 22000
                }
            ]
        }
    },
    {
        index: 7,
        name: '서지훈',
        birth: '1993-04-05',
        zoneCode: '12345',
        address: '서울시 마포구 월드컵북로 321',
        addressDetail: '272동 1827호',
        gender: 'M',
        phoneNumber: '01056781234',
        email: 'jihoon93',
        emailType: 'daum.net',
        id: 'jihoon93',
        pw: 'password7!',
        loginCount: 35,
        totalPurchaseCount: 9,
        totalPurchaseAmount: 450000,
        lastLoginDate: '2024-06-16',
        mypage: {
            history: [
                { date: '2024-06-13', item: [3] },
                { date: '2024-06-14', item: [1, 10] },
            ],
            review: null,
            isLike: [1, 4, 5],
            basket: [
                {
                    productId: 7,
                    options: {
                        contentSelect: 'A5',
                        packagingSelect: '굿즈 기본 포장(+0원)'
                    },
                    count: 1,
                    totalPrice: 18000
                },
                {
                    productId: 8,
                    options: {
                        contentSelect: '청동',
                        packagingSelect: '굿즈 부직포 가방(+2000원)'
                    },
                    count: 1,
                    totalPrice: 52000
                },
                {
                    productId: 9,
                    options: {
                        contentSelect: 'L',
                        packagingSelect: '굿즈 천 가방(+4000원)'
                    },
                    count: 1,
                    totalPrice: 49000
                }
            ]
        }
    },
    {
        index: 8,
        name: '김민준',
        birth: '1997-01-20',
        zoneCode: '12345',
        address: '경남 창원시 의창구 봉곡로 123',
        addressDetail: '272동 203호',
        gender: 'M',
        phoneNumber: '01067892345',
        email: 'minjun97',
        emailType: 'gmail.com',
        id: 'minjun97',
        pw: 'password8@',
        loginCount: 40,
        totalPurchaseCount: 11,
        totalPurchaseAmount: 550000,
        lastLoginDate: '2024-06-17',
        mypage: {
            history: [
                { date: '2024-06-15', item: [7] },
                { date: '2024-06-16', item: [9] },
            ],
            review: null,
            isLike: [2, 5, 8],
            basket: [
                {
                    productId: 3,
                    options: {
                        contentSelect: '좋은 생각(퍼플)',
                        packagingSelect: '굿즈 기본 포장(+0원)'
                    },
                    count: 1,
                    totalPrice: 3000
                },
                {
                    productId: 6,
                    options: {
                        contentSelect: '백단 향',
                        packagingSelect: '굿즈 천 가방(+4000원)'
                    },
                    count: 1,
                    totalPrice: 39000
                }
            ]
        }
    },
    {
        index: 9,
        name: '박지수',
        birth: '1998-11-11',
        zoneCode: '12345',
        address: '전남 목포시 영산로 456',
        addressDetail: '232동 292호',
        gender: 'F',
        phoneNumber: '01078903456',
        email: 'jisoo98',
        emailType: 'hanmail.net',
        id: 'jisoo98',
        pw: 'password9#',
        loginCount: 28,
        totalPurchaseCount: 6,
        totalPurchaseAmount: 300000,
        lastLoginDate: '2024-06-18',
        mypage: {
            history: [
                { date: '2024-06-17', item: [4, 5] },
                { date: '2024-06-18', item: [5, 13] },
            ],
            review: null,
            isLike: [3, 6, 9],
            basket: [
                {
                    productId: 2,
                    options: {
                        contentSelect: '박물관 키링(신라의 미소)',
                        packagingSelect: '굿즈 기본 포장(+0원)'
                    },
                    count: 1,
                    totalPrice: 20000
                },
                {
                    productId: 7,
                    options: {
                        contentSelect: 'A6',
                        packagingSelect: '굿즈 부직포 가방(+2000원)'
                    },
                    count: 1,
                    totalPrice: 20000
                },
                {
                    productId: 8,
                    options: {
                        contentSelect: '은색',
                        packagingSelect: '굿즈 천 가방(+4000원)'
                    },
                    count: 1,
                    totalPrice: 54000
                }
            ]
        }
    },
    {
        index: 10,
        name: '장예은',
        birth: '1994-03-15',
        zoneCode: '12345',
        address: '제주도 제주시 탑동로 789',
        addressDetail: '947동 173호',
        gender: 'F',
        phoneNumber: '01089014567',
        email: 'yeeun94',
        emailType: 'nate.com',
        id: 'yeeun94',
        pw: 'password10!',
        loginCount: 22,
        totalPurchaseCount: 13,
        totalPurchaseAmount: 650000,
        lastLoginDate: '2024-06-19',
        mypage: {
            history: [
                { date: '2024-06-19', item: [8] },
                { date: '2024-06-20', item: [9] },
            ],
            review: null,
            isLike: [1, 7, 8],
            basket: [
                {
                    productId: 1,
                    options: {
                        contentSelect: '취객선비 3인방 변색 잔세트',
                        packagingSelect: '굿즈 기본 포장(+0원)'
                    },
                    count: 1,
                    totalPrice: 26000
                },
                {
                    productId: 5,
                    options: {
                        contentSelect: '소',
                        packagingSelect: '굿즈 부직포 가방(+2000원)'
                    },
                    count: 1,
                    totalPrice: 67000
                },
                {
                    productId: 9,
                    options: {
                        contentSelect: 'S',
                        packagingSelect: '굿즈 천 가방(+4000원)'
                    },
                    count: 1,
                    totalPrice: 49000
                }
            ]
        }
    }
];

export default userInfo;
