import React from "react";

const Sidebar = () => {
    return <>
    <div class="lateral-fijo sidebar">
        <img className="img-fluid rounded-circle p-2" alt="profile"/>
        <ul class="m-2 mt-5">
            <li class="list-group-item">
                <h6>Home</h6>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center sd-active">
                <p class="sidebar-item">News Feed</p>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center sd-active">
                <p class="sidebar-item">News Feed</p>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center sd-active">
                <p class="sidebar-item">News Feed</p>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center sd-active">
                <p class="sidebar-item">News Feed</p>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center sd-active">
                <p class="sidebar-item">News Feed</p>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center sd-active">
                <p class="sidebar-item">News Feed</p>
            </li>
        </ul>
    </div>
    </>
}

export default Sidebar;