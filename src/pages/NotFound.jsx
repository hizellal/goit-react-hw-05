import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react'

export default function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/', {replace: true});
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigate])

    return (
        <div>NotFound page</div>
    );
}