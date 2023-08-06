import { useEffect } from "react";

/**
 * Renders an alert component with a given message and hides it after 4.1 seconds.
 *
 * @param {string} message - The message to be displayed in the alert.
 * @param {function} Alert - The function to hide the alert.
 * @return {ReactElement} The JSX element representing the alert component.
 */
export default function Alert({message, Alert}) {

    useEffect(() => {
        setTimeout(() => {
            Alert('', false);
        }, 4100);
    })

    return (
        <div className="alert">
            {message}
        </div>
    )

}
