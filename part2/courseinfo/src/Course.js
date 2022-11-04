const Course = ({course}) => {
    return (
        <>
            <Header  header={course.name}/>
            <Content  parts={course.parts}/>
        </>
    )
}

const Header = ({header}) => {
    return (
        <>
            <h1>{header}</h1>
        </>
    )
}

const Content = ({parts}) => {
    return (
        <>
            <ul>
                {parts.map(prop => {
                    return (
                        <li key={prop.id}><Part name={prop.name} exercises={prop.exercises} /></li>
                    )
                })}
            </ul>
        </>
    )
}

const Part = ({name, exercises}) => {
    return (
            <p>{name} {exercises}</p>
    )
}


export default Course