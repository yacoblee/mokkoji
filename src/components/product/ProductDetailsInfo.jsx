
import { useState } from "react";
import GoodsItems from "./ProductObject";
import { Link } from "react-router-dom";

const ProductDetailsInfo = ({ selectedProduct }) => {
        //슬라이드 구현을 위한 state
        const [currentSlide ,setCurrentSlide] =useState(0);


        let visibleSlide = 5;//현재 보여지는 슬라이드 갯수
        
        //슬라이드 구현 횟수 = 전체 슬라이드 갯수 - 현재 보여지는 슬라이드 갯수
        const maxSlide = selectedProduct.reviews.length - visibleSlide; 
        
        //버튼을 누르면 state값 증가와 감소
        const onclickreivewsList = (type)=>{
            if(type ==='+'){
                if(currentSlide === maxSlide) return;
                setCurrentSlide(currentSlide+1);
            }else{
                setCurrentSlide(currentSlide-1);
            }
        }
    
        //버튼 호버시 true 아웃시 fasle  의 state
        const [hover, setHover] = useState(false);
    
        //버튼 호버시 true 설정
        const onMouseEnterHover = ()=>{
            setHover(true);
        }
    
        const onMouseOverHover = ()=>{
            setHover(false);
        }
        const recommendItemid = selectedProduct.id;
        const recommendItem = GoodsItems.filter(it => it.id !== recommendItemid)
            .sort((a, b) => b.reviews.length - a.reviews.length)
            .slice(0, 5);
        const formatNumber = (number) => {
            return number.toLocaleString('en-US');
        }
            return (
                <>
                <div className='imgInfo'>
                    <div className="imgInfoBox">
                        {selectedProduct.productSrc.map((src, i) => <img src={src} key={i} alt={i} />)}
                        {/* {selectedProduct.slideSrc.map((src)=><img src={src} alt="" />)} */}

                    </div>
                    <div>
                        <p>
                            {selectedProduct.name}
                        </p><br /><br />
                        <p>
                            {selectedProduct.mainGuide}
                        </p><br /><br />
                        <p>
                            {selectedProduct.guideLine}
                        </p><br /><br />
                        <p>
                            {selectedProduct.sideGuide}
                        </p>
                    </div>
                </div>
                
                <div className='deliSizeInfo'>
                    <p><span>배송 정보</span><br /><br />

                        -오전 9시 이전 주문건까지 당일출고되며 이 후 주문건은 익일 출고됩니다 (단, 재고가 있는 상품에 한함)<br />
                        -주문취소는 입금확인 상태에서만 가능하며 배송준비중 상태부터는 취소가 불가합니다. <br />
                        -도서와 일반상품은 합배송이 불가하며 배송비가 각각 결제 됩니다 (도서소득공제 적용으로 배송비 합산 불가)<br />
                        -3만원 이상 주문은 무료배송, 3만원 미만은 3,000원의 배송비가 추가됩니다<br />
                        -배송기간은 수도권 및 기타 지역은 2~3일, 제주도를 포함한 도서산간 지역은 3~4일 정도 소요됩니다.<br />
                        (지역별 택배사 사정에 따라 배송기간이 변경 될 수 있습니다.)<br /><br /><br />
                        -해외배송은 우체국 EMS를 통해 발송됩니다. 해외배송 요청시 museumshop@nmf.or.kr 로 문의바랍니다.<br />
                        -EMS방문접수로 발송이 불가한 국가로는 배송이 불가합니다. 우체국 홈페이지를 확인해주세요<br />
                        -EMS요금은 우체국 홈페이지를확인 해주세요. <br />
                        -티백, 도자기, 유리, 자석, 유물재현품, 디퓨저, 반가사유상 미니어처, 석고방향제는 해외배송이 불가합니다.<br />
                        -100만원 이상의 대량 구매시 상품 재고 사항 및 제작 가능 일정을 문의해주시기 바랍니다.
                    </p>
                    <br /><br />
                    <p><span> 취소 / 교환 / 환불 / AS안내</span><br /><br />
                        -주문취소는 입금확인 상태에서만 가능하며 배송준비중 상태부터는 취소가 불가합니다. <br />
                        -상품 수령일로부터 7일 이내 반품/교환 가능합니다.<br />
                        -변심 반품의 경우 왕복배송비를 차감한 금액이 환불 되며, 제품 및 포장 상태가 재판매 가능 하여야 합니다.<br />
                        제품과 케이스 손상시 환불이 불가합니다. 반품시 반드시 받으신대로 포장하신 후 택배박스에 넣어주세요.  <br />
                        -상품이 불량인 경우, 배송비를 포함한 전액이 환불됩니다.<br />
                        -출고 이후 환불요청시 상품 회수 후 처리됩니다.<br />
                        -밀봉포장, 만들기상품 등은 변심에 따른 반품/환불이 불가합니다.<br />

                    </p>
                </div>
                <div className='reveiwInfo'
                >
                                    {
                    currentSlide>0 && <button style={{left :5 ,transform: 'rotateY(180deg)'}}
                    type='button'
                    onClick={()=>{onclickreivewsList('-')}}
                    onMouseEnter={onMouseEnterHover}
                    onMouseOut={onMouseOverHover}>
                        <img src={hover ? "/images/buy/arrow-right-2.png" : "/images/buy/arrow-right-3.png" }
                        alt="left" />
                    </button> 
                }

                    {selectedProduct.reviews.map((it, i) => <>
                        <div key={i} 
                        
                        style={{ transform: `translateX(-${currentSlide * 240}px)` }}>
                            <p className="reveiwName">{i}
                                <p>{selectedProduct.name}</p>
                            </p>
                            <div>
                                {it.reviewsSrc ? <img src={it.reviewsSrc} alt="" /> : <img src={selectedProduct.productSrc[0]} alt="" />}
                            </div>
                            <p>
                                {it.content}
                            </p>
                            <span>
                                {it.userName}
                            </span>
                            <p>
                                {it.day}
                            </p>
                        </div><br />
                    </>).reverse()}
                    {
                    currentSlide < maxSlide && <button style={{right :5}}
                    type='button'
                    onClick={()=>{onclickreivewsList('+')}}
                    onMouseEnter={onMouseEnterHover}
                    onMouseOut={onMouseOverHover}>
                        <img src={hover ? "/images/buy/arrow-right-2.png" : "/images/buy/arrow-right-3.png" }
                        alt="right" />
                    </button> 
                }
                </div>
                <div className='recommendInfo'>
                    {recommendItem.map((it, i) => <>
                        <Link to={`/goods/${it.category}/${it.id}`} key={i}>
                            <div>
                                <p className="recommendItem">{i}.
                                    <p>{it.name}</p></p>
                                <div>
                                    <img src={it.slideSrc[0]} alt="i" />
                                </div>
                                <p>
                                    카테고리 : {it.description}
                                </p>
                                <span>
                                    review : {it.reviews.length}
                                </span>
                                <p>
                                    금액 : {formatNumber(it.price)}
                                </p>
                            </div>
                        </Link>
                    </>)}
                </div>
                </>
            );


    
}

export default ProductDetailsInfo;
