'use client'

// react/next stuff
import Link from 'next/link'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// style
import styles from './page.module.css';
import './globals.css'

// images
import notFound from 'public/notFound.svg';

export default function NotFound() {
    // Time in seconds
    const timeout = 60;
    const router = useRouter();
    const [counter, setCounter] = useState(timeout);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prevCounter) => prevCounter - 1);
        }, 1000);

        setTimeout(() => {
            router.push('/');
        }, timeout * 1000);

        return () => {
            clearInterval(interval);
        };
    }, [router]);

    return (
        <div className={styles.notFoundContainer}>
            <div className={styles.notFoundText}>
                <h2>Whoops!!!</h2>
                <p>It seems you've ventured into uncharted territory.</p>
                <p>The page you're looking for might be on a vacation or has taken a coffee break.</p>
                <p>In the meantime, if you're feeling adventurous, you can explore other corners of my digital realm.</p>
                <p>If you believe this is a technical glitch, feel free to let <Link title='Send me message' href="/contact">me know</Link> this.</p>
                <p>Thanks for your patience, and happy exploring!</p>
                <p>
                    <Link title='Click here to return on Home Page' href="/">Return Home</Link> or you will be
                    redirected in {counter} seconds.
                </p>
            </div>
            <div className={styles.item}>
                <Image src={notFound} alt="notFound" className='moveImage' />
            </div>
        </div>
    )
}