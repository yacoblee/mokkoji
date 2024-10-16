import React, { useEffect, useRef, useState } from 'react';
import { API_BASE_URL } from "../../service/app-config";
import axios from "axios";

const PostCard = () => {
    const imgRef = useRef(null);
    
    const [formData, setFormData] = useState({
        content_name: '',
        contact_info: '', // 이메일 또는 휴대폰 번호로 사용
        content_main: '',
    });
    const [errors, setErrors] = useState({});
    const [contactMethod, setContactMethod] = useState('email'); // 이메일 또는 SMS 선택

    useEffect(() => {
        const img = imgRef.current;
        const section = img.closest('.section');

        const handleScroll = () => {
            const { top } = section.getBoundingClientRect();
            const visibleHeight = 540;
            const totalHeight = 940;
            const maxOffset = 120; //최대 translation offset
            const speed = 0.25; // 120px 까지 움직이는 속도

            if (top <= window.innerHeight && top + visibleHeight >= 0) {
                const offset = Math.max(-maxOffset, Math.min(maxOffset, (window.innerHeight - top - (visibleHeight / 2)) * speed));
                img.style.transform = `translate3d(0, ${-offset}px, 0)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();  

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const validate = () => {
        let formErrors = {};

        if (!formData.content_name) {
            formErrors.content_name = '이름을 입력해 주세요.';
        }

        if (!formData.contact_info) {
            formErrors.contact_info = contactMethod === 'email'
                ? '이메일을 입력해 주세요.'
                : '휴대폰 번호를 입력해 주세요.';
        } else if (contactMethod === 'email' && !/\S+@\S+\.\S+/.test(formData.contact_info)) {
            formErrors.contact_info = '유효한 이메일 주소를 입력해 주세요.';
        } else if (contactMethod === 'sms' && !/^\d{10,11}$/.test(formData.contact_info)) {
            formErrors.contact_info = '유효한 휴대폰 번호를 입력해 주세요.';
        }

        if (!formData.content_main) {
            formErrors.content_main = '내용을 입력해 주세요.';
        }

        return formErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
    
        if (Object.keys(validationErrors).length === 0) {
            console.log('Form data:', formData);
    
            if (contactMethod === 'email') {
                // 이메일 전송
                const emailData = {
                    content_mail: '회신할 주소 :'+formData.contact_info ,
                    content_main: formData.content_main+ '\n',
                    content_name: formData.content_name
                };
    
                axios.post(`${API_BASE_URL}/sendmail`, emailData)
                    .then((response) => {
                        console.log(response);
                        alert('이메일 전송 되었습니다.');
    
                        setFormData({
                            content_name: '',
                            contact_info: '',
                            content_main: '',
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                        alert('이메일 전송 실패');
                    });
            } else if (contactMethod === 'sms') {
                // SMS 전송
                const smsData = {
                    from: formData.contact_info,
                    text: formData.content_main,
                    content_name: formData.content_name
                };
    
                axios.post(`${API_BASE_URL}/sendsms`, smsData)
                    .then((response) => {
                        console.log(response);
                        alert('SMS 전송 되었습니다.');
    
                        setFormData({
                            content_name: '',
                            contact_info: '',
                            content_main: '',
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                        alert('SMS 전송 실패');
                    });
            }
    
            setErrors({});
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="intro_container">
            <div className="intro_img" ref={imgRef}>
                <img src="/images/main/main-banner.jpg" alt="introduction" />
            </div>

            <form onSubmit={handleSubmit}>
                <div className="intro_content">
                    <div className='intro_content_head'>
                        <span>CONTACT US</span>
                    </div>

                    <div className='intro_content_name'>
                        <label htmlFor="content_name">제목</label>
                        {errors.content_name && <span className="error">{errors.content_name}</span>}
                        <input id='content_name'
                            type="text"
                            value={formData.content_name}
                            onChange={handleChange}
                            style={{
                                borderBottom: errors.content_name ? '1px solid red' : '1px solid black'
                            }} />
                    </div>

                    <div className="intro_contact_method">
                        <label>
                            <input
                                type="radio"
                                name="contactMethod"
                                value="email"
                                checked={contactMethod === 'email'}
                                onChange={() => setContactMethod('email')}
                            /> 이메일
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="contactMethod"
                                value="sms"
                                checked={contactMethod === 'sms'}
                                onChange={() => setContactMethod('sms')}
                            /> SMS
                        </label>
                    </div>

                    {/* Conditional rendering for email or phone input */}
                    {contactMethod === 'email' ? (
                        <div className='intro_content_mail'>
                            <label htmlFor="contact_info">작성자 메일</label>
                            {errors.contact_info && <span className="error">{errors.contact_info}</span>}
                            <input id='contact_info'
                                type="text"
                                value={formData.contact_info}
                                onChange={handleChange}
                                style={{
                                    borderBottom: errors.contact_info ? '1px solid red' : '1px solid black'
                                }} />
                        </div>
                    ) : (
                        <div className='intro_content_mail'>
                            <label htmlFor="contact_info">휴대폰 번호</label>
                            {errors.contact_info && <span className="error">{errors.contact_info}</span>}
                            <input id='contact_info'
                                type="text"
                                value={formData.contact_info}
                                onChange={handleChange}
                                style={{
                                    borderBottom: errors.contact_info ? '1px solid red' : '1px solid black'
                                }} />
                        </div>
                    )}

                    <div className='intro_content_main'>
                        <label htmlFor="content_main">내용</label>
                        {errors.content_main && <span className="error">{errors.content_main}</span>}
                        <textarea id="content_main"
                            value={formData.content_main}
                            onChange={handleChange}
                            style={{
                                borderBottom: errors.content_main ? '1px solid red' : '1px solid black'
                            }} />
                    </div>

                    <div className='intro_content_btn'>
                        <button type="submit">문의 하기</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PostCard;

