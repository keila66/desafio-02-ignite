import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    //copia e adiciona os valores em um array
    const newTask = {
      id: Math.floor(Math.random() * 100) + 1,
      title: newTaskTitle,
      isComplete: false
    };
    //define o novo estado do array verificando se o input está preenchido
    newTaskTitle && setTasks([...tasks, newTask]);
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    //pelo id é achado a task a ser modificada
    const index =  tasks.findIndex((task) => {
      return task.id == id
    });

    //copia e define o novo valor da propriedade isComplete
    const toggleTask = [...tasks];
    toggleTask[index].isComplete = !toggleTask[index].isComplete;
    
    //atualiza o estado
    setTasks(toggleTask);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    //a função filter() permite filtrar os elementos de uma array baseada no valor passado como paramentro e aramazena o novo resultado em uma nova array, nao afetando a array original
    const deletedTask = tasks.filter(task => task.id !== id);
    setTasks(deletedTask);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}