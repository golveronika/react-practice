
import React from 'react'
import { dataItem } from '../page/Home'
 
enum Action {
    NOTE = "note",
    CALL = "call",
    MEETING = "meeting",
    BEER = "beer",
    COFFEE = "coffee",
}

interface NoteFormProps {
    onSubmit: (item: Pick<dataItem, 'action' | 'description'>) => void // (item: dataItem) => void
}

const NoteForm = ({ onSubmit }: NoteFormProps)  => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("form submitted")
        const formData = new FormData(e.currentTarget)
        const action = formData.get('action') as Action
        const description = formData.get('description') as string;
        onSubmit({ action, description });
        (e.target as HTMLFormElement).reset();
        
    }

  return (
    <div className='form-wrapper'>
        <form onSubmit={handleSubmit}>
            <textarea placeholder='Add note...' name='description' />
            <div className='botto-wrapper'>
                <div className='btns-container'>
                    {Object.values(Action).map(action => (
                        <div key={action}>
                            <label htmlFor={action}>{action}</label>
                            <input  type='radio' name='action' id={action} value={action} />
                        </div>
                    ))}
                </div>
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default NoteForm