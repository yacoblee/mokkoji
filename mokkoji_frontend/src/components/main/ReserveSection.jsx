import { useNavigate, NavLink } from "react-router-dom"

const ReserveSection = () => {

    const navigate = useNavigate();

    const goReserve = () => {
        navigate('/reserve');
    };


    return (
        <>
            <div className="reserve_section_head">
                <div className="reserve_section_left">
                    <img className='reserve_section_one' src="/images/reserve/reserveSection4.jpg" alt="" />
                    <img className="reserve_section_two" src="/images/reserve/reserveSection2.jpg" alt="" />
                </div>

                <div className="reserve_section_center">
                    <span>Traditional Korean Goods Reservation</span>
                    <p>Discover and reserve unique traditional Korean goods. Enjoy exclusive offers and discounts on selected items.</p>
                    <NavLink to="/reserve"><p> &gt; Reservation</p></NavLink>
                </div>

                <div className="reserve_section_right">
                    <img className='reserve_section_third' src="/images/reserve/reserveSection3.jpg" alt="" />
                    <img className="reserve_section_four" src="/images/reserve/reserveSection1.jpg" alt="" />
                </div>

            </div>
            <div className="reserve_section_bottom" onClick={goReserve}>
                <p>Enjoy exclusive deals on a variety of traditional Korean items. Reserve now and experience the essence of Korean heritage.</p>
                <span>Reservation</span>
            </div>

        </>
    )
}

export default ReserveSection