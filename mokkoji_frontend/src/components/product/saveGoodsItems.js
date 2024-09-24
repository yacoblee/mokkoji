// // saveGoodsItems.js 파일
// import axios from 'axios';
// import fs from 'fs';
// import GoodsItems from './GoodsItems.js';

// // JSON 데이터 저장 함수
// const saveGoodsItemsToJSON = async (data) => {
//   try {
//     const json = JSON.stringify(data, null, 2); // JSON 문자열로 변환
//     fs.writeFileSync('goodsItems.json', json); // 파일로 저장
//     console.log('JSON 파일로 저장되었습니다.');
//   } catch (error) {
//     console.error('JSON 파일 저장 중 오류 발생:', error);
//   }
// };

// // 함수 호출
// saveGoodsItemsToJSON(GoodsItems);