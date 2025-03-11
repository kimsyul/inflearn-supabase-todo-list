'use client';

export { ThemeProvider } from '@material-tailwind/react';
// layout.tsx가 서버컴포넌트지만 material-tailwind는 클라이언트에서 동작해야 하기 때문에
// 별도로 클라이언트 컴포넌트로 정의해준 파일에서 export하는 것
