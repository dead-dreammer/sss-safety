import React from 'react';

const Header = () => {
    return (
        <header>
            <div className="container">
                <h1>SSS Safety Solutions</h1>
                <nav>
                    <a href="#home" style={{ color: 'var(--primary-white)', margin: '0 15px', textDecoration: 'none' }}>Home</a>
                    <a href="#products" style={{ color: 'var(--primary-white)', margin: '0 15px', textDecoration: 'none' }}>Products</a>
                    <a href="#contact" style={{ color: 'var(--primary-white)', margin: '0 15px', textDecoration: 'none' }}>Contact</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;