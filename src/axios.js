import axios from 'axios';

const fetchTasks = async () => {
  try {
    const response = await axios.get('https://pacaro-tarefas.netlify.app/api/glauber-neves/tasks');
    return response.data; 
  } catch (error) {
    console.error('Erro ao buscar as tarefas:', error);
    return []; 
  }
};

export default fetchTasks;
