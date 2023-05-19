import { useState } from "react"
import { useModuleContext } from "../hooks/useModuleContext"

const ModuleForm = () => {
    const { dispatch } = useModuleContext()

    const [Title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [err,setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const module = {Title, Description}

        const response = await fetch('/api/module', {
            method: 'POST',
            body: JSON.stringify(module),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.err)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            setTitle('')
            setDescription('')
            setError(null)
            setEmptyFields([])
            console.log('New Video Added', json)
            dispatch({type: 'CREATE_MODULE', payload: json})
        }
    }

    return(
        <div id ="new-module-form">
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Video</h3>

            <label>Module Title : </label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={Title}
                className={emptyFields.includes('Title') ? 'err' : ''}
            />

            <label>Module Description : </label>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={Description}
                className={emptyFields.includes('Description') ? 'err' : ''}
            />

            <button> Add Details </button>
            {err && <div className="error">{err}</div>}
        </form>
        </div>

    )
}

export default ModuleForm