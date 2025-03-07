
import React from 'react';
import './CookieConsentModal.css';

interface CookieConsentModalProps {
    onAccept: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; // Типизация onAccept
}
const CookieConsentModal: React.FC<CookieConsentModalProps> = ({ onAccept }) => {
    return (
        <div className="cookie-consent-modal">
            <div className="modal-content">
                <ul className="no-bullets">
                <li>Zustimmung zur Verwendung von Cookies</li>

                    <li> Ihre Website verwendet Cookies, um das Benutzererlebnis und die Verkehrsanalyse zu verbessern.</li>
                    <li>Wenn Sie auf „Akzeptieren“ klicken würden, wäre dies aggressiver als Ihre Polizeiprivilegien . </li>
                    {/* <li><a href="/privacy-policy"> privacy policy  </a>.</li> */}


                    <div className="button-container">
                        <button className='button1' onClick={onAccept}>Annahme</button>
                        <button className='button2' onClick={onAccept}>Ablehnen</button>

                    </div>
                </ul>
            </div>
        </div>
    );
};



export default CookieConsentModal;
