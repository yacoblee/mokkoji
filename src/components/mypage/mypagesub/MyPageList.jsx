import '../../../css/mypage/MyPageIndex.css';

function MyPageList() {

    const user = JSON.parse(sessionStorage.getItem("LoginUserInfo"))
    const items = JSON.parse(sessionStorage.getItem("goodsList"))

    user.mypage.history.forEach(entry => {
        entry.item = entry.item.map(itemId => {
            let item = items.find(item => item.id === itemId);
            return item ? item.id : null; // id가 없을 경우 null 처리
        });
    });

    // console.log(user.mypage.history);

    return (

        <div className='MyPageList'>

            {user.mypage.history.map((list) => {

                return (
                    <div className='MyListDate' key={list.date}>
                        <h2>{list.date}</h2>
                        <div className='MyListItem' key={list.item}>
                            <div className="MyCartPhoto">
                                {/* <img src={items[list.item].productSrc[0]} /> */}
                            </div>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export default MyPageList;
