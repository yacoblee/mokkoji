const userInfo = [
    {
        index: 1,
        name: '김철수',
        birth: '1985-05-15',
        address: '서울시 강남구 테헤란로 123',
        addressDetail: '213동 128호',   // 임의 추가
        gender: 'M',
        phoneNumber: '01012345678',     // 임의 수정(- 제거)
        // email: 'chulsoo85@naver.com',
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
                { date: '2024-06-01', item: 1 },
                { date: '2024-06-05', item: 3 },
            ],
            review: null,
            isLike: [1, 2, 3],
            basket: [1, 4, 5]
        }
    },
    {
        index: 2,
        name: '박영희',
        birth: '1990-07-20',
        address: '부산시 해운대구 해운대로 456',
        gender: 'F',
        phoneNumber: '010-8765-4321',
        email: 'younghee90@daum.net',
        id: 'younghee90',
        pw: 'password2@',
        loginCount: 30,
        totalPurchaseCount: 5,
        totalPurchaseAmount: 250000,
        lastLoginDate: '2024-06-12',
        mypage: {
            history: [
                { date: '2024-06-02', item: 2 },
                { date: '2024-06-06', item: 4 },
            ],
            review: null,
            isLike: [2, 4, 6],
            basket: [2, 6, 7]
        }
    },
    {
        index: 3,
        name: '이민지',
        birth: '1988-08-30',
        address: '대전시 유성구 엑스포로 789',
        gender: 'F',
        phoneNumber: '010-9876-5432',
        email: 'minji88@gmail.com',
        id: 'minji88',
        pw: 'password3#',
        loginCount: 50,
        totalPurchaseCount: 15,
        totalPurchaseAmount: 750000,
        lastLoginDate: '2024-06-14',
        mypage: {
            history: [
                { date: '2024-06-03', item: 5 },
                { date: '2024-06-07', item: 7 },
            ],
            review: null,
            isLike: [5, 7, 9],
            basket: [3, 8, 9]
        }
    },
    {
        index: 4,
        name: '최수정',
        birth: '1992-12-12',
        address: '광주시 서구 내방로 987',
        gender: 'F',
        phoneNumber: '010-2345-6789',
        email: 'soojung92@hanmail.net',
        id: 'soojung92',
        pw: 'password4!',
        loginCount: 20,
        totalPurchaseCount: 8,
        totalPurchaseAmount: 400000,
        lastLoginDate: '2024-06-13',
        mypage: {
            history: [
                { date: '2024-06-04', item: 6 },
                { date: '2024-06-08', item: 8 },
            ],
            review: null,
            isLike: [3, 5, 7],
            basket: [4, 5, 6]
        }
    },
    {
        index: 5,
        name: '홍길동',
        birth: '1980-03-01',
        address: '인천시 남구 주안로 654',
        gender: 'M',
        phoneNumber: '010-3456-7890',
        email: 'gildong80@nate.com',
        id: 'gildong80',
        pw: 'password5@',
        loginCount: 15,
        totalPurchaseCount: 12,
        totalPurchaseAmount: 600000,
        lastLoginDate: '2024-06-11',
        mypage: {
            history: [
                { date: '2024-06-09', item: 9 },
                { date: '2024-06-10', item: 1 },
            ],
            review: null,
            isLike: [6, 7, 8],
            basket: [1, 2, 3]
        }
    },
    {
        index: 6,
        name: '강다혜',
        birth: '1995-09-23',
        address: '경기 광주시 태재로 133-35 스토리빌 301호',
        gender: 'F',
        phoneNumber: '010-3678-9041',
        email: 'dahye95@naver.com',
        id: 'dahye95',
        pw: 'password6#',
        loginCount: 25,
        totalPurchaseCount: 7,
        totalPurchaseAmount: 350000,
        lastLoginDate: '2024-06-15',
        mypage: {
            history: [
                { date: '2024-06-11', item: 2 },
                { date: '2024-06-12', item: 4 },
            ],
            review: null,
            isLike: [2, 3, 4],
            basket: [5, 6, 7]
        }
    },
    {
        index: 7,
        name: '서지훈',
        birth: '1993-04-05',
        address: '서울시 마포구 월드컵북로 321',
        gender: 'M',
        phoneNumber: '010-5678-1234',
        email: 'jihoon93@daum.net',
        id: 'jihoon93',
        pw: 'password7!',
        loginCount: 35,
        totalPurchaseCount: 9,
        totalPurchaseAmount: 450000,
        lastLoginDate: '2024-06-16',
        mypage: {
            history: [
                { date: '2024-06-13', item: 3 },
                { date: '2024-06-14', item: 6 },
            ],
            review: null,
            isLike: [1, 4, 5],
            basket: [7, 8, 9]
        }
    },
    {
        index: 8,
        name: '김민준',
        birth: '1997-01-20',
        address: '경남 창원시 의창구 봉곡로 123',
        gender: 'M',
        phoneNumber: '010-6789-2345',
        email: 'minjun97@gmail.com',
        id: 'minjun97',
        pw: 'password8@',
        loginCount: 40,
        totalPurchaseCount: 11,
        totalPurchaseAmount: 550000,
        lastLoginDate: '2024-06-17',
        mypage: {
            history: [
                { date: '2024-06-15', item: 7 },
                { date: '2024-06-16', item: 9 },
            ],
            review: null,
            isLike: [2, 5, 8],
            basket: [3, 4, 6]
        }
    },
    {
        index: 9,
        name: '박지수',
        birth: '1998-11-11',
        address: '전남 목포시 영산로 456',
        gender: 'F',
        phoneNumber: '010-7890-3456',
        email: 'jisoo98@hanmail.net',
        id: 'jisoo98',
        pw: 'password9#',
        loginCount: 28,
        totalPurchaseCount: 6,
        totalPurchaseAmount: 300000,
        lastLoginDate: '2024-06-18',
        mypage: {
            history: [
                { date: '2024-06-17', item: 4 },
                { date: '2024-06-18', item: 5 },
            ],
            review: null,
            isLike: [3, 6, 9],
            basket: [2, 7, 8]
        }
    },
    {
        index: 10,
        name: '장예은',
        birth: '1994-03-15',
        address: '제주도 제주시 탑동로 789',
        gender: 'F',
        phoneNumber: '010-8901-4567',
        email: 'yeeun94@nate.com',
        id: 'yeeun94',
        pw: 'password10!',
        loginCount: 22,
        totalPurchaseCount: 13,
        totalPurchaseAmount: 650000,
        lastLoginDate: '2024-06-19',
        mypage: {
            history: [
                { date: '2024-06-19', item: 8 },
                { date: '2024-06-20', item: 9 },
            ],
            review: null,
            isLike: [1, 7, 8],
            basket: [1, 5, 9]
        }
    }
];

export default userInfo;
