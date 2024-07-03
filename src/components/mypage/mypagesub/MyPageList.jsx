import '../../../css/mypage/MyPageIndex.css';
import '../../../css/mypage/subpage/MyPageList.css'

function MyPageList() {

    const user = JSON.parse(sessionStorage.getItem("LoginUserInfo"))
    const items = JSON.parse(sessionStorage.getItem("goodsList"))

    return (

        <div className='MyPageList'>

            {user.mypage.history
                .slice()
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((list) => {
                    return (
                        <div className='MyListDate' key={list.date}>
                            <h2>{list.date}</h2>

                            {list.item.slice()
                                .sort((a, b) => a - b)
                                .map((itemId) => {
                                    const product = items.find((good) => good.id === itemId)
                                    return (
                                        <div className='ListItem' key={product.id}>
                                            <div className='ListPhoto'>
                                                <img src={product.productSrc[0]} alt={product.name} />
                                            </div>
                                            <div>
                                                <h3>{product.name}</h3>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    )
                })
            }


        </div>
    )
}

export default MyPageList;
