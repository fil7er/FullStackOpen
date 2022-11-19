const Notification = ({message, type}) => {
    return (
        <h2 class={type}>
            {message}
        </h2>
    )
}

export {Notification}