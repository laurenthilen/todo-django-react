import axios from 'axios';

export const DELETE_TASK = "DELETE_TASK";
export const REQUEST_TASK_DATA = "REQUEST_TASK_DATA";
export const RECEIVE_TASK_DATA = "RECEIVE_TASK_DATA";

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
let csrftoken = getCookie('csrftoken');

export const fetchTasks = () => async dispatch => {
    dispatch({
        type: "REQUEST_TASK_DATA"
    });

    axios
        .get("/api/todos/")
        .then((res) => dispatch({type: RECEIVE_TASK_DATA, tasks: res.data}))
        .catch((err) => console.log(err));
};

export const deleteTask = (id) => async dispatch => {
    axios
        .delete(`/api/todos/${id}/`, { headers: { 'X-CSRFToken': csrftoken } })
        .then(dispatch({type: DELETE_TASK, id: id}))
        .then(fetchTasks())
        .catch((err) => console.log(err));
};
