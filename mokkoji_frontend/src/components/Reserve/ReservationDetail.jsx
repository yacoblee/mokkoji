import Reservesource from "./ReserveSource";
import { API_BASE_URL } from "../../service/app-config";

const ReservationDeatil = ({ regists }) => {
    let uri = API_BASE_URL + "/reserve";
    const { registsData, reserveImage } = regists;
    const regist = registsData.length > 0 ? registsData[0] : {};


    const detailImages = reserveImage
        .filter(image => image.imageType === 'detail') 
        .sort((a, b) => a.imageOrder - b.imageOrder);





    return (
        <div className="reservation_detail_inner">

            <div classame="detail_inner_ul1">
                <div className="detail_inner_head">
                    <h2>상세정보</h2>
                </div>
                <div>
                    <h4>패키지 상세정보</h4>
                    <ul>
                        <li>{regist.packageDetail || '패키지 정보가 없습니다.'}</li>
                    </ul>
                </div>
                <div>
                    <h4>규정 및 제한사항</h4>
                    <ul>
                        <li>{regist.restrictDetail || '규정 정보가 없습니다.'}</li>
                    </ul>
                </div>
                <div>
                    <h4>예약 제한사항</h4>
                    <ul>
                        <li>{regist.reserveRestrict || '예약 제한 정보가 없습니다.'}</li>
                    </ul>
                </div>
                <div>
                    <h4>편의성/접근성</h4>
                    <ul>
                        <li>{regist.etcDetail || '편의성 정보가 없습니다.'}</li>
                    </ul>
                </div>
            </div>

            <div className="detail_inner_img">
                <div className="detail_inner_img_head">
                    <h2>상세 이미지</h2>
                </div>
                <div>

                    {detailImages.map((reserveimage, i ) => (
                        <img src={`${API_BASE_URL}/resources/reserveImages/${reserveimage.imageName}`} 
                        alt={reserveimage.imageOrder}
                        key={i} />
                    ))}


                </div>
            </div>

        </div>
    );
}

export default ReservationDeatil