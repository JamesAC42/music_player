import React, {Component} from 'react';
import '../../css/Sidebar.css';
import SidebarIcons from './SidebarIcons.js';
import SidebarContent from './SidebarContent.js';

export default class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <SidebarIcons />
                <SidebarContent />
            </div>
        );
    }
}