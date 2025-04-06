import Image from 'next/image'
import React from 'react'
import ThemeToggle from './ThemeToggle'
import Link from 'next/link'

const Header = () => {
    return (
        <div className='w-[full] flex items-center justify-between py-5'>
            <div className='flex items-center gap-5 py-1 px-5 shadow-line rounded-lg'>
                <div>
                    <Image
                        src="/assets/mylogo.png"
                        alt="Your Image"
                        width={40}
                        height={40}
                        className="rounded-lg"
                    />
                </div>
                <div>
                    Taskflow<br />Manager
                </div>
            </div>
            <div className='flex gap-3'>
                <div className='border flex items-center gap-3 rounded-3xl py-1 pl-4 pr-1 cursor-pointer'>
                    <Link href="/login">Login</Link>
                    <Link href="/signup" className='bg-[#0077ed] px-3 py-1 rounded-3xl'>Signup</Link>
                </div>
                <div>
                    <ThemeToggle />
                </div>
            </div>
        </div>
    )
}

export default Header