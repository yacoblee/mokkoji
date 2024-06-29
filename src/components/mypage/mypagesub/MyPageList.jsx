import '../../../css/mypage/MyPageIndex.css';

function MyPageList() {

    const user = JSON.parse(sessionStorage.getItem("LoginUserInfo"))
    const items = JSON.parse(sessionStorage.getItem("goodsList"))



    return (

        <div className='MyPageList'>

            {user.mypage.history.map((list) => {

                return (
                    <div className='MyListDate' key={list.date}>
                        <h2>{list.date}</h2>
                        <div className='MyListItem' key={list.item}>
                            {list.item}
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export default MyPageList;
