import './style.css'
import Dialog from './modules/dialog'
import ame from './assets/smol_ame.jpg'

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#ame').src = ame
    const MainDOM = (() =>{
        const addProject = () =>{
            let project = JSON.parse(localStorage.getItem('project'))
            let projectUl = document.querySelector('.project-nav')
            if (!project)return
            project.forEach((eachProject) => {
                let projectList = document.createElement('li')
                projectList.innerHTML = `<a href="#" class="link-secondary link-opacity-50-hover">${eachProject}</a>`
                projectUl.append(projectList)
            })
        }

        const addTask = () => {
            let task = JSON.parse(localStorage.getItem('task'))
            let taskUl = document.querySelector('.task-ul')
            if (!task)return
            task.forEach((eachTask) => {
                let projectList = document.createElement('li')
                projectList.classList.add('each-task')
                projectList.innerHTML = `<button class="round-button done-${eachTask.taskName}"></button>
                <p>${eachTask.taskName}</p>
                <p>${eachTask.date}</p>
                <button class="btn btn-danger delete-${eachTask.taskName}">delete</button>`
                if (eachTask.done === true){
                    projectList.classList.add('done')
                }
                taskUl.append(projectList)
                let deleteBtn = document.querySelector(`.delete-${eachTask.taskName}`)
                deleteBtn.addEventListener('click', () => {
                    projectList.remove()
                    const localTask = JSON.parse(localStorage.getItem('task'));

                    const indexToRemove = localTask.findIndex(item => item.taskName === eachTask.taskName);
                    if (indexToRemove !== -1) {
                        localTask.splice(indexToRemove, 1);
                    }

                    localStorage.setItem('task', JSON.stringify(localTask));

                })
                let doneBtn = document.querySelector(`.done-${eachTask.taskName}`)
                doneBtn.addEventListener('click', () =>{
                    const localTask = JSON.parse(localStorage.getItem('task'));

                    const changeTask = localTask.find(item => item.taskName === eachTask.taskName);
                    changeTask.done = true
                    localStorage.setItem('task', JSON.stringify(localTask))
                    projectList.classList.add('done')
                })
            })
        }
        return {addProject, addTask}
    })()

    Dialog.openDialog()
    Dialog.nav()
    Dialog.addTask()
    Dialog.addProject()

    MainDOM.addProject()
    MainDOM.addTask()
})