"use client"; 

interface IExchangeCardProps extends React.PropsWithChildren {
    size: "sm" | "lg"
}

const ExchangeCard: React.FC<IExchangeCardProps> = ({ size, children }) => {
    return (
        <div className={` w-[316px] h-[165px] ${size == "sm" ? "" : "md:w-[515px] md:h-[265px]"} select-none  rounded-xl bg-[#2C2C2C] border-[1.5px] border-white drop-shadow-[0px_0px_3px_rgba(0,0,0,0.2)]`}>
            {children}
        </div>
    )
}

export default ExchangeCard;