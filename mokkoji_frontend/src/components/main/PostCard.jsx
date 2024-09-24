import React, { useEffect, useRef, useState } from 'react';

const PostCard = () => {
    const imgRef = useRef(null);

    const [formData, setFormData] = useState({
        content_name: '',
        content_mail: '',
        content_main: '',
    });
    const [errors, setErrors] = useState({});

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
        handleScroll(); // 초기 호출

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
        if (!formData.content_mail) {
            formErrors.content_mail = '이메일을 입력해 주세요.';
        } else if (!/\S+@\S+\.\S+/.test(formData.content_mail)) {
            formErrors.content_mail = '유효한 이메일 주소를 입력해 주세요.';
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
            // 유효성 검사 통과
            console.log('Form data:', formData);
            alert('전송 되었습니다.');
            setFormData({
                content_name: '',
                content_mail: '',
                content_main: '',
            });
            setErrors({});
        } else {
            // 유효성 검사 실패
            console.log('Form data: error', formData);
            setErrors(validationErrors);
        }
    };

    return (
        <div className="intro_container">
            <div className="intro_img" ref={imgRef}>
                <img src="/images/main/메인-배너.jpg" alt="introduction" />
            </div>

            <form onSubmit={handleSubmit}>
                <div className="intro_content">

                    <div className='intro_content_head'>
                        <span>CONTACT US</span>
                    </div>

                    <div className='intro_content_name'>
                        <label htmlFor="content_name">이름</label>
                        {errors.content_name && <span className="error">{errors.content_name}</span>}
                        <input id='content_name'
                            type="text"
                            value={formData.content_name}
                            onChange={handleChange}
                            style={{
                                borderBottom: errors.content_name ? '1px solid red' : '1px solid black'
                            }} />
                    </div>

                    <div className='intro_content_mail'>
                        <label htmlFor="content_mail">작성자 메일</label>
                        {errors.content_mail && <span className="error">{errors.content_mail}</span>}
                        <input id='content_mail'
                            type="text"
                            value={formData.content_mail}
                            onChange={handleChange}
                            style={{
                                borderBottom: errors.content_mail ? '1px solid red' : '1px solid black'
                            }} />
                    </div>

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
