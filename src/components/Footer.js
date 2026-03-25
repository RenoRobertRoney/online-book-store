import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>📚 BookVerse</h3>
                    <p>Your one-stop destination for all your reading cravings. From bestsellers to hidden gems, we bring the world of stories to your doorstep.</p>
                </div>

                <div className="footer-section">
                    <h4>About Us</h4>
                    <p>Founded in 2024, BookStore is dedicated to fostering a love for reading by providing easy access to a diverse range of titles across all genres.</p>
                    <a href="/about" className="detailed-link">Learn More &rarr;</a>
                </div>

                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <p>📍 123 Library Plaza, Ernakulam, Kerala, India</p>
                    <p>📧 support@bookverse.com</p>
                    <p>📞 91 9961300926</p>
                </div>

                <div className="footer-section">
                    <h4>FAQ</h4>
                    <div className="faq-mini">
                        <p><strong>Shipping?</strong> We ship pan-India within 3-5 days.</p>
                        <p><strong>Returns?</strong> 7-day easy return policy.</p>
                        <p><strong>Bulk Orders?</strong> Contact our support for discounts.</p>
                    </div>
                    <a href="/faq" className="detailed-link">View All FAQs</a>
                </div>

                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-links">
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">🐦 Twitter</a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">📸 Instagram</a>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer">📘 Facebook</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} BookStore. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
