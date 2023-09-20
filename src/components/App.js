import "../styles/App.scss";
import { useState, useEffect } from 'react';
import ls from '../services/localStorage';
import Modal from './modal/Modal';

export default function App() {
  const [tasks, setTasks] = useState(ls.get('localData', [
    { task: 'Hacer un modal de confirmación para esta web', completed: true },
    { task: 'Comprar harina, jamón y pan rallado', completed: true },
    { task: 'Hacer croquetas ricas', completed: true },
    { task: 'Ir a la puerta de un gimnasio', completed: false },
    {
      task: 'Comerme las croquetas mirando a la gente que entra en el gimnasio',
      completed: false
    },
  ]));
  const [searchValue, setSearchValue] = useState('');
  const [newTask, setNewTask] = useState('');
  const [modal, setModal] = useState(false)
  const [taskToErase, setTaskToErase] = useState('')

  const render = () => {
    return (tasks
      .filter((task) => task.task.toLowerCase().includes(searchValue.toLowerCase()))
      .map((task, index) => (<li key={index} id={index} className='list'> <i className="fa-solid fa-trash list__trash" id={index} onClick={handleErase}></i>
        <p id={index} className={task.completed ? 'list__p complete' : 'list__p'} onClick={handleClick}>{task.task}</p>
      </li >))
    )
  }

  const taskCounter = () => {
    let i = 0;
    tasks.map((task) => {
      if (task.completed) {
        return (i++)
      }
    })
    return (
      <section className="footer__counter">
        <p className='footer__counter__p'>Tareas totales:{tasks.length}</p>
        <p className='footer__counter__p'>Tareas completadas:{i}</p>
        <p className='footer__counter__p'>Tareas pendientes:{tasks.length - i}</p>
      </section>
    )
  }

  const handleSubmit = (ev) => { ev.preventDefault() }
  //marcar como completada o no
  const handleClick = (ev) => {
    if (ev.target.className === 'list__p' || 'list__p completed') {
      const taskIndex = parseInt(ev.target.id);
      tasks[taskIndex].completed = !tasks[taskIndex].completed;
      setTasks([...tasks]);
    }
  }
  const handleInput = (ev) => {
    setSearchValue(ev.target.value)
  }
  useEffect(() => {
    ls.set('localData', tasks);
  }, [tasks]);
  //añadir una tarea nueva
  const addNewTask = (ev) => {
    setNewTask(ev.target.value);
  }

  const handleNewTask = () => {
    setTasks([...tasks, { task: newTask, completed: false }])
    setNewTask('');
  }

  const handleErase = (ev) => {
    if (ev.target.className === "fa-solid fa-trash list__trash") {
      const eraseTaskIndex = parseInt(ev.target.id)
      setTaskToErase(eraseTaskIndex)
      setModal(true)
    }
  }

  const confirmErase = () => {
    tasks.splice([taskToErase], 1);
    setTasks([...tasks])
    setModal(false)
  }

  const handleModal = (id) => {
    if (id === 'yes') confirmErase()
    else setModal(false)
  }

  return (
    <div className="App">
      <header className="header">
        <h1 className="header__h1">Mi lista de tareas</h1>
        <nav className="header__nav">
          <h2 className="header__nav__h2">Busca en la lista</h2>
          <input type="text" id='search' name='search' className="header__nav__input" value={searchValue} onChange={handleInput} />
        </nav>
      </header>
      <main>
        <ul>{render()}</ul>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="newTask" className="form__label">Añade una nueva tarea</label>
          <input type="text" className="form__input" name="newTask" id="newTask" value={newTask} onChange={addNewTask} />
          <button className="form__button" onClick={handleNewTask}>Añadir</button>
        </form>
      </main>
      <footer> {taskCounter()}</footer>
      {modal && <Modal handleModal={handleModal} />}
    </div>
  );
}