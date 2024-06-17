import routerInstance from './routes.js'
window.onload = () => {
    //get root div for rendering
    let root = document.getElementById('app');
    //get all router links
    let definedRoutes = Array.from(document.querySelectorAll('[router-link]'));
    // method to navigate
    let navigate = e => {
        let route = e.target.attributes[0].value;
        // redirect to the router instance
        let routeInfo = routerInstance.routes.filter(r => r.path === route)[0]
        if (!routeInfo) {
            window.history.pushState({}, '', 'error')
            root.innerHTML = `This route is not Defined`
        } else {
            window.history.pushState({}, '', routeInfo.path)
            root.innerHTML = routeInfo.content
        }
    }
    //iterate over all defined routes
    definedRoutes.forEach(route => {
        route.addEventListener('click', navigate, false)
    })
    let currentPath = window.location.pathname;
    let routeInfo = routerInstance.routes.filter(r => r.path === currentPath)[0];
    if (routeInfo) {
        root.innerHTML = routeInfo.content
    } else {
        root.innerHTML = `This route is not Defined`
    }
}
