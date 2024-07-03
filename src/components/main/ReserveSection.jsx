import { NavLink } from "react-router-dom"

const ReserveSection = () => {




    return (
        <>
            <div className="reserve_section_head">
                <div className="reserve_section_left">
                    <img className='reserve_section_one' src="/images/reserve/reserveSection4.jpg" alt="" />
                    <img className="reserve_section_two" src="/images/reserve/reserveSection2.jpg" alt="" />
                </div>

                <div className="reserve_section_center">
                    <span>Exhibit Promotions</span>
                    <p>Enjoy fabulous savings off our timeless and ever-popular Dijon Limestone with options for both indoors and out. Plus 15% off adhesives, grouts & sealants.</p>
                    <NavLink to="/reserve"><p> &gt; Reservation</p></NavLink>
                </div>

                <div className="reserve_section_right">
                <img className='reserve_section_third' src="/images/reserve/reserveSection3.jpg" alt="" />
                <img className="reserve_section_four" src="/images/reserve/reserveSection1.jpg" alt="" />
                </div>

            </div>
            <div className="reserve_section_bottom">

            </div>

        </>
    )
}

export default ReserveSection