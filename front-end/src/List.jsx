export default function List(props) {
    return (
      <ul>
        {props.list.map((value, index) => (
          <li key={value + index}>
            {value.id} - 
            {value.text} - 
            {value.isCompleted ? "DONE" : "PENDING"}
            <br></br>
            <button onClick={() => props.onDelete(index)}>Delete</button>
            <button onClick={() => props.onEdit(index)}>Edit</button>
            <br></br> <br></br>
          </li>
        ))}
      </ul>
    );
  }