import moment from 'moment'
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const Device = ({
    id_sensor: id,
    model,
    name,
    location,
    created_at,
    status
}) => {
    const { setEditDevice, deleteDevice } = useAppContext()

    let date = moment(created_at)
    date = date.format("MMM, Do, YYYY")
    return (
        <tr>
            <td>{name}</td>
            <td>{model}</td>
            <td>
                <div className={`status ${status}`}>
                    {status}
                </div>
            </td>
            <td>{date}</td>
            <td>{location}</td>
            <td><Link
                to="/add-device"
                className='btn edit-btn'
                onClick={() => setEditDevice(id)}
            >
                Edit
            </Link>
                <button type='button' className='btn delete-btn' onClick={() => deleteDevice(id)}>
                    Delete
                </button>
                <Link
                    to="/details-device"
                    className='btn details-btn'
                // onClick={() => setEditJob(id)}
                >
                    Details
                </Link>
            </td>
        </tr>
    )
}

export default Device