const Spinner = ({className}: { className: string }) => {
    return (
        <div
            className={`border-gray-400 animate-spin rounded-full border-[4px] border-t-white ${className}`}
        />
    );
};

export default Spinner;