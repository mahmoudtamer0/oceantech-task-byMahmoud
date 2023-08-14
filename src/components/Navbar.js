import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Nav = () => {
    return (


        <Navbar className="bg-body-tertiary p-3">
            <div className='w-100 d-flex align-items-center justify-content-between'>

                <div> <i class="fa-solid fa-bars"></i></div>
                <div style={{ gap: "10px" }} className='d-flex align-items-center'>
                    <div><i class="fa-solid fa-gears"></i></div>

                    <div> admin<i class="fa-solid fa-user m-2"></i></div>
                    <div> <i class="fa-solid fa-maximize"></i></div>
                    <div> <i class="fa-solid fa-lock"></i></div>
                    <div> <i class="fa-solid fa-language"></i></div>
                </div>
            </div>

        </Navbar >
    )
}

export default Nav;