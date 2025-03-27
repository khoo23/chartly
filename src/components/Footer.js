import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4 mt-5">
            <div className="d-flex justify-content-center gap-4">
                <a href="https://twitter.com" className="text-white">Twitter</a>
                <a href="https://github.com" className="text-white">GitHub</a>
                <a href="https://discord.com" className="text-white">Discord</a>
            </div>
            <p>© 2025 Chartly. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
