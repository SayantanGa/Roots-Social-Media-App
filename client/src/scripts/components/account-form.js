import { useEffect, useState } from 'react';
import {randomQuote} from '../functions'

/**
 * Renders an input element for a form.
 *
 * @param {object} props - The props object containing the input configuration.
 * @param {string} props.type - The type of input element.
 * @param {string} props.phtext - The placeholder text for the input element.
 * @param {string} props.name - The name of the input element.
 * @param {boolean} props.patternRequired - Indicates if the input element requires a specific pattern.
 * @param {string} props.value - The value of the input element.
 * @param {function} props.onChangeHandler - The event handler for the input element's change event.
 * @param {object} props.attributes - Additional attributes for the input element.
 * @return {JSX.Element} - The rendered input element.
 */
export function GetInput(props) {

    return (
        <div className="form__group">
            <input type={props.type} className="form__input" placeholder={props.phtext || props.name } id={'form-login__' + props.type + props.name} pattern={props.patternRequired ? '[0-9]{10}' : null} value={props.value} onChange={props.onChangeHandler} {...props.attributes} required />
            <label htmlFor={'form-login__' + props.type + props.name} className="form__label">{props.name}</label>
        </div>
    );
}

/**
 * Renders a submit button for a form.
 *
 * @param {Object} props - The properties of the button.
 * @param {Function} props.onClick - The function to be called when the button is clicked.
 * @param {string} props.value - The value to be displayed inside the button.
 * @return {JSX.Element} The rendered submit button.
 */
export function FormSubmitButton(props) {

    return (
        <div className="form__submit">
            <button className="btn form__submit-button" onClick={props.onClick} > <span> {props.value} </span> </button>
        </div>
    );
}

/**
 * Generate the function comment for the given function body.
 *
 * @param {object} Alert - the Alert component
 * @param {function} onLogin - callback function for login
 * @return {JSX.Element} - the rendered JSX element
 */
export function ContinueWithSocial({Alert, onLogin}) {

    const handleSubmit = (text) => {
        Alert(`Sorry, ${text} Authentication Currently Unavailable`);
    }

    return(
        <>
            <p className="form__continue"> Or continue with</p>
            <div className="form__social">
                <img src="/g-logo.svg" id="google-logo" alt="Google" width={'30'} onClick={()=> handleSubmit('Google')}/>
                <img src="/apple-logo.svg" id="apple-logo" alt="Apple" width={'30'} onClick={()=> handleSubmit('Apple')}/>
            </div>
        </>
    );
}

/**
 * Renders the KnowledgeArea component, showing Roots logo and random quote.
 *
 * @return {JSX.Element} The rendered KnowledgeArea component.
 */
export function KnowledgeArea() {
    const [quote, setQuote] = useState(null);

    useEffect(() => {
        const fetchQuote = async () => {
            const quoteData = await randomQuote();
            setQuote(quoteData);
        };

        fetchQuote();
    }, []);

    return (
        <div className="knowledgearea">
            <img
                src="/logo-main-removedbg.png"
                alt="Roots"
                className="knowledgearea__logo"
            />
            {quote && <blockquote className="knowledgearea__quote">
                <p>{quote[0]}</p>
                <cite>--{quote[1]}</cite>
            </blockquote>
            }
        </div>
    );
}