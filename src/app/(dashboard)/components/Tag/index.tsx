interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
    onClose: () => void;
}
export const Tag: React.FC<TagProps> = ({ className, children, onClose }) => {
    return (
        <div className="py-0.5 rounded-md pl-2 pr-1 border text-dark font-inter text-sm font-medium border-[#D0D5DD] bg-white">
            <div className="flex items-center gap-1">
                <span>{children}</span>
                <button onClick={onClose} className="outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#98A2B3" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    )
}   