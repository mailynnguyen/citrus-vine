import Link from "next/link";
import '@/styles/button.css';

const Button = ({ title, onClick }) => {
    return (
        <Link id="button" href="/" onClick={onClick}>
            {title}
        </Link>
    )
}

export default Button;