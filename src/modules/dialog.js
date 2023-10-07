import { format } from "date-fns"

const Dialog = (() => {
    const projectForm = document.querySelector('.project-form')
    const taskForm = document.querySelector('.task-form')
    let task = JSON.parse(localStorage.getItem('task'))
    if (!task){
        task = []
    }
    let project = JSON.parse(localStorage.getItem('project'))
    if(!project){
        project = []
    }
    const dialog = document.querySelector('dialog')
    const openDialog = () =>{
        const openDialogBtn = document.querySelector('.open-dialog')
        const closeDialogBtn = document.querySelectorAll('.close-dialog')
        
        openDialogBtn.addEventListener('click', () =>{
            projectForm.style.display = 'none'
            taskForm.style.display = 'block'
            dialog.showModal()
        })
        closeDialogBtn.forEach((close) =>{
            close.addEventListener('click', () => {
                dialog.close()
            })
        })
    }
    const nav = () => {
        const taskNav = document.querySelector('#side-task-nav')
        const projectNav = document.querySelector('#side-project-nav')
        taskNav.addEventListener('click', () => {
            projectForm.style.display = 'none'
            taskForm.style.display = 'block'
        })
        projectNav.addEventListener('click', () => {
            projectForm.style.display = 'block'
            taskForm.style.display = 'none'
        })
    }
    const addTask = () => {
        document.querySelector('#submit-task').addEventListener('click', (event) =>{
            event.preventDefault()
            let taskName = document.querySelector('#task-add')
            let date = document.querySelector('#date')
            let projectName = document.querySelector('#project-select')
            if(!taskName.value || !date.value || !projectName.value){
                dialog.close()
                return
            }
            let dateVal = format(new Date(date.value), 'yyyy-MM-dd')
            let eachTask = {taskName: taskName.value, date: dateVal, projectName: projectName.value, 'done': false}
            task.push(eachTask)
            localStorage.setItem('task', JSON.stringify(task))
            taskName.value = ''
            date.value = ''
            projectName.value = ''
            dialog.close()
            let taskUl = document.querySelector('.task-ul')
            let projectList = document.createElement('li')
            projectList.classList.add('each-task')
            projectList.innerHTML = `<button class="round-button done-${eachTask.taskName}"></button>
            <p>${eachTask.taskName}</p>
            <p>${eachTask.date}</p>
            <button class="btn btn-danger">delete</button>`
            taskUl.append(projectList)
        })
    }
    const addProject = (loadProject) => {
        const projectSelect = document.getElementById('project-select')
        project.forEach((projecto) => {
            let projectOption = document.createElement('option')
            projectOption.setAttribute('value', projecto)
            projectOption.textContent = projecto
            projectSelect.append(projectOption)
        })
        document.querySelector('#submit-project').addEventListener('click', (event) => {
            event.preventDefault()
            let eachProject = document.querySelector('#project-add')
            if (!eachProject.value){
                dialog.close()
                return
            }
            project.push(eachProject.value)
            localStorage.setItem('project', JSON.stringify(project))
            let projectOption = document.createElement('option')
            projectOption.setAttribute('value', eachProject.value)
            projectOption.textContent = eachProject.value
            projectSelect.append(projectOption)
            dialog.close()
            let projectUl = document.querySelector('.project-nav')
            let projectList = document.createElement('li')
            projectList.innerHTML = `<a href="#" class="link-secondary link-opacity-50-hover">${eachProject.value}</a>`
            projectUl.append(projectList)
            eachProject.value = ''
        })
    }
    return {openDialog, nav, addTask, addProject}
})()

export default Dialog