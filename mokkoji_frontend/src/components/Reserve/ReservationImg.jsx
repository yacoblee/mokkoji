import React, { useState, useRef } from "react";
import { API_BASE_URL } from "../../service/app-config";
import '../../css/Reserve/reserve.css';
import Modal from "react-modal";

Modal.setAppElement('#root'); // Set the root element for accessibility

const ReservationImg = ({ reserveImage }) => {
    const uri = `${API_BASE_URL}/resources/reserveImages`;
    
    const mainImages = reserveImage
        .filter(image => image.imageType === 'main')
        .sort((a, b) => a.imageOrder - b.imageOrder);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

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

    const openModal = (index) => {
        setCurrentImgIndex(index);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const prevSlide = () => {
        setCurrentImgIndex((prevIndex) => (prevIndex - 1 + mainImages.length) % mainImages.length);
    };

    const nextSlide = () => {
        setCurrentImgIndex((prevIndex) => (prevIndex + 1) % mainImages.length);
    };

    return (
        <div className='reservation_img_inner'>
            {/* Main Images */}
            <div className="reservation_main_img">
                {mainImages[0] && (
                    <img
                        src={`${uri}/${mainImages[0].imageName}`}
                        alt="Main Image"
                        onClick={() => openModal(0)}
                        style={{ cursor: 'pointer' }}
                    />
                )}
            </div>
            <div className="reservation_sub_img">
                {mainImages[1] && (
                    <img
                        src={`${uri}/${mainImages[1].imageName}`}
                        alt="Sub Image"
                        onClick={() => openModal(1)}
                        style={{ cursor: 'pointer' }}
                    />
                )}
            </div>
            <div className="reservation_fin_img">
                {mainImages[2] && (
                    <img
                        src={`${uri}/${mainImages[2].imageName}`}
                        alt="Final Image"
                        onClick={() => openModal(2)}
                        style={{ cursor: 'pointer' }}
                    />
                )}
            </div>

            {/* Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Image Modal"
                className="modal"
                overlayClassName="overlay"
                shouldCloseOnOverlayClick={false}
            >
                <button className="modalClose" onClick={closeModal}>X</button>

                <div className="reserve_slide_container">
                    <button className="left" onClick={throttle(prevSlide, 700)}>Previous</button>
                    <div className="reserve_slide_inner">
                        <div className="slides" style={{ transform: `translateX(-${currentImgIndex * 100}%)` }}>
                            {mainImages.map((image, i) => (
                                <img
                                    key={i}
                                    className="reserve_slide"
                                    src={`${uri}/${image.imageName}`}
                                    alt={`slide ${i}`}
                                />
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
