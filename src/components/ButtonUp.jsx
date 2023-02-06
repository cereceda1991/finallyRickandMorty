const ButtonUp = ({ show }) => {
    return (
        <div className={show ? 'visible' : 'hidden'}>
            <a href="#"><i className='bx bxs-chevron-up-circle buttton__up'></i></a>
        </div>
    )
}

export default ButtonUp
