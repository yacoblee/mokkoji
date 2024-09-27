import '../../../css/mypage/subpage/MyPageOrders.css'

function MyPageOrders() {

    return (

        <div className='MyPageOrders'>

            {user.mypage.history
                .slice()
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((list) => {
                    return (
                        <div className='MyOrdersDate' key={list.date}>
                            <h3>{list.date}</h3>

                            {list.item.slice()
                                .sort((a, b) => a - b)
                                .map((itemId) => {
                                    const product = items.find((good) => good.id === itemId)
                                    return (
                                        <div className='OrdersItem' key={product.id}>
                                            <div className='OrdersPhoto'>
                                                <img src={product.productSrc[0]} alt={product.name} />
                                            </div>
                                            <div>
                                                <h4>{product.name}</h4>
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

export default MyPageOrders;
