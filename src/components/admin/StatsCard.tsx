
const StatsCard = ({ icon, title, value }: any) => {
    return (
        <div className="flex-1 bg-white rounded-xl shadow-md p-6 text-center ">
            <div className=" mb-3  flex items-center justify-center text-3xl rounded-full w-10 h-10 leading-10 bg-gray-200">
                {icon}
            </div>
            <div className="text-gray-600 text-lg text-start mb-2">{title}</div>
            <div className="font-bold text-start text-2xl mb-2">{value}</div>
        </div>
    )
}

export default StatsCard