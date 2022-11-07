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

    var totalEx= [];
    parts.map(prop => {
        totalEx.push(prop.exercises)
    })
    return (
        <>
            <ul>
                {parts.map(prop => {
                    return (
                        <li key={prop.id}><Part name={prop.name} exercises={prop.exercises} /></li>
                    )
                })}
            </ul>
            <Sum total={totalEx.reduce((s, p) => {return s+p})}/>
        </>
    )
}

const Sum = ({total}) => {
    return (
        <p>Total {total}</p>
    )
}

const Part = ({name, exercises}) => {
    return (
            <p>{name} {exercises}</p>
    )
}


export default Course