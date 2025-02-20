import Link from "next/link";
import '@/styles/button.css';

const Button = ({ title }) => {
    return (
        <Link id="button" href="/">
            {title}
        </Link>
    )
}

export default Button;