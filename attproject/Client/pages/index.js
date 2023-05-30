import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';



const Home = () => {
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            router.push('/dashboard')
        }, 3000);
    }, [])

    return (
        <div className='h-screen w-full flex flex-1 flex-col justify-center items-center'>
            <Image width={250} height={250} src={'/assets/logo.png'} />
            <h6 className='font-semibold'>AT&T</h6>
        </div>
    );
};

export default Home;
