interface IconProps {
    className?: string;
}

export default function CorrectIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid="correct-icon">
            <circle cx="60" cy="60" r="50" stroke="#F87171" strokeWidth="10" />
        </svg>
    );
}
