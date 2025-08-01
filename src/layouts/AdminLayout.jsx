import React from 'react'
import { Outlet } from 'react-router-dom'
import './AdminLayout.css'
import SiderbarAdmin from './siderbarAdmin/SiderbarAdmin'
import NavbarLanding from './navbar/NavbarLandig'

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <NavbarLanding />
      <div className="admin-content">
        <SiderbarAdmin />
        
      </div>
    </div>
  )
}