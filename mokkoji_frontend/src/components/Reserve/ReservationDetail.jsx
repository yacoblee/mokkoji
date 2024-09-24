import Reservesource from "./ReserveSource";


const ReservationDeatil = () => {



    return (
        <div className="reservation_detail_inner">

            <div className="detail_inner_ul1">
                <div className="detail_inner_head">
                    <h2>상세정보</h2>
                </div>
                <div>
                    <h4>패키지 상세정보</h4>
                    <ul>
                        <li>자개로 굿즈 만들기 체험</li>
                    </ul>
                </div>
                <div>
                    <h4>규정 및 제한사항</h4>
                    <ul>
                        <li>음주 상태의 참여자는 서비스 이용이 거부될 수 있습니다. 이 경우 입장이 불가합니다.</li>
                    </ul>
                </div>
                <div>
                    <h4>예약 제한사항</h4>
                    <ul>
                        <li>그룹 규모: 참여자 수 1-25인.</li>
                    </ul>
                </div>
                <div>
                    <h4>편의성/접근성</h4>
                    <ul>
                        <li>유모차 및 휠체어 이용이 불가합니다.</li>
                    </ul>
                </div>
            </div>

            <div className="detail_inner_img">
                <div className="detail_inner_img_head">
                    <h2>상세 이미지</h2>
                </div>
                <div  >
                    {Reservesource.flatMap(item => item.productSrc).map((src, i) => (
                        <img key={i} className="" src={src} alt={`slide ${i}`} />
                    ))}
                </div>
            </div>

        </div>

    );
}

export default ReservationDeatil