
export default function DuoPath(props) {

    return (
        <div>
            <path d={props.paths[0]} fill="#FFFFFF"/>
            <path d={props.paths[1]} fill="#FFFFFF"/>
        </div>

    );
  }
  