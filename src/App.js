import InputForm from './components/DailyTaskManager/InputForm';
import TaskList from './components/DailyTaskList/TaskList';
import { useState, useEffect } from 'react';
import { BiPlus } from 'react-icons/bi';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineBars } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import { v4 as uuid } from 'uuid';
function App() {
  const todos = [
    {
      userId: 1,
      id: uuid(),
      title: 'delectus aut autem',
      completed: false,
      duration: 1,
      type: 'business',
    },
    {
      userId: 1,
      id: uuid(),
      title: 'quis ut nam facilis et officia qui',
      completed: false,
      duration: 4,
      type: 'personal',
    },
  ];

  const [todoList, setTodoList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [personalCount, setPersonalCount] = useState();
  const [businessCount, setBusinessCount] = useState();
  const [percentage, setPercentage] = useState(null);
  const [todaysDate, setTodaysDate] = useState('');
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    place: '',
    time: '',
    duration: '',
  });

  const addTodo = () => {
    setModalOpen(true);
  };

  const getTodoCounts = () => {
    const personalFilter = todoList.filter(todo => todo.type === 'Personal');
    const businessFilter = todoList.filter(todo => todo.type === 'Business');

    setPersonalCount(personalFilter.length);
    setBusinessCount(businessFilter.length);
  };

  const percentageCompleted = () => {
    const todoPercentage = todoList.filter(todo => todo.completed);

    setPercentage(Math.round((todoPercentage.length / todoList.length) * 100));
    console.log(percentage);
  };

  const formatDate = today => {
    let week = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    let day = week[today.getDay()];
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let year = today.getFullYear();
    let hours = today.getHours();
    let min = today.getMinutes();
    const fullDate = `${day} - ${dd < 10 ? '0' + dd : dd}/ ${
      mm < 10 ? '0' + mm : mm
    } / ${year} --- ${hours} : ${min}`;
    setTodaysDate(fullDate);
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData);
    console.log(todos);

    setTodoList([
      ...todoList,
      {
        id: uuid(),
        title: formData.title,
        duration: formData.duration,
        type: formData.type,
        time: formData.time,
        place: formData.place,
      },
    ]);
    setModalOpen(false);
  };

  const deleteTodo = id => {
    const filterTodo = todoList.filter(todo => todo.id !== id);
    setTodoList(filterTodo);
  };

  const toggleComplete = id => {
    const updatedTodos = todoList.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodoList(updatedTodos);
  };
  useEffect(() => {
    getTodoCounts();
    percentageCompleted();
    formatDate(new Date());
  }, [todoList, todaysDate]);

  return (
    <>
      <div className="container">
        <section className="main-section">
          <section className="todo-header">
            <div className="todo-header-block">
              <div className="app-bar">
                <i className="fas fa-bar"></i>
              </div>
              <div className="app-title">
                <h1>Daily Schedule</h1>
              </div>
              <div className="app-date">
                <small>{todaysDate}</small>
              </div>
            </div>
            <div className="todo-header-description">
              <div></div>
              <div className="todo-counts">
                <div>
                  <h2>{personalCount}</h2>
                  <small>personal</small>
                </div>
                <div>
                  <h2>{businessCount}</h2>
                  <small>business</small>
                </div>
              </div>
              <div className="todo-percent">
                <small>{percentage ? percentage : 0}% Done</small>
              </div>
            </div>
          </section>
          <section className="todo-body">
            <div>
              <h2>Recent</h2>
            </div>
            <div>
              <ul className="todo-contents">
                {todoList.map((todo, index) => {
                  return (
                    <li className="todo-item" key={todo.id}>
                      <div className="todo-item-container">
                        <div className="todo-item-content">
                          <div className="check">
                            <input
                              type="checkbox"
                              className="checkbox"
                              onChange={() => toggleComplete(todo.id)}
                            />
                          </div>
                          <div className="task-body">
                            <h4
                              className={`task-title ${
                                todo.completed ? 'completed' : null
                              }`}
                            >
                              {todo.title}
                            </h4>
                            <small
                              className={`task-desc ${
                                todo.completed ? 'completed' : null
                              }`}
                            >
                              {todo.type}
                            </small>
                          </div>
                          <div className="duration">
                            <small>{todo.duration}hr</small>
                          </div>
                        </div>

                        <div
                          className="trash"
                          onClick={() => deleteTodo(todo.id)}
                        >
                          <FaTrashAlt />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="floating-btn-container">
                <button className="floating-btn" onClick={() => addTodo()}>
                  <BiPlus size={30} />
                </button>
              </div>
            </div>
          </section>
        </section>
      </div>

      {modalOpen && (
        <section className="modal">
          <div className="modal-container">
            <div className="modal-header">
              <div className="back-arrow" onClick={() => setModalOpen(false)}>
                <BsArrowLeft color={'#f4f4f4'} />
              </div>
              <div>
                <h3>Add Item</h3>
              </div>
              <div>
                <AiOutlineBars />
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <select
                  className="form-control"
                  name="type"
                  onChange={handleChange}
                >
                  <option value="">Select Type</option>
                  <option value="Business">Business</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Add task"
                  className="form-control"
                  name="title"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Place"
                  className="form-control"
                  name="place"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  placeholder="Time"
                  className="form-control"
                  name="time"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  placeholder="Duration"
                  className="form-control"
                  name="duration"
                  onChange={handleChange}
                />
              </div>
              <button className="add-btn">Add Task</button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}

export default App;
