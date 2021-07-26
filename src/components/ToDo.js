import React, {useState, useEffect} from 'react';
import './style.css';

const getData = () => {
    const list = localStorage.getItem("myTodoList");
    if(list){
        return JSON.parse(list);
    }
    else{
        return [];
    }
}

function ToDo() {
    const [inputValue, setInputValue] = useState("");     //for inputting the value
    const [items, setItems] = useState(getData());               // for storing the value in array and displaying

    const addItem = () => {
        if (!inputValue){
            alert("No tasks filled!");
        }
        else{
            const inputValueWithId = {
                id : new Date().getTime().toString(),
                name : inputValue,
            };
            setItems([...items, inputValueWithId]);
            setInputValue("");
        }
    }

    const delValue = (index) => {                                 // deleting elements based on their id
        const updatedValue = items.filter((curElem) => {
            return curElem.id !== index;
        });
        setItems(updatedValue);
    };
 
    const removeAll = () => {                                       // delerting all the elements
        setItems([]);
    }
    
    useEffect(() => {
        localStorage.setItem("myTodoList", JSON.stringify(items));
    }, [items])

    const editValue = (index) => {
        const editedValue = items.find((currentVal) => {
            return currentVal.id === index;
        })
        setInputValue(editedValue.name);
        delValue(index);
    }

    return (
        <>
            <div className = "main-div">
                <div className = "child-div">
                    <figure>
                        <img src = "./todo.svg" alt = "todologo"/>
                        <figcaption>Add your list here</figcaption>
                    </figure>
                    <div className = "addItems">
                        <input type = "text" 
                         placeholder = "Add items here"
                         className = "form-control"
                         value = {inputValue}
                         onChange = {(e) => setInputValue(e.target.value)}/>
                         <i class="fa fa-plus" onClick = {addItem}></i>
                    </div>
    
                    <div className = "showItems">
                        {items.map((currElem) => {
                            return(
                            <div className = "eachItem" key = {currElem.id}>
                                <h3>{currElem.name}</h3>
                                <div className = "todo-btn">
                                    <i class="far fa-edit add-btn" onClick = {() => editValue(currElem.id)}></i>
                                    <i class="far fa-trash-alt add-btn" onClick = {() => delValue(currElem.id)}></i>
    
                                </div>
                            </div>
                            );
                        })}
                        <div className = "eachItem">
                            <h3>Apple</h3>
                            <div className = "todo-btn">
                                <i class="far fa-edit add-btn"></i>
                                <i class="far fa-trash-alt add-btn"></i>

                            </div>
                        </div>
                    </div>
                    <div className = "showItems">
                        <button className = "btn effect04" data-sm-link-text = "Remove all" onClick = {removeAll}>
                            <span>CHECK LIST</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ToDo;
