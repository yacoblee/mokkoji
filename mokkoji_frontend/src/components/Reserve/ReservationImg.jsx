import React, { useState, useRef } from "react";
import '../../css/Reserve/reserve.css';
import ReserveSource from './ReserveSource';
import Modal from "react-modal";

Modal.setAppElement('#root'); // Set the root element for accessibility

const ReservationImg = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const aboutRef = useRef(null);

    const throttle = (func, delay) => {
        let timer;

        return () => {
            if (!timer) {
                timer = setTimeout(() => {
                    timer = null;
                    func();
                }, delay);
            }
        };
    };

    const reservImg = ReserveSource.flatMap((item) =>
        item.slideSrc.map((src, i) => (
            <img
                src={src}
                key={`${i}`}
                alt={`slide ${i}`}
                onClick={() => openModal(i)}
                style={{ cursor: 'pointer' }}
            />
        ))
    );

    const openModal = (index) => {
        setCurrentImgIndex(index);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const prevSlide = () => {
        setCurrentImgIndex((prevIndex) => (prevIndex - 1 + reservImg.length) % reservImg.length);
    };

    const nextSlide = () => {
        setCurrentImgIndex((prevIndex) => (prevIndex + 1) % reservImg.length);
    };

    const slideBtn = () => {
        <div>
            <button className="left" onClick={prevSlide}>Previous</button>
            <button className="right" onClick={nextSlide}>Next</button>
        </div>
    }

    return (
        <div className='reservation_img_inner'>
            <div className="reservation_main_img">
                {reservImg[0]}
            </div>
            <div className="reservation_sub_img">
                {reservImg[1]}
            </div>
            <div className="reservation_fin_img">
                {reservImg[2]}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Image Modal"
                className="modal"
                overlayClassName="overlay"
                shouldCloseOnOverlayClick={false}
                style={{ overflow: 'hidden' }}
            >
                <button className="modalClose" onClick={closeModal}>X</button>


                <div className="reserve_slide_container">
                    <button className="left" onClick={throttle(prevSlide, 700)}>Previous</button>
                    <div className="reserve_slide_inner">
                        <div className="slides" style={{ transform: `translateX(-${currentImgIndex * 100}%)` }}>
                            {ReserveSource.flatMap(item => item.slideSrc).map((src, i) => (
                                <img key={i} className="reserve_slide" src={src} alt={`slide ${i}`} />
                            ))}
                        </div>
                    </div>

                    <button className="right" onClick={throttle(nextSlide, 700)}>Next</button>
                </div>



            </Modal>

        </div>
    );
};

export default ReservationImg;
