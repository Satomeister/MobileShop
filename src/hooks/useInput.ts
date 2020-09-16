import { useState } from "react" 

const useInput = (initialValue: string) => {
    const[value,setValue] = useState(initialValue)

    const onChange = (event: any) => {
        setValue(event.target.value)
    }

    const setInputValue = (value: string) => {
        setValue(value)
    }

    const clear = () => {
        setValue('')
    }

    return {
        bind: {value, onChange},
        value,
        setInputValue,
        clear
    }
}

export default useInput